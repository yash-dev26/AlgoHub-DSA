import { Job } from 'bullmq';
import { IJob } from '../types/bullmqJob.type';

export default class SampleJob implements IJob {
  name: string;
  payload: Record<string, unknown>;

  constructor(payload: Record<string, unknown>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }

  handler = (): void => {
    console.log(`Handling job: ${this.name} with payload:`, this.payload);
  };

  failed = (job?: Job): void => {
    console.log(`Job ${this.name} failed. Job details:`, job);
  };
}
