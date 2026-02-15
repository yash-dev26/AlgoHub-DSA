import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import submissionController from '../../../controller/submission.controller.js';

const pingRoute: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/ping', submissionController.pingCheck);
  fastify.post('/', submissionController.createSubmission);
};

export default pingRoute;