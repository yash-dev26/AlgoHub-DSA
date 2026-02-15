import { type FastifyReply, type FastifyRequest } from 'fastify';
import { createSubmissionZodSchema } from '../dtos/submissionDTO.js';
import type { CreateSubmissionDto } from '../dtos/submissionDTO.js';


const pingCheck = async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await reply.server.submissionService.pingCheck();
  return reply.send(result);
}

const createSubmission = async (request: FastifyRequest, reply: FastifyReply) => {
  console.log('Received submission:', request.body);
  const validation = await createSubmissionZodSchema.safeParseAsync(request.body);
  if (!validation.success) {
    return reply.status(400).send({
      success: false,
      error: validation.error.issues,
      message: 'Validation failed',
      data: null,
    });
  }

  const SubmissionDTO: CreateSubmissionDto = validation.data;

  const result = await reply.server.submissionService.createSubmission(SubmissionDTO);

  return reply.status(201).send({
    error: {},
    data: result,
    message: 'Submission created and enqueued successfully',
  });
}

export default { pingCheck, createSubmission };