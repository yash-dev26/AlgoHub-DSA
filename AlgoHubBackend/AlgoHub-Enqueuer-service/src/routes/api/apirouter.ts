import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import v1Plugin from './v1/v1router.js';

const apiPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(v1Plugin, { prefix: '/v1' });
};

export default apiPlugin;