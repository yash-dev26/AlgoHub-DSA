import createContainer from './container-factory';
import { TestCase } from '../types/testcases.type';
import { JAVA_IMAGE } from '../utils/constants';
import logger from '../config/winston.config';
import decodeBufferStream from '../utils/bufferDecoder';
import pullImage from '../utils/dockerImgPull';

async function runJavaCode(code: string, input?: TestCase) {
  const rawBuffer: Buffer[] = [];
  await pullImage(JAVA_IMAGE);
  const javaDockerContainer = await createContainer(JAVA_IMAGE, [
    '/bin/sh', // using shell to run multiple commands because we are relying on shell features like piping
    '-c', // -c allows us to pass a string of commands to be executed by the shell
    `
    cat <<'EOF' > Main.java
${code}
EOF
    javac Main.java &&
    echo "${input?.input}" | java Main
  `,
  ]);

  await javaDockerContainer.start(); //booting up container
  logger.info('Java Docker container started.');

  const loggerStream = javaDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true, // stream logs in real-time (not retrieving them all at once)
  });

  // start listening to the logs by attaching events to the stream
  (await loggerStream).on('data', (chunk) => {
    rawBuffer.push(chunk);
  });

  (await loggerStream).on('end', async () => {
    logger.info('Java Docker container logs stream ended.');
    const completeBuffer = Buffer.concat(rawBuffer); // concatenate all chunks into a single buffer
    logger.info(`Raw buffer length: ${completeBuffer.length}`);

    // rawBuffer is of no use here, we gotta decode it to string
    // Decoding the buffer stream to get stdout and stderr
    const decodedStream = decodeBufferStream(completeBuffer);
    logger.info(`Decoded stdout: ${decodedStream.stdout}`);
    logger.info(`Decoded stderr: ${decodedStream.stderr}`);

    await javaDockerContainer.remove(); //cleaning up the container
    logger.info('Java Docker container removed.');
  });
}

export default runJavaCode;
