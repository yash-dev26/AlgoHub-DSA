import { Request, Response } from 'express';
import { AddSubmissionDTO } from '../DTOs/addSubmission.dto';
export function createSubmission(req: Request, res: Response) {
  const SubmissionDTO = req.body as AddSubmissionDTO;

  //Add validation using zod

  return res.json({
    success: true,
    error: {},
    message: 'Submission received',
    data: SubmissionDTO,
  });
}
