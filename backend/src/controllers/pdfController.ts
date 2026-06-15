import { Request, Response, NextFunction } from "express";

import { AppError } from "../utils/AppError";

import {
  extractPages,
  getUploadedPdfPath,
  getOutputPdfPath,
} from "../services/pdfService";

import STATUS_CODES from "../utils/constants/statusCodes";

export const uploadPDF = (req: Request, res: Response, next: NextFunction) => {
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

export const getPDF = (req: Request, res: Response, next: NextFunction) => {
  try {
    const filename = req.params.filename as string;

    const filePath = getUploadedPdfPath(filename);

    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
};

export const extractPDF = async (
  req: Request,
  res: Response,
  next: NextFunction,
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

    const newFile = await extractPages(filename, pages);

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

export const downloadPDF = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const filename = req.params.filename as string;

    const filePath = getOutputPdfPath(filename);

    res.download(filePath);
  } catch (error) {
    next(error);
  }
};
