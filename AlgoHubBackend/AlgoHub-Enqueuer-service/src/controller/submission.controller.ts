import { type FastifyReply, type FastifyRequest } from 'fastify';

const pingCheck = async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await reply.server.submissionService.pingCheck();
  return reply.send(result);
}

const createSubmission = async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await reply.server.submissionService.createSubmission(request.body);
  return reply.status(201).send({
    error: {},
    data: result,
    message: 'Submission created and enqueued successfully',
  });
}

export default { pingCheck, createSubmission };