import BaseError from "../errors/base.error.js";
import { StatusCodes } from "http-status-codes";

function errorHandler(error: any, request: any, reply: any) {
    if (error instanceof BaseError) {
        reply.status(error.statusCode).send({
            success: false,
            message: error.message,
            error: error.details,
            data: {} // Because this is an exception so no data is going to be provided.
        });
    } else {
        reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "something went wrong!",
            error: error.message || error, // Ensure `error.message` is used if available
            data: {} // Because this is an exception so no data is going to be provided.
        });
    }
}

export default errorHandler;