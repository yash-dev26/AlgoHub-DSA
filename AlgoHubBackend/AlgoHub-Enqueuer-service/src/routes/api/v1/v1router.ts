import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import submissionRoute from './submission.route.js';
import problemRoute from './problems.routes.js';

const v1Plugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(submissionRoute, { prefix: '/submissions' });
  fastify.register(problemRoute, { prefix: '/problems' });
};

export default v1Plugin;