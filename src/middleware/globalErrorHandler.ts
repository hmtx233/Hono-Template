/** @notice library imports */
import type { HttpError } from "http-errors";
import { StatusCodes } from "http-status-codes";
import type { ErrorRequestHandler } from "express";
/// Local imports
import { Logger } from "@/config";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const globalErrorHandler: ErrorRequestHandler = (
  error: HttpError,
  _req,
  res,
  _next,
) => {
  Logger.error(error.message);
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    error: [error.message],
  });
};
