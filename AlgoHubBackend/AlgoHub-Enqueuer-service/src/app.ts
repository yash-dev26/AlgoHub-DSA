import fp from 'fastify-plugin'
import { type FastifyPluginAsync } from 'fastify'
import cors from '@fastify/cors';
import servicePlugin from './services/service.plugin.js';
import apiPlugin from './routes/api/apirouter.js';

const app: FastifyPluginAsync = async fastify => {
  fastify.register(cors);

  fastify.register(servicePlugin);

  fastify.register(apiPlugin, { prefix: '/api' })

}

export default fp(app)
