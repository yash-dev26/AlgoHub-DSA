import { Job } from 'bullmq';
import { IJob } from '../types/bullmqJob.type';

export default class SampleJob implements IJob {
  name: string;
  payload: Record<string, unknown>;

  constructor(payload: Record<string, unknown>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }

  handler = (job?: Job): void => {
    if (job) {
      console.log(`Handling job: ${job.name}, with id: ${job.id} and with payload:`, job.data);
    }
  };

  failed = (job?: Job): void => {
    if (job) {
      console.log(`Job ${job.name} failed. Job details:`, job);
    }
  };
}
