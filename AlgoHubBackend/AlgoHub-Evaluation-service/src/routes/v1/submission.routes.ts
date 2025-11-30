import express from 'express';
import { createSubmission } from '../../controller/submission.controller';
import { validate } from '../../validator/createSubmission.validator';
import { AddSubmissionZodSchema } from '../../DTOs/addSubmission.dto';
const submissionRouter = express.Router();

submissionRouter.post('/', validate(AddSubmissionZodSchema), createSubmission);

export default submissionRouter;
