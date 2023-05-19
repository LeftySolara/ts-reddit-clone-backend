import { Response } from "express";
import logger from "@utils/logger";
import AppError from "./appError";
import { commonErrorNames, commonHttpErrors } from "./errorTypes";

class ErrorHandler {
  private static isTrustedError(error: Error) {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }

  private static async crashIfUntrustedErrorOrSendResponse(
    error: Error,
    response: Response | null,
  ) {
    if (!response || !ErrorHandler.isTrustedError(error)) {
      process.exit(1);
    }

    if (error instanceof AppError) {
      return response
        .status(error.httpCode)
        .json({ message: error.message, errorName: error.name });
    }

    return response
      .status(commonHttpErrors.internalServerError)
      .json(commonErrorNames.internalServerError);
  }

  public static async handleError(error: Error, response: Response | null) {
    logger.error(error);
    await ErrorHandler.crashIfUntrustedErrorOrSendResponse(error, response);
  }
}

export default ErrorHandler;
