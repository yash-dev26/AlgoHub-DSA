import axiosInstance from "../config/axios.config.js";
import { SERVER_CONFIG } from "../config/server.config.js";

const PROBLEM_SERVICE_API = `${SERVER_CONFIG.PROBLEM_SERVICE_URL}/api/v1`;
async function fetchProblemData(problemId: string) {
  try {
    const response = await axiosInstance.get(`${PROBLEM_SERVICE_API}/problems/${problemId}`);
    console.log(`Fetched problem data for problem ID ${problemId}:`, response.data);
    return response.data;
  } catch (error) {
    console.log(`Error fetching problem data for problem ID ${problemId}:`, error);
    throw error;
  }
}

export { fetchProblemData };