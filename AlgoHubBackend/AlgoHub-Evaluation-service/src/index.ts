import express, { Express } from 'express';
import serverConfig from './config/server.config';
import apirouter from './routes';
import logger from './config/winston.config';
import bullAdapter from './config/bullBoard.config';
import bodyParser from 'body-parser';
import { Submission_Queue_Name } from './utils/constants';
import SubmissionWorker from './consumer/submission.consumer';

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use('/api', apirouter);
app.use('/ui', bullAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  logger.info(`Server is running on port ${serverConfig.PORT}`, { source: 'index.ts' });
  logger.info(`bull-board UI available at http://localhost:${serverConfig.PORT}/ui`, {
    source: 'index.ts',
  });

  SubmissionWorker(Submission_Queue_Name);
});
