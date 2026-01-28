const BaseError = require('./base.error');
const { StatusCodes } = require('http-status-codes')

class SubmissionCreationError extends BaseError {
    constructor(details: any) {
        super('Not able to create submission', StatusCodes.BAD_REQUEST, `Not able to create submission`, details);
    }
}

export default SubmissionCreationError;