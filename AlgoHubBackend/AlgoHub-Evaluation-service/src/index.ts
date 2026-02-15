import express, { Express } from 'express';
import serverConfig from './config/server.config';
import apirouter from './routes';
// import SampleProducer from './producer/Sample.producer';
// import SampleWorker from './consumer/sample.consumer';
import logger from './config/winston.config';
import bullAdapter from './config/bullBoard.config';
import bodyParser from 'body-parser';
// import runCppCode from './container/cpp.container';
import { Submission_Queue_Name } from './utils/constants';
import SubmissionWorker from './consumer/submission.consumer';
import submissionProducer from './producer/submission.producer';

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

  // // SampleWorker('SampleQueue');
  // const code = `
  // #include <iostream>
  // using namespace std;
  // int main() {
  //   int n;
  //   cin >> n;
  //   cout << n * 2 << endl;
  //   for(int i = 0; i < n; i++) {
  //       cout << "Hello, World!" << endl;
  //   }
  //   return 0;
  // }
  // `;

  SubmissionWorker(Submission_Queue_Name);
  // submissionProducer({
  //   '1234': {
  //     language: 'CPP',
  //     code,
  //     input: '5',
  //   },
  // });

  // SampleProducer('SampleJob', {
  //   name: 'TestPayload',
  //   value: 42,
  //   location: 'TestLocation',
  //   language: 'js',
  // });
  //
  //   runCppCode(code, { input: '8', output: '' });
});
