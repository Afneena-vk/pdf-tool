const STATUS_CODES = require("../utils/constants/statusCodes");

const notFound = (req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = STATUS_CODES.NOT_FOUND;

  next(error);
};

module.exports = notFound;