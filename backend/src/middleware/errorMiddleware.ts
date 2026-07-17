
import { Request, Response, NextFunction } from "express";
import STATUS_CODES from "../utils/constants/statusCodes";
import { AppError } from "../utils/AppError";

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;







// // const STATUS_CODES = require("../../utils/constants/statusCodes");
// import {
//   Request,
//   Response,
//   NextFunction,
// } from "express";

// import STATUS_CODES from "../utils/constants/statusCodes";

// interface CustomError extends Error {
//   statusCode?: number;
// }


// // const errorHandler = (err, req, res, next) => {
// const errorHandler = (
//   err: CustomError,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   res.status(err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
//     success: false,
//     message: err.message || "Something went wrong",
//   });
// };

// export default errorHandler;
// // module.exports = errorHandler;