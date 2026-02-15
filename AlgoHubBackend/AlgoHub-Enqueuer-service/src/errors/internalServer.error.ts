import BaseError from "./base.error.js";
import { StatusCodes } from "http-status-codes";

class InternalServerError extends BaseError {
    constructor(details: any) {
        super("Internal server error", StatusCodes.INTERNAL_SERVER_ERROR, `something went wrong!`, details);
    }
}

export default InternalServerError;