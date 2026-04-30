import { useState } from "react";
import API from "../services/api";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");

  
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];

    
    if (selectedFile && selectedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    setFile(selectedFile);
  };

  
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const res = await API.post("/upload", formData);

      setFilename(res.data.filename);
      alert("File uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>

      {filename && (
        <p className="mt-4 text-green-600">
          Uploaded: {filename}
        </p>
      )}
    </div>
  );
};

export default Upload;