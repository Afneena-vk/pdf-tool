const express = require("express");
const router = express.Router();
const upload = require("../utils/multer")
const { uploadPDF,  getPDF,  extractPDF, downloadPDF  } = require("../controllers/pdfController");


router.post("/upload", upload.single("pdf"), uploadPDF);
router.get("/:filename", getPDF);
router.post("/extract", extractPDF);
router.get("/download/:filename", downloadPDF);

module.exports = router;