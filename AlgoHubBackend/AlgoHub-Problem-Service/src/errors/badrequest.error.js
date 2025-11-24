const BaseError = require('./BaseError');
const {StatusCodes} = require('http-status-codes');

class BadRequest extends BaseError {
    constructor(propertyName, details) {
        super("BadRequest", `Invalid value provided for '${propertyName}'.`, StatusCodes.BAD_REQUEST, details);
    }
}

module.exports = BadRequest;
