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
  async updateSubmission(id: string, data: any){
    const reply = await this.submissionModel.findByIdAndUpdate(id, data, {new: true});
    return reply;
  }
}
export default SubmissionRepository;