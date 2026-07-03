import { Request, Response } from 'express';

export const ping = (_req: Request, res: Response) => {
  res.send('pong');
};
