import submissionProducer from "../producer/submission.producer.js";
import SubmissionCreationError from "../errors/submission.error.js";

class SubmissionService {

  constructor(private submissionRepository: any) {}

  async pingCheck(){
    return 'pong';
  }

  async createSubmission(data: any){
    const submission = await this.submissionRepository.createSubmission(data);

    if(!submission){
      throw new SubmissionCreationError('Failed to create a submission in the repository');
    }

    const reply  = await submissionProducer(submission);
    console.log("Submission enqueued:", reply);
    return {queueResponse: reply, submission};
    
  }
}

export default SubmissionService;