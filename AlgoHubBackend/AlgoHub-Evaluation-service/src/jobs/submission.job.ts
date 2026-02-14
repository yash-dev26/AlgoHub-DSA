import { Job } from 'bullmq';
import { IJob } from '../types/bullmqJob.type';
import logger from '../config/winston.config';
import { SubmissionPayload } from '../types/submission-payload.type';
import createEvaluator from '../utils/EvaluatorFactory';

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
      // const inputTestCase = this.payload[key].input?.input;
      // const outputTestCase = this.payload[key].input?.output;
      logger.info(`Processing submission for key: ${key}, language: ${submission.language}`, {
        source: 'jobs/submission.job.ts',
      });
      const codeEvaluation = await createEvaluator(
        submission.language,
        submission.code,
        submission.input,
      );
      const evaluationResult = await codeEvaluation.evaluate(submission.code, submission.input);
      logger.info(`Evaluation result for job ${job.id}: ${JSON.stringify(evaluationResult)}`, {
        source: 'jobs/submission.job.ts',
      });
      if (evaluationResult.status === 'SUCCESS') {
        logger.info(`Job ${job.id} completed successfully. Output: ${evaluationResult.output}`, {
          source: 'jobs/submission.job.ts',
        });
        console.log(evaluationResult.output);
      } else {
        logger.error(
          `Job ${job.id} completed with errors. Error Output: ${evaluationResult.output}`,
          {
            source: 'jobs/submission.job.ts',
          },
        );
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
