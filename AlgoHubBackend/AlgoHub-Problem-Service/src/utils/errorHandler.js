const BaseError = require('../errors/base.error');
const { StatusCodes } = require('http-status-codes');
const logger = require('../config/logger.config');

function errorHandler(err, req, res, next){
    // Log the error with request context
    logger.error(`${req.method} ${req.originalUrl} -> Error: ${err.message}`, { stack: err.stack });

    if (err instanceof BaseError){
        return res.status(err.statusCode).json({
            success: false,
            name: err.name,
            message: err.message,
            details: err.details,
            data: {}
        });
    } else {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            name: 'InternalServerError',
            message: 'An unexpected error occurred.',
            error: {},
            data: {}
        });
    }
}

module.exports = errorHandler;