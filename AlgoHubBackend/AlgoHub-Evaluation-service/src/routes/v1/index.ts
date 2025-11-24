import express from 'express';
import { ping } from '../../controller/ping.controller';
const v1router = express.Router();

v1router.get('/ping', ping);

export default v1router;
