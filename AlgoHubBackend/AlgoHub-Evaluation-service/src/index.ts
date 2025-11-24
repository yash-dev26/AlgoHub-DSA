import express, { Express } from 'express';
import serverConfig from './config/server.config';
import apirouter from './routes';

const app: Express = express();

app.use('/api', apirouter);

app.listen(serverConfig.PORT, () => {
  console.log(`Server is running on port ${serverConfig.PORT}`);
  console.log('Hello, AlgoHub Evaluation Service!');
});
