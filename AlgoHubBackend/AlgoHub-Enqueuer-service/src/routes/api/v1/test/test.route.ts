import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import pingController from '../../../../controller/test.controller.js';

const pingRoute: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/ping', pingController);
};

export default pingRoute;