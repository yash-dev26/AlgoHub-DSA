import submissionQueue from '../queue/submission.queue';
import logger from '../config/winston.config';

export default async function (payload: Record<string, unknown>) {
  try {
    logger.info('Adding Submission job to queue', { source: 'producer/submission.producer.ts' });
    const job = await submissionQueue.add('SubmissionJob', payload);
    logger.info(`New Submission job added: SubmissionJob, id: ${job.id}`, {
      source: 'producer/submission.producer.ts',
    });
  } catch (err) {
    logger.error(`Failed to add job SubmissionJob to queue: ${String(err)}`, {
      source: 'producer/submission.producer.ts',
    });
    throw err;
  }
}
