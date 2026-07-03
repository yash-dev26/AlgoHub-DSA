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

type EvaluationResult = {
  status?: string;
};

const deriveSubmissionStatus = (results?: EvaluationResult[]): string => {
  if (!results || results.length === 0) {
    return "failed";
  }

  const allSuccessful = results.every(
    (result) => result?.status?.toUpperCase() === "SUCCESS"
  );

  if (allSuccessful) {
    return "completed";
  }

  const firstFailedResult = results.find(
    (result) => result?.status?.toUpperCase() !== "SUCCESS"
  );

  return mapEvaluationStatus(firstFailedResult?.status);
};

function evaluationWorker(queueName: string) {
  new Worker(
    queueName,
    async (job: Job) => {
      
      if (job.name === "EvaluationJob") {
        if (job.data?.submissionId) {
          const status = deriveSubmissionStatus(job.data?.evaluationResult?.results);
          await submissionService.updateSubmissionStatus(job.data.submissionId, status);
        }

        await axios.post(
          `${process.env.SOCKET_SERVICE_URL}/senddata`,
          {
            userId: job.data.userId,
            data: job.data,
          }
        );
      }
  },{
    connection: redisClient,
  });
}
export default evaluationWorker;
