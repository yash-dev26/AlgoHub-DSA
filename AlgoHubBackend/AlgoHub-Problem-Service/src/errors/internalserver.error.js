const BaseError = require('./base.error');
const { StatusCodes } = require('http-status-codes');

class InternalServerError extends BaseError {
    constructor(details){
        super("InternalServerError", "The server encountered an internal error.", StatusCodes.INTERNAL_SERVER_ERROR, details);
    }
}

module.exports = InternalServerError;