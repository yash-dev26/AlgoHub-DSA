import { Queue } from 'bullmq';
import redisClient from '../config/redis.config';
import logger from '../config/winston.config';

const sampleQueue = new Queue('SampleQueue', { connection: redisClient });

logger.info('Created BullMQ queue: SampleQueue');

export default sampleQueue;
