const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

exports.extractPages = async (filename, pages) => {
  const inputPath = path.join(__dirname, "../uploads", filename);
  const outputFilename = `extracted-${Date.now()}.pdf`;
  const outputPath = path.join(__dirname, "../output", outputFilename);

  
  const existingPdfBytes = fs.readFileSync(inputPath);


  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  
  const newPdf = await PDFDocument.create();


  const copiedPages = await newPdf.copyPages(
    pdfDoc,
    pages.map(p => p - 1) // convert to 0-based index
  );

  copiedPages.forEach((page) => newPdf.addPage(page));


  const newPdfBytes = await newPdf.save();
  fs.writeFileSync(outputPath, newPdfBytes);

  return outputFilename;
};