import { Request, Response } from 'express';
import { AddSubmissionDTO, AddSubmissionZodSchema } from '../DTOs/addSubmission.dto';
export function createSubmission(req: Request, res: Response) {
  const validation = AddSubmissionZodSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      error: validation.error.issues,
      message: 'Validation failed',
      data: null,
    });
  }

  const SubmissionDTO: AddSubmissionDTO = validation.data;

  return res.json({
    success: true,
    error: {},
    message: 'Submission received',
    data: SubmissionDTO,
  });
}
