import EvaluatorStrategy from '../types/EvaluatorStrategy';
import { TestCase } from '../types/testcases.type';

export default function createEvaluator(
  codeLanguage: string,
  code: string,
  inputTestCase?: TestCase,
): EvaluatorStrategy {
  if (codeLanguage === 'cpp') {
    const { CppEvaluator } = require('../container/cpp.container');
    return new CppEvaluator(code, inputTestCase);
  } else if (codeLanguage === 'java') {
    const { JavaEvaluator } = require('../container/java.container');
    return new JavaEvaluator(code, inputTestCase);
  } else if (codeLanguage === 'python') {
    const { PythonEvaluator } = require('../container/python.container');
    return new PythonEvaluator(code, inputTestCase);
  } else {
    throw new Error(`Unsupported code language: ${codeLanguage}`);
  }
}
