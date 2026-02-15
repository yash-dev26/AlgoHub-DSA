import { Job, Worker } from "bullmq";
import redisClient from "../config/redis.config.js";
import axios from "axios";

function evaluationWorker(queueName: string) {
  new Worker(
    queueName,
    async (job: Job) => {
      
      if (job.name === "EvaluationJob") {
        console.log(`Processing job ${job.id} with data:`, job.data);
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
