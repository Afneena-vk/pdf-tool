"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../utils/multer"));
const pdfController_1 = require("../controllers/pdfController");
const router = express_1.default.Router();
// const upload = require("../../utils/multer")
//const { uploadPDF,  getPDF,  extractPDF, downloadPDF  } = require("../controllers/pdfController");
router.post("/upload", multer_1.default.single("pdf"), pdfController_1.uploadPDF);
router.get("/:filename", pdfController_1.getPDF);
router.get("/download/:filename", pdfController_1.downloadPDF);
router.post("/extract", pdfController_1.extractPDF);
exports.default = router;
// module.exports = router;
