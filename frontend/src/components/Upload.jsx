import { useState } from "react";
import API from "../services/api";
import Preview from "./Preview";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [selectedPages, setSelectedPages] = useState([]);
  const [newFile, setNewFile] = useState("");
  
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

      // setFilename(res.data.filename);
      setFilename(res.data.data.filename);

      alert("File uploaded successfully");
    // } catch (err) {
    //   console.error(err);
    //   alert("Upload failed");
    // }
 } catch (err) {
  console.error(err);

  alert(
    err.response?.data?.message || "Upload failed"
  );
}
  };

  const handleExtract = async () => {
  if (!filename) {
    alert("Upload a file first");
    return;
  }

  if (selectedPages.length === 0) {
    alert("Select at least one page");
    return;
  }

  try {
    const res = await API.post("/extract", {
      filename,
      pages: selectedPages,
    });

    // setNewFile(res.data.newFile);
    setNewFile(res.data.data.newFile);
    alert("PDF extracted successfully");
  // } catch (err) {
  //   console.error(err);
  //   alert("Extraction failed");
  // }
  } catch (err) {
  console.error(err);

  alert(
    err.response?.data?.message || "Extraction failed"
  );
}
};


return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6">

      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-6">
        PDF Page Extractor
      </h1>

      {/* Upload Section */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          className="border p-2 rounded w-full sm:w-auto"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
        >
          Upload
        </button>
      </div>

      {/* Uploaded File */}
      {filename && (
        <p className="mt-4 text-center text-green-600 font-medium">
          Uploaded: {filename}
        </p>
      )}

      {/* Preview */}
      <div className="mt-6">
        <Preview filename={filename} setSelectedPages={setSelectedPages} />
      </div>

      {/* Selected Pages */}
      {selectedPages.length > 0 && (
        <p className="mt-4 text-center text-gray-700">
          Selected Pages:{" "}
          <span className="font-semibold">
            {selectedPages.join(", ")}
          </span>
        </p>
      )}

      {/* Actions */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">

        {/* Extract */}
        {filename && (
          <button
            onClick={handleExtract}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
          >
            Extract Pages
          </button>
        )}

        {/* Download */}
        {newFile && (
          <a
            href={`${import.meta.env.VITE_API_URL}/download/${newFile}`}
            download
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded transition"
          >
            Download PDF
          </a>
        )}
      </div>

    </div>
  </div>
);

};

export default Upload;





//   return (
//     <div className="p-6 border rounded-lg shadow-md max-w-md mx-auto mt-10">
//       <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>

//       <input
//         type="file"
//         accept="application/pdf"
//         onChange={handleChange}
//         className="mb-4"
//       />

//       <button
//         onClick={handleUpload}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Upload
//       </button>

//       {filename && (
//         <p className="mt-4 text-green-600">
//           Uploaded: {filename}
//         </p>
//       )}

//     <Preview filename={filename} setSelectedPages={setSelectedPages}/>

//           {selectedPages.length > 0 && (
//         <p className="mt-4">
//           Selected Pages: {selectedPages.join(", ")}
//         </p>
//       )}

//       {/* Extract Button */}
// {filename && (
//   <button
//     onClick={handleExtract}
//     className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
//   >
//     Extract Pages
//   </button>
// )}

// {/* Download Link */}
// {newFile && (
//   <div className="mt-4">
//     <a
//       href={`${import.meta.env.VITE_API_URL}/download/${newFile}`}
//       className="text-blue-600 underline"
//     >
//       Download Extracted PDF
//     </a>
//   </div>
// )}

//     </div>
//   );