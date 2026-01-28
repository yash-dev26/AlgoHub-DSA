import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import submissionRoute from './submission.route.js';

const v1Plugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(submissionRoute, { prefix: '/submissions' });
};

export default v1Plugin;