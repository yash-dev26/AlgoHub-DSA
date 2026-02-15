import { Job, Worker } from "bullmq";
import redisClient from "../config/redis.config.js";
import axios from "axios";

function evaluationWorker(queueName: string) {
  new Worker(
    queueName,
    async (job: Job) => {
      if (job.name === "EvaluationJob") {
        const response = await axios.post(
          "http://localhost:3000/senddata",
          {
            userId: job.data.userId,
            data: job.data.data,
          }
        );
        console.log("Evaluation triggered with response:", response.data);
        console.log("Processing job:", job.name, "with data:", job.data);
        // Here you can add any additional processing or logging as needed
      }
  },{
    connection: redisClient,
  });
}
export default evaluationWorker;
