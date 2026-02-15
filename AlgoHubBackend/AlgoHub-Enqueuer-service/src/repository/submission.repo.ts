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
  async updateSubmissionStatus(id: string, status: string){
    const reply = await this.submissionModel.findOneAndUpdate(
      { submissionId: id },
      { status },
      { new: true },
    );
    return reply;
  }
}
export default SubmissionRepository;