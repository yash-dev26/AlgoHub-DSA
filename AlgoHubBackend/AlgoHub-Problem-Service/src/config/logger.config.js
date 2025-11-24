const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const allowedTransports = [];

allowedTransports.push(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`)
    )
}));

allowedTransports.push(new DailyRotateFile({
    filename: 'logs/app-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '15m', //maximum size of a log file is 15mb
    maxFiles: '7d' //keep logs for 7 days atmax
}));


const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`)
    ),
    transports: allowedTransports
});


module.exports = logger;