import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import pingController from '../../../../controller/submission.controller.js';

const pingRoute: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/ping', pingController);
};

export default pingRoute;