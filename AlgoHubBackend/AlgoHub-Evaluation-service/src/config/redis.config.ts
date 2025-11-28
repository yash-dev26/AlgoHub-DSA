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

redisClient.on('connect', () => logger.info('Connected to Redis'));
redisClient.on('ready', () => logger.info('Redis client ready'));
redisClient.on('error', (err) => logger.error(`Redis error: ${String(err)}`));
redisClient.on('close', () => logger.warn('Redis connection closed'));

export default redisClient;
