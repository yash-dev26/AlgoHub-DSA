import sampleQueue from '../queue/sample.queue';
import logger from '../config/winston.config';

export default async function (name: string, payload: Record<string, unknown>) {
  try {
    logger.info(`Adding job to queue: ${name}`, { source: 'producer/Sample.producer.ts' });
    const job = await sampleQueue.add(name, payload);
    logger.info(`Job added: ${name}, id: ${job.id}`, { source: 'producer/Sample.producer.ts' });
  } catch (err) {
    logger.error(`Failed to add job ${name} to queue: ${String(err)}`, {
      source: 'producer/Sample.producer.ts',
    });
    throw err;
  }
}
