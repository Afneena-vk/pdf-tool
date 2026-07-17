import { Request, Response, NextFunction } from "express";
//import { PdfService } from "../services/pdfService";
import { IPdfService } from "../services/interfaces/IPdfService";

import { AppError } from "../utils/AppError";


import STATUS_CODES from "../utils/constants/statusCodes";

export class PdfController {

  constructor(
      private pdfService: IPdfService
    // private pdfService: PdfService
  ) {}

// export const uploadPDF = (req: Request, res: Response, next: NextFunction) => {
  uploadPDF = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
  try {
    if (!req.file) {
      throw new AppError("No file uploaded", STATUS_CODES.BAD_REQUEST);
    }

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: {
        filename: req.file.filename,
      },
    });
  } catch (error) {
    next(error);
  }
};

// export const getPDF = (req: Request, res: Response, next: NextFunction) => {
  getPDF = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
  try {
    const filename = req.params.filename as string;

    const filePath = this.pdfService.getUploadedPdfPath(filename);

    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
};

// export const extractPDF = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
  extractPDF = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

  try {
    const { filename, pages } = req.body;

    if (!filename) {
      throw new AppError("Filename is required", STATUS_CODES.BAD_REQUEST);
    }

    if (!Array.isArray(pages) || pages.length === 0) {
      throw new AppError(
        "Pages must be a non-empty array",
        STATUS_CODES.BAD_REQUEST,
      );
    }

    const newFile = await this.pdfService.extractPages(filename, pages);

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: {
        newFile,
      },
    });
  } catch (error) {
    next(error);
  }
};

// export const downloadPDF = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
  downloadPDF = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
  try {
    const filename = req.params.filename as string;

    const filePath = this.pdfService.getOutputPdfPath(filename);

    res.download(filePath);
  } catch (error) {
    next(error);
  }

}
};
