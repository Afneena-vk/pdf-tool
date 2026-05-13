const path = require("path");
const fs = require("fs");
const { extractPages } = require("../services/pdfService");
const STATUS_CODES = require("../utils/constants/statusCodes");

exports.uploadPDF = (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error("No file uploaded");
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

exports.getPDF = (req, res, next) => {
  try {
    const filename = req.params.filename;

    const filePath = path.join(__dirname, "../uploads", filename);

    if (!fs.existsSync(filePath)) {
      // return res.status(404).json({ message: "File not found" });
      const error = new Error("File not found");
      error.statusCode = STATUS_CODES.NOT_FOUND;
      throw error;
    }

    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
};

exports.extractPDF = async (req, res, next) => {
  try {
    const { filename, pages } = req.body;

    if (!filename) {
      const error = new Error("Filename is required");
      error.statusCode = 400;
      throw error;
    }

    if (!Array.isArray(pages) || pages.length === 0) {
      const error = new Error("Pages must be a non-empty array");
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

exports.downloadPDF = (req, res, next) => {
  try {
    const filename = req.params.filename;

    const filePath = path.join(__dirname, "../output", filename);

    if (!fs.existsSync(filePath)) {
      // return res.status(404).json({ message: "File not found" });
      const error = new Error("File not found");
      error.statusCode = STATUS_CODES.NOT_FOUND;
      throw error;
    }

    res.download(filePath);
  } catch (error) {
    next(error);
  }
};
