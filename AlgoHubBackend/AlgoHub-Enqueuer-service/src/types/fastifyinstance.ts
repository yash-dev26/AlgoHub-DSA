import type SubmissionService from '../services/submission.service.js';
import type SubmissionRepository from '../repository/submission.repo.js';

declare module 'fastify' {
  interface FastifyInstance {
    submissionRepository: SubmissionRepository;
    submissionService: SubmissionService;
    // Add new services here as you create them
  }
}

