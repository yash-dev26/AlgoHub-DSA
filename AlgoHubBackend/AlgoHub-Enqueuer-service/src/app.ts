import fp from 'fastify-plugin'
import { type FastifyPluginAsync } from 'fastify'
import servicePlugin from './services/service.plugin.js';

const app: FastifyPluginAsync = async fastify => {
  fastify.register(import('@fastify/cors'));

  fastify.register(import('./routes/test.route.js'), { prefix: '/api' })

  fastify.register(servicePlugin);
}

export default fp(app)
