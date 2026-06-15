
import {
  Request,
  Response,
  NextFunction,
} from "express";

import STATUS_CODES from "../utils/constants/statusCodes";
import { AppError } from "../utils/AppError";

const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(
    new AppError(
      "Route not found",
      STATUS_CODES.NOT_FOUND
    )
  );
};

export default notFound;




// //const STATUS_CODES = require("../utils/constants/statusCodes");

// import {
//   Request,
//   Response,
//   NextFunction,
// } from "express";

// import STATUS_CODES from "../utils/constants/statusCodes";

// interface CustomError extends Error {
//   statusCode?: number;
// }

// // const notFound = (req, res, next) => {
// const notFound = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {

// //  const error = new Error("Route not found");

//   const error: CustomError =
//     new Error(
//       "Route not found"
//     );

//   error.statusCode = STATUS_CODES.NOT_FOUND;

//   next(error);
// };

// // module.exports = notFound;
// export default notFound;