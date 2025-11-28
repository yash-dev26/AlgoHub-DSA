import Redis from 'ioredis';
import serverConfig from './server.config';

const { REDIS_HOST, REDIS_PORT } = serverConfig;

const redisConfig = {
  PORT: REDIS_PORT,
  host: REDIS_HOST,
  maxRetriesPerRequest: null,
};

const redisClient = new Redis(redisConfig);

export default redisClient;
