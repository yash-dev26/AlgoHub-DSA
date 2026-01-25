import submissionProducer from "../producer/submission.producer.js";

class SubmissionService {

  constructor(private submissionRepository: any) {}

  async pingCheck(){
    return 'pong';
  }

  async createSubmission(data: any){
    const submission = this.submissionRepository.createSubmission(data);
    const reply  = await submissionProducer(submission);
    console.log("Submission enqueued:", reply);
    return {queueResponse: reply, submission};
    
  }
}

export default SubmissionService;