import { ZodTypeAny } from 'zod';
import { Request, Response, NextFunction } from 'express';
import logger from '../config/winston.config';

export const validate =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        ...req.body,
      });
      next();
    } catch (error) {
      logger.error('Validation error:', error);
      return res.status(400).json({
        success: false,
        error: error,
        message: 'Validation failed',
      });
    }
  };
