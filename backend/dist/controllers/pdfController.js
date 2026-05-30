"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadPDF = exports.extractPDF = exports.getPDF = exports.uploadPDF = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// const path = require("path");
// const fs = require("fs");
// const { extractPages } = require("../../services/pdfService");
// const STATUS_CODES = require("../../utils/constants/statusCodes");
const pdfService_1 = require("../services/pdfService");
const statusCodes_1 = __importDefault(require("../utils/constants/statusCodes"));
// exports.uploadPDF = (req, res, next) => {
const uploadPDF = (req, res, next) => {
    try {
        if (!req.file) {
            // const error = new Error("No file uploaded");
            const error = new Error("No file uploaded");
            error.statusCode = statusCodes_1.default.BAD_REQUEST;
            throw error;
        }
        res.status(statusCodes_1.default.OK).json({
            success: true,
            data: {
                filename: req.file.filename,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.uploadPDF = uploadPDF;
// exports.getPDF = (req, res, next) => {
const getPDF = (req, res, next) => {
    try {
        const filename = req.params.filename;
        // const filePath = path.join(__dirname, "../uploads", filename);
        const filePath = path_1.default.join(process.cwd(), "uploads", filename);
        if (!fs_1.default.existsSync(filePath)) {
            // return res.status(404).json({ message: "File not found" });
            // const error = new Error("File not found");
            const error = new Error("File not found");
            error.statusCode = statusCodes_1.default.NOT_FOUND;
            throw error;
        }
        res.sendFile(filePath);
    }
    catch (error) {
        next(error);
    }
};
exports.getPDF = getPDF;
// exports.extractPDF = async (req, res, next) => {
const extractPDF = async (req, res, next) => {
    try {
        const { filename, pages } = req.body;
        if (!filename) {
            // const error = new Error("Filename is required");
            const error = new Error("Filename is required");
            error.statusCode = 400;
            throw error;
        }
        if (!Array.isArray(pages) || pages.length === 0) {
            // const error = new Error("Pages must be a non-empty array");
            const error = new Error("Pages must be a non-empty array");
            error.statusCode = statusCodes_1.default.BAD_REQUEST;
            throw error;
        }
        const newFile = await (0, pdfService_1.extractPages)(filename, pages);
        res.status(statusCodes_1.default.OK).json({
            success: true,
            data: {
                newFile,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.extractPDF = extractPDF;
// exports.downloadPDF = (req, res, next) => {
const downloadPDF = (req, res, next) => {
    try {
        const filename = req.params.filename;
        // const filePath = path.join(__dirname, "../output", filename);
        const filePath = path_1.default.join(process.cwd(), "output", filename);
        if (!fs_1.default.existsSync(filePath)) {
            // return res.status(404).json({ message: "File not found" });
            // const error = new Error("File not found");
            const error = new Error("File not found");
            error.statusCode = statusCodes_1.default.NOT_FOUND;
            throw error;
        }
        res.download(filePath);
    }
    catch (error) {
        next(error);
    }
};
exports.downloadPDF = downloadPDF;
