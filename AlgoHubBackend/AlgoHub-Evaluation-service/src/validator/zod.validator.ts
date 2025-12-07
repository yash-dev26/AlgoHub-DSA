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
      logger.error(`Validation error: ${String(error)}`, { source: 'validator/zod.validator.ts' });
      return res.status(400).json({
        success: false,
        error: error,
        message: 'Validation failed',
      });
    }
  };
