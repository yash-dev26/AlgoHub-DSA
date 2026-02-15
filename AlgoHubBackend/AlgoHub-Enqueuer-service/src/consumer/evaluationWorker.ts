import { Job, Worker } from "bullmq";
import redisClient from "../config/redis.config.js";
import axios from "axios";
import SubmissionRepository from "../repository/submission.repo.js";
import SubmissionService from "../services/submission.service.js";

const submissionService = new SubmissionService(new SubmissionRepository());

const mapEvaluationStatus = (status?: string): string => {
  if (!status) {
    return "failed";
  }
  const normalized = status.toUpperCase();
  if (normalized === "SUCCESS") {
    return "completed";
  }
  if (normalized === "TLE") {
    return "TLE";
  }
  if (normalized === "MLE") {
    return "MLE";
  }
  return "failed";
};

function evaluationWorker(queueName: string) {
  new Worker(
    queueName,
    async (job: Job) => {
      
      if (job.name === "EvaluationJob") {
        console.log(`Processing job ${job.id} with data:`, job.data);
        if (job.data?.submissionId) {
          const status = mapEvaluationStatus(job.data?.evaluationResult?.status);
          await submissionService.updateSubmissionStatus(job.data.submissionId, status);
        }
        const response = await axios.post(
          `${process.env.SOCKET_SERVICE_URL}/senddata`,
          {
            userId: job.data.userId,
            data: job.data,
          }
        );
        console.log(`Job ${job.id} processed successfully with response:`, response.data);
      }
  },{
    connection: redisClient,
  });
}
export default evaluationWorker;
