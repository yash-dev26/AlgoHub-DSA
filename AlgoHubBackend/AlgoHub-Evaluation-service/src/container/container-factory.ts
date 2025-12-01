import Dockerode from 'dockerode';

async function createContainer(imgName: string, cmd: string[]) {
  const docker = new Dockerode();
  const container = await docker.createContainer({
    Image: imgName,
    Cmd: cmd,
    Tty: false,
    AttachStdin: true, //input stream connected
    AttachStdout: true, //output stream connected
    AttachStderr: true, //error stream connected
    OpenStdin: true, //keep stdin open even if no interaction with docker container
  });
  return container;
}

export default createContainer;
