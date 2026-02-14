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
    HostConfig: {
      Memory: 512 * 1024 * 1024, //512MB memory limit this is our MLE logic and against forkbombs
    },
  });
  return container;
}

export default createContainer;
