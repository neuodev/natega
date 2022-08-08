import { NextFunction, Response, Request } from "express";
import ResposneError from "../utils/responseError";

export const errorHandler = (
  err: ResposneError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let msg = err.message;
  let statusCode = 500;
  if (err instanceof ResposneError) {
    statusCode = err.statusCode;
  }

  res.status(statusCode).json({ message: msg });
};
