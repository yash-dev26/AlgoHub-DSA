import submissionProducer from "../producer/submission.producer.js";
import SubmissionCreationError from "../errors/submission.error.js";
import { fetchProblemData } from "../apis/problemServiceApi.js";

class SubmissionService {

  constructor(private submissionRepository: any) {}

  async pingCheck(){
    return 'pong';
  }

  async createSubmission(data: any){

    const problemId = data.problemId;
    const userId = data.userId;

    const problemApiResponse = await fetchProblemData(problemId);


    if(!problemApiResponse || !problemApiResponse.data){
      throw new SubmissionCreationError(`Problem with ID ${problemId} not found in Problem Service`);
    }

    const codeStubLanguage = problemApiResponse.data.codeStub.find((codeStub: any) => codeStub.language.toLowerCase() === data.language.toLowerCase());
    data.code = codeStubLanguage.startStub + "\n" + data.code + "\n" + codeStubLanguage.endStub;

    const submission = await this.submissionRepository.createSubmission(data);

    if(!submission){
      throw new SubmissionCreationError('Failed to create a submission in the repository');
    }

    const reply  = await submissionProducer({
      [submission.submissionId]: {
        code: submission.code,
        language: submission.language,
        TestCases: problemApiResponse.data.testCases[0],
        userId: userId,
        submissionId: submission.submissionId,
      } // for now we are sending only the first test case, this can be modified to send all test cases or a selected set of test cases
    });
    console.log("Submission enqueued:", reply);
    return {queueResponse: reply, submission};
  }

  async updateSubmissionStatus(id: string, status: string){
    const updatedSubmission = await this.submissionRepository.updateSubmissionStatus(id, status);
    if(!updatedSubmission){
      throw new SubmissionCreationError(`Failed to update submission status for ID ${id}`);
    }
    return updatedSubmission;
  }
}

export default SubmissionService;