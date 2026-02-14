import createContainer from './container-factory';
import { TestCase } from '../types/testcases.type';
import { CPP_IMAGE } from '../utils/constants';
import logger from '../config/winston.config';
import decodeBufferStream from '../utils/bufferDecoder';
import pullImage from '../utils/dockerImgPull';
import { EvaluatorResponse } from '../types/EvaluatorStrategy';

class CppEvaluator {
  async evaluate(code: string, inputTestCase?: TestCase): Promise<EvaluatorResponse> {
    const rawBuffer: Buffer[] = [];
    await pullImage(CPP_IMAGE);
    const cppDockerContainer = await createContainer(CPP_IMAGE, [
      '/bin/sh', // using shell to run multiple commands because we are relying on shell features like piping
      '-c', // -c allows us to pass a string of commands to be executed by the shell
      `apk add --no-cache -q build-base coreutils &&  
    cat <<'EOF' > Main.cpp
${code}
EOF
    g++ Main.cpp -o Main &&
    echo " ${JSON.stringify(inputTestCase ?? '')}" | stdbuf -oL -eL ./Main
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
        }, 2000); // 2 seconds time limit for code execution

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
            logger.info(`Decoded stdout: ${decodedStream.stdout}`, {
              source: 'container/cpp.container.ts',
            });
          }
        });
      });
      return { output: result, status: 'success' };
    } catch (error) {
      return { output: error as string, status: 'ERROR' };
    } finally {
      await cppDockerContainer.remove({ force: true }); //cleaning up the container
      logger.info('C++ Docker container removed.', {
        source: 'container/cpp.container.ts',
      });
    }
  }
}
export default CppEvaluator;
