import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import submissionController from '../../../controller/submission.controller.js';
import { createSubmissionZodSchema } from '../../../dtos/submissionDTO.js';

const pingRoute: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/ping', submissionController.pingCheck);
  fastify.post('/', { schema: { body: createSubmissionZodSchema } }, submissionController.createSubmission);
};

export default pingRoute;