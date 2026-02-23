import { TestCase } from './testcases.type';

export type SubmissionPayload = {
  code: string;
  language: 'Python' | 'Java' | 'CPP';
  TestCases?: TestCase[] | TestCase;
  userId: string;
  submissionId: string;
};
