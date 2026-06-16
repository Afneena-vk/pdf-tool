
import { PDFDocument } from "pdf-lib";
import PdfRepository from "../repositories/pdfRepository";
import { AppError } from "../utils/AppError";

import STATUS_CODES from "../utils/constants/statusCodes";


export class PdfService {
  constructor(
    private pdfRepository: PdfRepository
  ) {}

// export const extractPages = async (
//   filename: string,
//   pages: number[]
// ): Promise<string> => {

  async extractPages(
    filename: string,
    pages: number[]
  ): Promise<string> {

  const outputFilename = `extracted-${Date.now()}.pdf`;

  
  // const existingPdfBytes = pdfRepository.readPdf(filename)

  const existingPdfBytes =
      this.pdfRepository.readPdf(filename);


  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  
  const newPdf = await PDFDocument.create();


  const copiedPages = await newPdf.copyPages(
    pdfDoc,
    pages.map(p => p - 1) 
  );

  copiedPages.forEach((page) => newPdf.addPage(page));


  const newPdfBytes = await newPdf.save();
  

  this.pdfRepository.savePdf(outputFilename, newPdfBytes)

  return outputFilename;
};


// export const getUploadedPdfPath = (
//   filename: string
// ): string => {
  getUploadedPdfPath(
    filename: string
  ): string {

  if (
    !this.pdfRepository.fileExists(
      "uploads",
      filename
    )
  ) {
    
     throw new AppError(
    "File not found",
     STATUS_CODES.NOT_FOUND
);
  }

  return this.pdfRepository.getInputPath(
    filename
  );
};


// export const getOutputPdfPath = (

//   filename: string

// ): string => {

  getOutputPdfPath(
    filename: string
  ): string {


  if (

    !this.pdfRepository.fileExists(

      "output", 

      filename

    )

  ) {


    throw new AppError(
      "File not found",
      STATUS_CODES.NOT_FOUND
    );

  }



  return this.pdfRepository.getOutputPath( 

    filename

  );
}

};