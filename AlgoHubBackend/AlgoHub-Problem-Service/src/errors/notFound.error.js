const BaseError = require('./base.error');
const { StatusCodes } = require('http-status-codes');

class NotFound extends BaseError {
    constructor(resourceName, resourceValue) {
        super('NotFound', `Requested resource :'${resourceName}' with value ${resourceValue} not found.`, StatusCodes.NOT_FOUND, {
            resourceName,
            resourceValue
        });
    }
}

module.exports = NotFound;