const path = require("path");
const fs = require("fs");
const { extractPages } = require("../services/pdfService");

exports.uploadPDF = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        filename: req.file.filename,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// if (!req.file) {
//   return res.status(400).json({ message: "No file uploaded" });
// }

//     res.status(200).json({
//       message: "File uploaded successfully",
//       filename: req.file.filename,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.getPDF = (req, res) => {
  const filename = req.params.filename;

  const filePath = path.join(__dirname, "../uploads", filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }

  res.sendFile(filePath);
};

exports.extractPDF = async (req, res) => {
  try {
    const { filename, pages } = req.body;

    // if (!filename || !pages) {
    //   return res.status(400).json({ message: "Missing data" });
    // }

    if (!filename) {
      return res.status(400).json({
        success: false,
        message: "Filename is required",
      });
    }

    if (!Array.isArray(pages) || pages.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Pages must be a non-empty array",
      });
    }

    const newFile = await extractPages(filename, pages);

    res.status(200).json({
      success: true,
      data: {
        newFile,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//     res.status(200).json({
//       message: "PDF pages extracted successfully",
//       newFile,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.downloadPDF = (req, res) => {
  const filename = req.params.filename;

  const filePath = path.join(__dirname, "../output", filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }

  res.download(filePath);
};
