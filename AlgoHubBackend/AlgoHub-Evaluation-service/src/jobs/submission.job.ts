import { Job } from 'bullmq';
import { IJob } from '../types/bullmqJob.type';
import logger from '../config/winston.config';
import { SubmissionPayload } from '../types/submission-payload.type';
import { TestCase } from '../types/testcases.type';
import createEvaluator from '../utils/EvaluatorFactory';
import evaluationProducer from '../producer/evaluation.producer';

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
      logger.info(`Submission code: ${submission.code}`, { source: 'jobs/submission.job.ts' });
      const normalizedTestCases = this.normalizeTestCases(submission.TestCases);

      logger.info(`Test cases: ${JSON.stringify(normalizedTestCases)}`, {
        source: 'jobs/submission.job.ts',
      });
      const codeEvaluation = createEvaluator(submission.language);
      logger.info(`Created evaluator for job ${job.id} with language ${submission.language}`, {
        source: 'jobs/submission.job.ts',
      });
      const evaluationResult = await codeEvaluation.evaluate(submission.code, normalizedTestCases);
      logger.info(`Evaluation result for job ${job.id}: ${JSON.stringify(evaluationResult)}`, {
        source: 'jobs/submission.job.ts',
      });

      evaluationProducer({
        evaluationResult,
        userId: submission.userId,
        submissionId: submission.submissionId,
      });

      const allPassed = evaluationResult.results.every((result) => result.status === 'SUCCESS');
      if (allPassed) {
        logger.info(`Job ${job.id} completed successfully. All test cases passed.`, {
          source: 'jobs/submission.job.ts',
        });
        console.log('All test cases passed');
      } else {
        const failedResults = evaluationResult.results.filter((result) => result.status !== 'SUCCESS');
        logger.error(
          `Job ${job.id} completed with failures. Failed test cases: ${JSON.stringify(failedResults)}`,
          {
            source: 'jobs/submission.job.ts',
          },
        );
      }
    }
  };

  private normalizeTestCases(testCases?: SubmissionPayload['TestCases']): TestCase[] {
    if (!testCases) {
      return [];
    }

    if (Array.isArray(testCases)) {
      return testCases;
    }

    return [testCases];
  }

  failed = (job?: Job): void => {
    if (job) {
      logger.error(`Job ${job.name} failed. Job details: ${JSON.stringify(job)}`, {
        source: 'jobs/submission.job.ts',
      });
    }
  };
}
