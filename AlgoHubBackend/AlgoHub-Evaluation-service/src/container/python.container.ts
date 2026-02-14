import createContainer from './container-factory';
import { PYTHON_IMAGE } from '../utils/constants';
import logger from '../config/winston.config';
import decodeBufferStream from '../utils/bufferDecoder';
import pullImage from '../utils/dockerImgPull';
import EvaluatorStrategy, { EvaluatorResponse } from '../types/EvaluatorStrategy';
import { TestCase } from '../types/testcases.type';

class PythonEvaluator implements EvaluatorStrategy {
  async evaluate(code: string, inputTestCase?: TestCase): Promise<EvaluatorResponse> {
    const rawBuffer: Buffer[] = [];
    await pullImage(PYTHON_IMAGE);
    const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
      '/bin/sh', // using shell to run multiple commands because we are relying on shell features like piping
      '-c', // -c allows us to pass a string of commands to be executed by the shell
      `
    cat <<'EOF' > script.py
${code}
EOF
    echo "${inputTestCase ?? ''}" | python3 script.py
  `,
    ]);

    await pythonDockerContainer.start(); //booting up container
    logger.info('Python Docker container started.', { source: 'container/python.container.ts' });

    const loggerStream = pythonDockerContainer.logs({
      stdout: true,
      stderr: true,
      timestamps: false,
      follow: true, // stream logs in real-time (not retrieving them all at once)
    });

    // start listening to the logs by attaching events to the stream
    (await loggerStream).on('data', (chunk) => {
      rawBuffer.push(chunk);
    });

    try {
      const result: string = await new Promise(async (res, rej) => {
        const timeoutId = setTimeout(() => {
          logger.warn('Python code execution timed out. Destroying container.', {
            source: 'container/python.container.ts',
          });
          pythonDockerContainer.stop().then(() => {
            logger.info('Python Docker container stopped.', {
              source: 'container/python.container.ts',
            });
            rej(new Error('TLE'));
          });
        }, 2000); // 2 seconds time limit for code execution

        (await loggerStream).on('end', async () => {
          clearTimeout(timeoutId); // clear the timeout if execution finishes within time limit
          logger.info('Python Docker container logs stream ended.', {
            source: 'container/python.container.ts',
          });
          const completeBuffer = Buffer.concat(rawBuffer); // concatenate all chunks into a single buffer
          logger.info(`Raw buffer length: ${completeBuffer.length}`, {
            source: 'container/python.container.ts',
          });
          // rawBuffer is of no use here, we gotta decode it to string
          // Decoding the buffer stream to get stdout and stderr
          const decodedStream = decodeBufferStream(completeBuffer);
          if (decodedStream.stderr) {
            logger.error(`Error during Python code execution: ${decodedStream.stderr}`, {
              source: 'container/python.container.ts',
            });
            rej(new Error(decodedStream.stderr));
          } else {
            res(decodedStream.stdout);
            logger.info(`Decoded stdout: ${decodedStream.stdout}`, {
              source: 'container/python.container.ts',
            });
          }
        });
      });
      return { output: result, status: 'success' };
    } catch (error) {
      return { output: error as string, status: 'ERROR' };
    } finally {
      await pythonDockerContainer.remove({ force: true }); //cleaning up the container
      logger.info('Python Docker container removed.', {
        source: 'container/python.container.ts',
      });
    }
  }
}

export default PythonEvaluator;
