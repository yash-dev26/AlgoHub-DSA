const winston = require('winston');

const allowedTransports = [];

allowedTransports.push(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`)
    )
}));


const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`)
    ),
    transports: allowedTransports
});


module.exports = logger;