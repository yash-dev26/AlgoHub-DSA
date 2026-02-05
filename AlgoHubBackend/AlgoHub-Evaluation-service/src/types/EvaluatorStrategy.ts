import { TestCase } from './testcases.type';

export default interface EvaluatorStrategy {
  evaluate(code: string, inputTestCase?: TestCase): Promise<EvaluatorResponse>;

  // eslint-disable-next-line semi
}

export type EvaluatorResponse = { output: string; status: string };
