// const express = require("express");
import express from "express";
import upload from "../utils/multer";
// import { uploadPDF, getPDF, extractPDF,downloadPDF } from "../controllers/pdfController";
import PdfRepository from "../repositories/pdfRepository";
import { PdfService } from "../services/pdfService";
import { PdfController } from "../controllers/pdfController";

 const router = express.Router();
// const upload = require("../../utils/multer")
//const { uploadPDF,  getPDF,  extractPDF, downloadPDF  } = require("../controllers/pdfController");
const pdfRepository =
  new PdfRepository();

const pdfService =
  new PdfService(pdfRepository);

const pdfController =
  new PdfController(pdfService);

router.post("/upload", upload.single("pdf"), pdfController.uploadPDF);
router.get("/:filename", pdfController.getPDF);
router.get("/download/:filename", pdfController.downloadPDF);
router.post("/extract", pdfController.extractPDF);

export default router;
// module.exports = router;