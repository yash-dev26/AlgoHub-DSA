const BaseError = require("../errors/base.error");
const { StatusCodes } = require("http-status-codes");

function errorHandler(err, req, res, next){
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
            name: "InternalServerError",
            message: "An unexpected error occurred.",
            error: err,
            data: {}
        });
    }
}

module.exports = errorHandler;