const express = require("express");
const router = express.Router();
const upload = require("../utils/multer")
const { uploadPDF,  getPDF,  extractPDF  } = require("../controllers/pdfController");


router.post("/upload", upload.single("pdf"), uploadPDF);
router.get("/:filename", getPDF);
router.post("/extract", extractPDF);

module.exports = router;