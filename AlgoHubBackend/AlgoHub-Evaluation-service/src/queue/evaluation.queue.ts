import { Queue } from 'bullmq';

import redisClient from '../config/redis.config';

export default new Queue('EvaluationQueue', {
  connection: redisClient,
});
