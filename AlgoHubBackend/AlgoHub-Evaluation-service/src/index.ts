import express, { Express } from 'express';
import serverConfig from './config/server.config';
import apirouter from './routes';
import SampleProducer from './producer/Sample.producer';
import SampleWorker from './consumer/sample.consumer';
import logger from './config/winston.config';

const app: Express = express();

app.use('/api', apirouter);

app.listen(serverConfig.PORT, () => {
  logger.info(`Server is running on port ${serverConfig.PORT}`);
  logger.info('Hello, AlgoHub Evaluation Service!');

  SampleWorker('SampleQueue');

  SampleProducer('SampleJob', {
    name: 'TestPayload',
    value: 42,
    location: 'TestLocation',
    language: 'js',
  });
});
