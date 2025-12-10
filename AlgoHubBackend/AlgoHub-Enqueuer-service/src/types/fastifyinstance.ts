import type TestService from '../services/test.service.js';

declare module 'fastify' {
  interface FastifyInstance {
    testService: TestService;
    // Add new services here as you create them
  }
}

