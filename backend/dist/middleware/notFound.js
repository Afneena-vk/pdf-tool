"use strict";
//const STATUS_CODES = require("../utils/constants/statusCodes");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodes_1 = __importDefault(require("../utils/constants/statusCodes"));
// const notFound = (req, res, next) => {
const notFound = (req, res, next) => {
    //  const error = new Error("Route not found");
    const error = new Error("Route not found");
    error.statusCode = statusCodes_1.default.NOT_FOUND;
    next(error);
};
// module.exports = notFound;
exports.default = notFound;
