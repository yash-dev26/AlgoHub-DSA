import { Job, Worker } from 'bullmq';
import { IJob } from '../types/bullmqJob.type';
import { IBullmqWorkerResponse } from '../types/bullmqWorkerResponse.type';
import SampleJob from '../jobs/first.job';
import redisClient from '../config/redis.config';
import logger from '../config/winston.config';

export default function SampleWorker(queueName: string) {
  const worker = new Worker<IJob, IBullmqWorkerResponse>(
    queueName,
    async (job: Job): Promise<IBullmqWorkerResponse> => {
      try {
        if (job.name === 'SampleJob') {
          const sampleJobInstance = new SampleJob(job.data);
          await sampleJobInstance.handler(job);
          return { success: true, statusCode: 200, message: 'Job processed successfully' };
        }
        logger.warn(`Unsupported job type: ${job.name}`, { source: 'consumer/sample.consumer.ts' });
        return { success: false, statusCode: 400, message: 'Unsupported job type' };
      } catch (err) {
        logger.error(`Error processing job ${job.id}: ${String(err)}`, {
          source: 'consumer/sample.consumer.ts',
        });
        throw err;
      }
    },
    {
      connection: redisClient,
    },
  );

  worker.on('completed', (job) =>
    logger.info(`Job completed: ${job.id}`, { source: 'consumer/sample.consumer.ts' }),
  );
  worker.on('failed', (job, err) =>
    logger.error(`Job failed: ${job?.id}, error: ${String(err)}`, {
      source: 'consumer/sample.consumer.ts',
    }),
  );

  return worker;
}
