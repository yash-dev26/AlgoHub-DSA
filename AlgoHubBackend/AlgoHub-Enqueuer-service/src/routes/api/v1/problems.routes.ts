import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import problemController from '../../../controller/problem.controller.js';

const problemsRoute: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/', problemController.getproblems);
  fastify.get('/:id', problemController.getProblemById);
};

export default problemsRoute;