import DockerOutput from '../types/dockerOutput.type';
import { STREAM_HEADER_SIZE } from './constants';

export default function decodeBufferStream(buffer: Buffer): DockerOutput {
  let offset = 0; // keep track of the current position in the buffer
  const output: DockerOutput = { stdout: '', stderr: '' }; // to store decoded strings
  // iterate through the buffer
  while (offset < buffer.length) {
    const streamType = buffer[offset]; // first byte indicates the channel (stdout or stderr)

    // chunkLength tells us the length of the value part
    const chunkLength = buffer.readUInt32BE(offset + 4);

    // we read the header, now we move forward to the value part
    offset += STREAM_HEADER_SIZE;

    if (streamType === 1) {
      // stdout
      output.stdout += buffer.toString('utf-8', offset, offset + chunkLength);
    } else if (streamType === 2) {
      // stderr
      output.stderr += buffer.toString('utf-8', offset, offset + chunkLength);
    }

    // move the offset to the next chunk (header + value)
    offset += chunkLength;
  }

  return output;
}
