import express from 'express';
import v1router from './v1';
import logger from '../config/winston.config';

const apirouter = express.Router();

apirouter.use('/v1', v1router);

logger.info('API router mounted: /v1', { source: 'routes/index.ts' });

export default apirouter;
