import '../types/fastifyinstance.js';
import fp from 'fastify-plugin';
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import SubmissionService from './submission.service.js';

const servicePlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.decorate('submissionService', new SubmissionService(fastify.submissionRepository)); //cant use thi here

}; // now every route can access app.submissionService

export default fp(servicePlugin);