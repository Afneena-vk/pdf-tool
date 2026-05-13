const STATUS_CODES = require("../utils/constants/statusCodes");

const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};

module.exports = errorHandler;