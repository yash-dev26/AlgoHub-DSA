import { type FastifyReply, type FastifyRequest } from 'fastify';

const pingController = async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await reply.server.testService.pingCheck();
  return reply.send({ message: result });
};

export default pingController;