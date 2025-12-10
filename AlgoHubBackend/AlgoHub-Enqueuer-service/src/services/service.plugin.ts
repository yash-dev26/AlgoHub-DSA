import '../types/fastifyinstance.js';
import fp from 'fastify-plugin';
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import TestService from './test.service.js';

const servicePlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.decorate('testService', new TestService());

}; // now every route can access app.testService

export default fp(servicePlugin);