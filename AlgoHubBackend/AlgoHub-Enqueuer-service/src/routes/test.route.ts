import { type FastifyInstance } from 'fastify';
import pingController from '../controller/test.controller.js';

const pingRoute = async (fastify: FastifyInstance) => {
  fastify.get('/ping', pingController);
};

export default pingRoute;