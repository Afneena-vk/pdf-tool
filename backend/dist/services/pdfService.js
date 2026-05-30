"use strict";
// const fs = require("fs");
// const path = require("path");
// const { PDFDocument } = require("pdf-lib");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPages = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pdf_lib_1 = require("pdf-lib");
// exports.extractPages = async (filename, pages) => {
const extractPages = async (filename, pages) => {
    // const inputPath = path.join(__dirname, "../uploads", filename);
    const inputPath = path_1.default.join(process.cwd(), "uploads", filename);
    const outputFilename = `extracted-${Date.now()}.pdf`;
    // const outputPath = path.join(__dirname, "../output", outputFilename);
    const outputPath = path_1.default.join(process.cwd(), "output", outputFilename);
    const existingPdfBytes = fs_1.default.readFileSync(inputPath);
    const pdfDoc = await pdf_lib_1.PDFDocument.load(existingPdfBytes);
    const newPdf = await pdf_lib_1.PDFDocument.create();
    const copiedPages = await newPdf.copyPages(pdfDoc, pages.map(p => p - 1));
    copiedPages.forEach((page) => newPdf.addPage(page));
    const newPdfBytes = await newPdf.save();
    fs_1.default.writeFileSync(outputPath, newPdfBytes);
    return outputFilename;
};
exports.extractPages = extractPages;
