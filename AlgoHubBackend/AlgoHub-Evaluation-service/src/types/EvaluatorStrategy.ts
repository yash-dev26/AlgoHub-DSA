import { TestCase } from './testcases.type';

export default interface EvaluatorStrategy {
  evaluate(code: string, testCases?: TestCase[]): Promise<EvaluatorResponse>;

  // eslint-disable-next-line semi
}

export type TestCaseResult = {
  output: string;
  status: 'SUCCESS' | 'WA' | 'ERROR';
  testCaseIndex: number;
};

export type EvaluatorResponse = { results: TestCaseResult[] };
