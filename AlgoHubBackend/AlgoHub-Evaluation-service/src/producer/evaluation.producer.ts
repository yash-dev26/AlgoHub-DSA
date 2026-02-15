import evaluationQueue from '../queue/evaluation.queue';
import logger from '../config/winston.config';

export default async function (payload: Record<string, unknown>) {
  try {
    logger.info('Adding Evaluation job to queue', { source: 'producer/evaluation.producer.ts' });
    const job = await evaluationQueue.add('EvaluationJob', payload);
    logger.info(`New Evaluation job added: EvaluationJob, id: ${job.id}`, {
      source: 'producer/evaluation.producer.ts',
    });
  } catch (err) {
    logger.error(`Failed to add job EvaluationJob to queue: ${String(err)}`, {
      source: 'producer/evaluation.producer.ts',
    });
    throw err;
  }
}
