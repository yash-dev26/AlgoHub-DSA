import { TestCase } from './testcases.type';

export type SubmissionPayload = {
  language: 'Python' | 'Java' | 'CPP';
  code: string;
  input?: TestCase;
};
