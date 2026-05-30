import {
  Request,
  Response,
  NextFunction,
} from "express";

import path from "path";

import fs from "fs";

// const path = require("path");
// const fs = require("fs");
// const { extractPages } = require("../../services/pdfService");
// const STATUS_CODES = require("../../utils/constants/statusCodes");

import { extractPages } from "../services/pdfService";
import STATUS_CODES from "../utils/constants/statusCodes";

interface CustomError extends Error {
  statusCode?: number;
}


// exports.uploadPDF = (req, res, next) => {
export const uploadPDF = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      // const error = new Error("No file uploaded");
            const error: CustomError =
        new Error(
          "No file uploaded"
        );

      error.statusCode = STATUS_CODES.BAD_REQUEST;
      throw error;
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

// exports.getPDF = (req, res, next) => {
export const getPDF = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filename = req.params.filename as string;

    // const filePath = path.join(__dirname, "../uploads", filename);
      const filePath = path.join(
      process.cwd(),
      "uploads",  
      filename
    );

    if (!fs.existsSync(filePath)) {
      // return res.status(404).json({ message: "File not found" });
      // const error = new Error("File not found");
        const error: CustomError =
        new Error(
          "File not found"
        );
      error.statusCode = STATUS_CODES.NOT_FOUND;
      throw error;
    }

    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
};

// exports.extractPDF = async (req, res, next) => {
export const extractPDF = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filename, pages } = req.body;

    if (!filename) {
      // const error = new Error("Filename is required");
        const error: CustomError =
        new Error(
          "Filename is required"
        );
      error.statusCode = 400;
      throw error;
    }

    if (!Array.isArray(pages) || pages.length === 0) {
      // const error = new Error("Pages must be a non-empty array");
       const error: CustomError =
        new Error(
          "Pages must be a non-empty array"
        );

      error.statusCode = STATUS_CODES.BAD_REQUEST;
      throw error;
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

// exports.downloadPDF = (req, res, next) => {
export const downloadPDF = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filename = req.params.filename as string;

    // const filePath = path.join(__dirname, "../output", filename);

    const filePath = path.join(
      process.cwd(),
      "output",
      filename
    );

    if (!fs.existsSync(filePath)) {
      // return res.status(404).json({ message: "File not found" });
      // const error = new Error("File not found");

      const error: CustomError =
        new Error(
          "File not found"
        );


      error.statusCode = STATUS_CODES.NOT_FOUND;
      throw error;
    }

    res.download(filePath);
  } catch (error) {
    next(error);
  }
};
