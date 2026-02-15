import EvaluatorStrategy from '../types/EvaluatorStrategy';
import { TestCase } from '../types/testcases.type';

export default function createEvaluator(
  codeLanguage: string,
  code: string,
  inputTestCase?: TestCase,
): EvaluatorStrategy {
  if (codeLanguage === 'cpp') {
    const CppEvaluator = require('../container/cpp.container').default;
    return new CppEvaluator();
  } else if (codeLanguage === 'java') {
    const JavaEvaluator = require('../container/java.container').default;
    return new JavaEvaluator();
  } else if (codeLanguage === 'python') {
    const PythonEvaluator = require('../container/python.container').default;
    return new PythonEvaluator();
  } else {
    throw new Error(`Unsupported code language: ${codeLanguage}`);
  }
}
