import createContainer from './container-factory';
import { TestCase } from '../types/testcases.type';
import { PYTHON_IMAGE } from '../utils/constants';
import logger from '../config/winston.config';
import decodeBufferStream from '../utils/bufferDecoder';

async function runPythonCode(code: string, input: TestCase) {
  const rawBuffer: Buffer[] = [];
  const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
    '/bin/sh', // using shell to run multiple commands because we are relying on shell features like piping
    '-c', // -c allows us to pass a string of commands to be executed by the shell
    // the regexp in replace is to escape single quotes in the code string and replace them with double quotes to avoid breaking the echo command
    `
    echo "${code}" > script.py && 
    echo "${input.input}" | python3 script.py
  `,
  ]);

  await pythonDockerContainer.start(); //booting up container
  logger.info('Python Docker container started.');

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

  (await loggerStream).on('end', () => {
    logger.info('Python Docker container logs stream ended.');
    const completeBuffer = Buffer.concat(rawBuffer); // concatenate all chunks into a single buffer
    logger.info(`Raw buffer length: ${completeBuffer.length}`);

    // Decoding the buffer stream to get stdout and stderr
    const decodedStream = decodeBufferStream(completeBuffer);
    logger.info(`Decoded stdout: ${decodedStream.stdout}`);
    logger.info(`Decoded stderr: ${decodedStream.stderr}`);
  });
  // rawBuffer is of no use here, we gotta decode it to string

  return pythonDockerContainer;
}

export default runPythonCode;
