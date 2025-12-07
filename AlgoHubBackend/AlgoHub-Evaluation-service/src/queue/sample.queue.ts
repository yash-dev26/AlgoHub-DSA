import { Queue } from 'bullmq';
import redisClient from '../config/redis.config';
import logger from '../config/winston.config';

const sampleQueue = new Queue('SampleQueue', { connection: redisClient });

logger.info('Created BullMQ queue: SampleQueue', { source: 'queue/sample.queue.ts' });

export default sampleQueue;
