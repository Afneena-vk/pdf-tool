const express = require("express");
const router = express.Router();
const upload = require("../utils/multer")
const { uploadPDF,  getPDF,  extractPDF, downloadPDF  } = require("../controllers/pdfController");


router.post("/upload", upload.single("pdf"), uploadPDF);
router.get("/:filename", getPDF);
router.get("/download/:filename", downloadPDF);
router.post("/extract", extractPDF);


module.exports = router;