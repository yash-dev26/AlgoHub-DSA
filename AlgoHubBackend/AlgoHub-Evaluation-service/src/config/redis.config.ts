import Redis from 'ioredis';
import serverConfig from './server.config';
import logger from './winston.config';

const { REDIS_HOST, REDIS_PORT } = serverConfig;

const redisConfig = {
  PORT: REDIS_PORT,
  host: REDIS_HOST,
  maxRetriesPerRequest: null,
};

const redisClient = new Redis(redisConfig);

redisClient.on('connect', () =>
  logger.info('Connected to Redis', { source: 'config/redis.config.ts' }),
);
redisClient.on('ready', () =>
  logger.info('Redis client ready', { source: 'config/redis.config.ts' }),
);
redisClient.on('error', (err) =>
  logger.error(`Redis error: ${String(err)}`, { source: 'config/redis.config.ts' }),
);
redisClient.on('close', () =>
  logger.warn('Redis connection closed', { source: 'config/redis.config.ts' }),
);

export default redisClient;
