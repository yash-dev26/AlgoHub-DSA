import SubmissionRepository from "./submission.repo.js";
import fp from 'fastify-plugin';
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';

const repoPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.decorate('submissionRepository', new SubmissionRepository());
};

export default fp(repoPlugin);