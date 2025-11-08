class BaseError extends Error {
    constructor(name, message, statusCode, details) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.details = details;
    }
}

module.exports = BaseError;