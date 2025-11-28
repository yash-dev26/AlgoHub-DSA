import { Queue } from 'bullmq';
import redisClient from '../config/redis.config';

export default new Queue('SampleQueue', { connection: redisClient });
