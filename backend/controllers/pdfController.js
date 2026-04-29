const path = require("path");
const fs = require("fs");

exports.uploadPDF = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({
      message: "File uploaded successfully",
      filename: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getPDF = (req, res) => {
  const filename = req.params.filename;

  const filePath = path.join(__dirname, "../uploads", filename);

  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }

  
  res.sendFile(filePath);
};