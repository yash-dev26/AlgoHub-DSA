import { Job } from 'bullmq';
import { IJob } from '../types/bullmqJob.type';
import logger from '../config/winston.config';

export default class SampleJob implements IJob {
  name: string;
  payload: Record<string, unknown>;

  constructor(payload: Record<string, unknown>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }

  handler = (job?: Job): void => {
    if (job) {
      logger.info(
        `Handling job: ${job.name}, id: ${job.id}, payload: ${JSON.stringify(job.data)}`,
        { source: 'jobs/first.job.ts' },
      );
    }
  };

  failed = (job?: Job): void => {
    if (job) {
      logger.error(`Job ${job.name} failed. Job details: ${JSON.stringify(job)}`, {
        source: 'jobs/first.job.ts',
      });
    }
  };
}
