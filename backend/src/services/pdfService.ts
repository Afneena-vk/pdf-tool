// const fs = require("fs");
// const path = require("path");
// const { PDFDocument } = require("pdf-lib");

import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";


// exports.extractPages = async (filename, pages) => {
export const extractPages = async (
  filename: string,
  pages: number[]
): Promise<string> => {
  // const inputPath = path.join(__dirname, "../uploads", filename);
    const inputPath = path.join(
    process.cwd(),
    "uploads",
    filename
  );

  const outputFilename = `extracted-${Date.now()}.pdf`;

  // const outputPath = path.join(__dirname, "../output", outputFilename);
    const outputPath = path.join(
    process.cwd(),
    "output",
    outputFilename
  );

  
  
  const existingPdfBytes = fs.readFileSync(inputPath);


  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  
  const newPdf = await PDFDocument.create();


  const copiedPages = await newPdf.copyPages(
    pdfDoc,
    pages.map(p => p - 1) 
  );

  copiedPages.forEach((page) => newPdf.addPage(page));


  const newPdfBytes = await newPdf.save();
  fs.writeFileSync(outputPath, newPdfBytes);

  return outputFilename;
};