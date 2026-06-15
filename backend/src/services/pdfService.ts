
import { PDFDocument } from "pdf-lib";
import pdfRepository from "../repositories/pdfRepository";
import { AppError } from "../utils/AppError";

import STATUS_CODES from "../utils/constants/statusCodes";


export const extractPages = async (
  filename: string,
  pages: number[]
): Promise<string> => {

  const outputFilename = `extracted-${Date.now()}.pdf`;

  
  const existingPdfBytes = pdfRepository.readPdf(filename)


  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  
  const newPdf = await PDFDocument.create();


  const copiedPages = await newPdf.copyPages(
    pdfDoc,
    pages.map(p => p - 1) 
  );

  copiedPages.forEach((page) => newPdf.addPage(page));


  const newPdfBytes = await newPdf.save();
  

  pdfRepository.savePdf(outputFilename, newPdfBytes)

  return outputFilename;
};


export const getUploadedPdfPath = (
  filename: string
): string => {

  if (
    !pdfRepository.fileExists(
      "uploads",
      filename
    )
  ) {
    
     throw new AppError(
    "File not found",
     STATUS_CODES.NOT_FOUND
);
  }

  return pdfRepository.getInputPath(
    filename
  );
};


export const getOutputPdfPath = (

  filename: string

): string => {



  if (

    !pdfRepository.fileExists(

      "output", 

      filename

    )

  ) {


    throw new AppError(
      "File not found",
      STATUS_CODES.NOT_FOUND
    );

  }



  return pdfRepository.getOutputPath( 

    filename

  );

};