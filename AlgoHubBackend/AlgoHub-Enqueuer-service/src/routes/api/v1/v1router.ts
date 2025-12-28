import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import testRoute from './test/test.route.js';

const v1Plugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(testRoute, { prefix: '/test' });
};

export default v1Plugin;