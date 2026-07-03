import { type FastifyReply, type FastifyRequest } from 'fastify';
import { fetchProblemData, getProblems} from '../apis/problemServiceApi.js';

const getproblems = async (_request: FastifyRequest, reply: FastifyReply) => {
  const result = await getProblems();
  return reply.send(result);
}

const getProblemById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const result = await fetchProblemData(id);
  return reply.send(result);
};

export default { getproblems, getProblemById };