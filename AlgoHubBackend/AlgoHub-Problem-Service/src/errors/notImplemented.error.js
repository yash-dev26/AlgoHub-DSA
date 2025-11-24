const BaseError = require('./base.error');
const { StatusCodes } = require('http-status-codes');

class NotImplementedError extends BaseError {
    constructor(methodName){
        super("NotImplementedError", `The requested functionality '${methodName}' is not implemented.`, StatusCodes.NOT_IMPLEMENTED, details);
    }
}

module.exports = NotImplementedError;