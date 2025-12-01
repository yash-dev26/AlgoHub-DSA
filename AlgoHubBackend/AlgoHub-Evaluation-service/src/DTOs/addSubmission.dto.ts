import { z } from 'zod';

export type AddSubmissionDTO = z.infer<typeof AddSubmissionZodSchema>;

export const AddSubmissionZodSchema = z.object({
  userID: z.string(),
  problemID: z.string(),
  code: z.string(),
  language: z.string(),
});
