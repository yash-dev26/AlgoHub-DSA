import { Job } from 'bullmq';
import { IJob } from '../types/bullmqJob.type';
import logger from '../config/winston.config';
import { SubmissionPayload } from '../types/submission-payload.type';
import runPythonCode from '../container/python.container';
import runJavaCode from '../container/java.container';
import runCppCode from '../container/cpp.container';

export default class SubmissionJob implements IJob {
  name: string;
  payload: Record<string, SubmissionPayload>;

  constructor(payload: Record<string, SubmissionPayload>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }

  handler = async (job?: Job): Promise<void> => {
    if (job) {
      logger.info(`Handling job: ${job.name}, id: ${job.id}`, { source: 'jobs/submission.job.ts' });
      const entries = Object.entries(this.payload) as [string, SubmissionPayload][];
      if (entries.length === 0) {
        logger.warn('SubmissionJob: empty payload', { source: 'jobs/submission.job.ts' });
        return;
      }
      const [key, submission] = entries[0];
      logger.info(`Processing submission for key: ${key}, language: ${submission.language}`, {
        source: 'jobs/submission.job.ts',
      });
      if (submission.language === 'Python') {
        // Handle Python code execution
        logger.info('Executing Python code', { source: 'jobs/submission.job.ts' });
        await runPythonCode(submission.code, submission.input).then((result) => {
          logger.info(`Python code execution result: ${result}`, {
            source: 'jobs/submission.job.ts',
          });
        });
      }
      if (submission.language === 'Java') {
        // Handle Java code execution
        logger.info('Executing Java code', { source: 'jobs/submission.job.ts' });
        await runJavaCode(submission.code, submission.input).then((result) => {
          logger.info(`Java code execution result: ${result}`, {
            source: 'jobs/submission.job.ts',
          });
        });
      }
      if (submission.language === 'CPP') {
        // Handle CPP code execution
        logger.info('Executing C++ code', { source: 'jobs/submission.job.ts' });
        await runCppCode(submission.code, submission.input ?? undefined).then((result) => {
          logger.info(`C++ code execution result: ${result}`, { source: 'jobs/submission.job.ts' });
        });
      }
    }
  };

  failed = (job?: Job): void => {
    if (job) {
      logger.error(`Job ${job.name} failed. Job details: ${JSON.stringify(job)}`, {
        source: 'jobs/submission.job.ts',
      });
    }
  };
}
