import { Queue } from 'bullmq';

import redisClient from '../config/redis.config.js';

export default new Queue('EvaluationQueue', {
  connection: redisClient,
});
