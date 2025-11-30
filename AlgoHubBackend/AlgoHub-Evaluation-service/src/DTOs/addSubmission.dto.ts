import { z } from 'zod';

export interface AddSubmissionDTO {
  userID: string;
  problemID: string;
  code: string;
  language: string;
}

export const AddSubmissionZodSchema = z.object({
  userID: z.string(),
  problemID: z.string(),
  code: z.string(),
  language: z.string(),
});
