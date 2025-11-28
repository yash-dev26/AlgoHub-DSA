import { Job, Worker } from 'bullmq';
import { IJob } from '../types/bullmqJob.type';
import { IBullmqWorkerResponse } from '../types/bullmqWorkerResponse.type';
import SampleJob from '../jobs/first.job';
import redisClient from '../config/redis.config';

export default function SampleWorker(queueName: string) {
  new Worker<IJob, IBullmqWorkerResponse>(
    queueName,
    async (job: Job): Promise<IBullmqWorkerResponse> => {
      if (job.name === 'SampleJob') {
        const sampleJobInstance = new SampleJob(job.data);
        await sampleJobInstance.handler(job);
        return { success: true, statusCode: 200, message: 'Job processed successfully' };
      }
      return { success: false, statusCode: 400, message: 'Unsupported job type' };
    },
    {
      connection: redisClient,
    },
  );
}
