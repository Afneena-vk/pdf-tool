const express = require("express");
const router = express.Router();
const upload = require("../utils/multer")
const { uploadPDF,  getPDF } = require("../controllers/pdfController");


router.post("/upload", upload.single("pdf"), uploadPDF);
router.get("/:filename", getPDF);

module.exports = router;