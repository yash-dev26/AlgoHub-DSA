import createContainer from './container-factory';
import { TestCase } from '../types/testcases.type';
import { CPP_IMAGE } from '../utils/constants';
import logger from '../config/winston.config';
import decodeBufferStream from '../utils/bufferDecoder';
import pullImage from '../utils/dockerImgPull';
import EvaluatorStrategy, { EvaluatorResponse, TestCaseResult } from '../types/EvaluatorStrategy';

class CppEvaluator implements EvaluatorStrategy {
  async evaluate(code: string, testCases?: TestCase[]): Promise<EvaluatorResponse> {
    if (!Array.isArray(testCases) || testCases.length === 0) {
      return { results: [] };
    }

    const runCommands = testCases
      .map(
        (testCase, index) =>
          `echo "=== TestCase ${index} ===" && echo '${testCase.input.replace(/'/g, "'\\''")}' | stdbuf -oL -eL ./Main`,
      )
      .join(' ; ');

    const rawBuffer: Buffer[] = [];
    await pullImage(CPP_IMAGE);
    const cppDockerContainer = await createContainer(CPP_IMAGE, [
      '/bin/sh', // using shell to run multiple commands because we are relying on shell features like piping
      '-c', // -c allows us to pass a string of commands to be executed by the shell
      `apk add --no-cache -q build-base coreutils &&  
    cat <<'EOF' > Main.cpp
${code}
EOF
    g++ Main.cpp -o Main && ${runCommands}
  `,
    ]);

    await cppDockerContainer.start(); //booting up container
    logger.info('C++ Docker container started.', { source: 'container/cpp.container.ts' });

    const loggerStream = cppDockerContainer.logs({
      stdout: true,
      stderr: true,
      timestamps: false,
      follow: true, // stream logs in real-time (not retrieving them all at once)
    });

    // start listening to the logs by attaching events to the stream
    (await loggerStream).on('data', (chunk) => {
      rawBuffer.push(chunk);
    });

    const results: TestCaseResult[] = [];

    try {
      const result: string = await new Promise(async (res, rej) => {
        const timeoutId = setTimeout(() => {
          logger.warn('C++ code execution timed out. Destroying container.', {
            source: 'container/cpp.container.ts',
          });
          cppDockerContainer.stop().then(() => {
            logger.info('C++ Docker container stopped.', {
              source: 'container/cpp.container.ts',
            });
            rej(new Error('TLE'));
          });
        }, 2000 * testCases.length); // Scale timeout by number of test cases

        (await loggerStream).on('end', async () => {
          clearTimeout(timeoutId); // clear the timeout if execution finishes within time limit
          logger.info('C++ Docker container logs stream ended.', {
            source: 'container/cpp.container.ts',
          });
          const completeBuffer = Buffer.concat(rawBuffer); // concatenate all chunks into a single buffer
          logger.info(`Raw buffer length: ${completeBuffer.length}`, {
            source: 'container/cpp.container.ts',
          });
          // rawBuffer is of no use here, we gotta decode it to string
          // Decoding the buffer stream to get stdout and stderr
          const decodedStream = decodeBufferStream(completeBuffer);
          if (decodedStream.stderr) {
            logger.error(`Error during C++ code execution: ${decodedStream.stderr}`, {
              source: 'container/cpp.container.ts',
            });
            rej(new Error(decodedStream.stderr));
          } else {
            res(decodedStream.stdout);
          }
        });
      });

      this.parseAndCompareResults(result, testCases, results);

      return { results };
    } catch (error) {
      logger.error(`C++ evaluation error: ${error}`, { source: 'container/cpp.container.ts' });
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        results: testCases.map((_, index) => ({
          output: errorMessage,
          status: 'ERROR',
          testCaseIndex: index,
        })),
      };
    } finally {
      await cppDockerContainer.remove({ force: true }); //cleaning up the container
      logger.info('C++ Docker container removed.', {
        source: 'container/cpp.container.ts',
      });
    }
  }

  private parseAndCompareResults(
    output: string,
    testCases: TestCase[],
    results: TestCaseResult[],
  ): void {
    const sections = output.split(/=== TestCase \d+ ===/);

    for (let i = 1; i < sections.length; i++) {
      const testCaseOutput = sections[i].trim();
      const expectedOutput = testCases[i - 1].output.trim();

      if (testCaseOutput === expectedOutput) {
        results.push({
          output: testCaseOutput,
          status: 'SUCCESS',
          testCaseIndex: i - 1,
        });
      } else {
        results.push({
          output: testCaseOutput,
          status: 'WA',
          testCaseIndex: i - 1,
        });
      }
    }
  }
}
export default CppEvaluator;
