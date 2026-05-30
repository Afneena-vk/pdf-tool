"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodes_1 = __importDefault(require("../utils/constants/statusCodes"));
// const errorHandler = (err, req, res, next) => {
const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || statusCodes_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message || "Something went wrong",
    });
};
exports.default = errorHandler;
// module.exports = errorHandler;
