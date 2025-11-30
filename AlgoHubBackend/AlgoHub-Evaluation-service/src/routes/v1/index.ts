import express from 'express';
import { ping } from '../../controller/ping.controller';
import submissionRouter from './submission.routes';
const v1router = express.Router();

v1router.use('/submissions', submissionRouter);
v1router.get('/ping', ping);

export default v1router;
