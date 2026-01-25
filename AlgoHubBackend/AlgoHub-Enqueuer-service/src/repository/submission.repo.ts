import Submission from "../models/submission.model.js";
class SubmissionRepository {
  submissionModel: any;
  constructor(){
    this.submissionModel = Submission;
  }
  async createSubmission(data: any){
    const reply = await this.submissionModel.create(data);
    return reply;
  }
}
export default SubmissionRepository;