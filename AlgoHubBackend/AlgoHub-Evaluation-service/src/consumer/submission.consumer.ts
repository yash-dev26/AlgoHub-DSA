import { Job, Worker } from 'bullmq';
import { IJob } from '../types/bullmqJob.type';
import { IBullmqWorkerResponse } from '../types/bullmqWorkerResponse.type';
import SubmissionJob from '../jobs/submission.job';
import redisClient from '../config/redis.config';
import logger from '../config/winston.config';

export default function SubmissionWorker(queueName: string) {
  const worker = new Worker<IJob, IBullmqWorkerResponse>(
    queueName,
    async (job: Job): Promise<IBullmqWorkerResponse> => {
      try {
        if (job.name === 'SubmissionJob') {
          const submissionJobInstance = new SubmissionJob(job.data);
          await submissionJobInstance.handler(job);
          return { success: true, statusCode: 200, message: 'Job processed successfully' };
        }
        logger.warn(`Unsupported job type: ${job.name}`, {
          source: 'consumer/submission.consumer.ts',
        });
        return { success: false, statusCode: 400, message: 'Unsupported job type' };
      } catch (err) {
        logger.error(`Error processing job ${job.id}: ${String(err)}`, {
          source: 'consumer/submission.consumer.ts',
        });
        throw err;
      }
    },
    {
      connection: redisClient,
    },
  );

  worker.on('completed', (job) =>
    logger.info(`Job completed: ${job.id}`, { source: 'consumer/submission.consumer.ts' }),
  );
  worker.on('failed', (job, err) =>
    logger.error(`Job failed: ${job?.id}, error: ${String(err)}`, {
      source: 'consumer/submission.consumer.ts',
    }),
  );

  return worker;
}
