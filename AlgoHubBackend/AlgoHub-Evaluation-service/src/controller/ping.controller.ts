import { Request, Response } from 'express';
import logger from '../config/winston.config';

export const ping = (req: Request, res: Response) => {
  logger.info(`Received ping request from ${req.ip}`);
  res.send('pong');
};
