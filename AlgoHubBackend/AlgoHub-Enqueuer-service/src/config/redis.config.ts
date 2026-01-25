import Redis from "ioredis";

import { SERVER_CONFIG } from "./server.config.js";

const redisConfig = {
  host: SERVER_CONFIG.REDIS_HOST,
  port: SERVER_CONFIG.REDIS_PORT,
  maxRetriesPerRequest: null,
};

const redisClient = new (Redis as any)(redisConfig);

export default redisClient;

redisClient.on("connect", () => {
  console.log(
    `Connected to Redis server at ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
  );
});