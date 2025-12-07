import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const allowedTransports = [];

allowedTransports.push(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      // include optional source/file metadata when present
      winston.format.printf(
        (info) =>
          `${info.timestamp} [${info.level}]${info.source ? ` [${info.source}]` : ''}: ${info.message}`,
      ),
    ),
  }),
);

allowedTransports.push(
  new DailyRotateFile({
    filename: 'logs/app-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '15m', //maximum size of a log file is 15mb
    maxFiles: '7d', //keep logs for 7 days atmax
  }),
);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      (info) =>
        `${info.timestamp} [${info.level}]${info.source ? ` [${info.source}]` : ''}: ${info.message}`,
    ),
  ),
  transports: allowedTransports,
});

export default logger;
