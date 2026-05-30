// const express = require("express");
import express from "express";
import upload from "../utils/multer";
import { uploadPDF, getPDF, extractPDF,downloadPDF } from "../controllers/pdfController";

 const router = express.Router();
// const upload = require("../../utils/multer")
//const { uploadPDF,  getPDF,  extractPDF, downloadPDF  } = require("../controllers/pdfController");


router.post("/upload", upload.single("pdf"), uploadPDF);
router.get("/:filename", getPDF);
router.get("/download/:filename", downloadPDF);
router.post("/extract", extractPDF);

export default router;
// module.exports = router;