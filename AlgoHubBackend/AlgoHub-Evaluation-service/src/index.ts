import express, { Express } from 'express';
import serverConfig from './config/server.config';
import apirouter from './routes';
// import SampleProducer from './producer/Sample.producer';
// import SampleWorker from './consumer/sample.consumer';
import logger from './config/winston.config';
import bullAdapter from './config/bullBoard.config';
import bodyParser from 'body-parser';
import runPythonCode from './container/python.container';

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use('/api', apirouter);
app.use('/ui', bullAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  logger.info(`Server is running on port ${serverConfig.PORT}`);
  logger.info(`bull-board UI available at http://localhost:${serverConfig.PORT}/ui`);

  // SampleWorker('SampleQueue');

  // SampleProducer('SampleJob', {
  //   name: 'TestPayload',
  //   value: 42,
  //   location: 'TestLocation',
  //   language: 'js',
  // });
  const code = `n = input()
print('value of x is', n)
for i in range(int(n)):
  print(i) 
`;
  runPythonCode(code, { input: '6', output: '' });
});
