const express = require("express");
const router = express.Router();
const upload = require("../utils/multer")
const { uploadPDF } = require("../controllers/pdfController");


router.post("/upload", upload.single("pdf"), uploadPDF);

module.exports = router;