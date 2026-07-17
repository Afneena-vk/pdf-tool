import { useState } from "react";
// import API from "../services/api";
import Preview from "./Preview";
import { uploadPdf, extractPdf } from "../services/pdfService";
import axios from "axios";
import {
  UploadCloud,
  FileText,
  Download,
  Sparkles,
} from "lucide-react";
import { toast } from "react-toastify";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);

  const [filename, setFilename] = useState<string>("");

  const [selectedPages, setSelectedPages] =
    useState<number[]>([]);

  const [newFile, setNewFile] = useState<string>("");

  const [uploading, setUploading] =
    useState<boolean>(false);

  const [extracting, setExtracting] =
    useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (
      selectedFile &&
      selectedFile.type !== "application/pdf"
    ) {
      // alert("Only PDF files are allowed");
      toast.error("Only PDF files are allowed");
      return;
    }

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
     // alert("Please select a file");
     toast.warning("Please select a file");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("pdf", file);

      // const res = await API.post("/upload", formData);

      // setFilename(res.data.data.filename);

      const data = await uploadPdf(
         formData
      );

      setFilename(
         data.data.filename
      );
         toast.success("File uploaded successfully");
      // alert("File uploaded successfully");

//     } catch (err: any) {

//       console.error(err);

//       // alert(
//       //   err.response?.data?.message ||
//       //     "Upload failed"
//       // );

// toast.error(
//   err.response?.data?.message ||
//   "Upload failed"
// );
//     } 
  } catch (err: unknown) {
  console.error(err);

  if (axios.isAxiosError(err)) {
    toast.error(
      err.response?.data?.message ||
      "Upload failed"
    );
  } else {
    toast.error("Upload failed");
  }
}
    finally {

      setUploading(false);
    }
  };

  const handleExtract = async () => {

    if (!filename) {

      alert("Upload a file first");

      return;
    }

    if (selectedPages.length === 0) {

      // alert("Select at least one page");
      toast.warning("Select at least one page");

      return;
    }

    try {

      setExtracting(true);

      // const res = await API.post("/extract", {
      //   filename,
      //   pages: selectedPages,
      // });

      // setNewFile(res.data.data.newFile);

      const data = await extractPdf(
       filename,
      selectedPages
      );

      setNewFile(
        data.data.newFile
      );
      toast.success("PDF extracted successfully");
      // alert("PDF extracted successfully");

    // } catch (err: any) {

    //   console.error(err);


    //   toast.error(
    //    err.response?.data?.message ||
    //    "Extraction failed"
    // );
    } catch (err: unknown) {
  console.error(err);

  if (axios.isAxiosError(err)) {
    toast.error(
      err.response?.data?.message ||
      "Extraction failed"
    );
  } else {
    toast.error("Extraction failed");
  }

      // alert(
      //   err.response?.data?.message ||
      //     "Extraction failed"
      // );

    }
     finally {

      setExtracting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white p-6">

      {/* Header */}
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">

          <div className="flex justify-center mb-4">

            <div className="bg-indigo-500/20 p-4 rounded-full">

              <Sparkles className="w-10 h-10 text-indigo-400" />

            </div>
          </div>

          <h1 className="text-4xl font-bold mb-3">
            PDF Page Extractor
          </h1>

          <p className="text-slate-300 max-w-xl mx-auto">
            Upload your PDF, preview pages,
            select the pages you want,
            and download the extracted PDF instantly.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-6 md:p-10">

          {/* Upload Area */}
          <div className="border-2 border-dashed border-indigo-400/40 rounded-2xl p-8 text-center bg-slate-900/40">

            <div className="flex justify-center mb-4">

              <UploadCloud className="w-14 h-14 text-indigo-400" />

            </div>

            <h2 className="text-xl font-semibold mb-2">
              Upload PDF File
            </h2>

            <p className="text-slate-400 mb-6">
              Select a PDF file to preview
              and extract pages
            </p>

            <input
              type="file"
              accept="application/pdf"
              onChange={handleChange}
              className="hidden"
              id="pdfUpload"
            />

            <label
              htmlFor="pdfUpload"
              className="cursor-pointer inline-block bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-xl font-medium"
            >
              Choose PDF
            </label>

            {file && (
              <div className="mt-5 flex items-center justify-center gap-2 text-green-400">

                <FileText className="w-5 h-5" />

                <span>{file.name}</span>

              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="mt-6 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 transition px-8 py-3 rounded-xl font-semibold"
            >
              {uploading
                ? "Uploading..."
                : "Upload PDF"}
            </button>
          </div>

          {/* Uploaded File */}
          {filename && (
            <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-green-300 text-center">
              Uploaded Successfully
            </div>
          )}

          {/* Preview */}
          <div className="mt-10">

            <Preview
              filename={filename}
              setSelectedPages={setSelectedPages}
            />

          </div>

          {/* Selected Pages */}
          {selectedPages.length > 0 && (
            <div className="mt-6 bg-indigo-500/10 border border-indigo-400/20 rounded-xl p-4 text-center">

              <p className="text-slate-200">
                Selected Pages:
              </p>

              <div className="mt-2 flex flex-wrap justify-center gap-2">

                {selectedPages.map((page) => (
                  <span
                    key={page}
                    className="bg-indigo-500 px-3 py-1 rounded-full text-sm"
                  >
                    {page}
                  </span>
                ))}

              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

            {filename && (
              <button
                onClick={handleExtract}
                disabled={extracting}
                className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 transition px-8 py-3 rounded-xl font-semibold"
              >
                {extracting
                  ? "Extracting..."
                  : "Extract Pages"}
              </button>
            )}

            {newFile && (
              <a
                href={`${import.meta.env.VITE_API_URL}/download/${newFile}`}
                download
                onClick={() => toast.info("Download started")}
                className="bg-indigo-600 hover:bg-indigo-700 transition px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />

                Download PDF
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;

// import { useState } from "react";
// import API from "../services/api";
// import Preview from "./Preview";
// import {
//   UploadCloud,
//   FileText,
//   Download,
//   Sparkles,
// } from "lucide-react";

// const Upload = () => {
//   const [file, setFile] = useState(null);
//   const [filename, setFilename] = useState("");
//   const [selectedPages, setSelectedPages] = useState([]);
//   const [newFile, setNewFile] = useState("");

//   const [uploading, setUploading] = useState(false);
//   const [extracting, setExtracting] = useState(false);

//   const handleChange = (e) => {
//     const selectedFile = e.target.files[0];

//     if (selectedFile && selectedFile.type !== "application/pdf") {
//       alert("Only PDF files are allowed");
//       return;
//     }

//     setFile(selectedFile);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a file");
//       return;
//     }

//     try {
//       setUploading(true);

//       const formData = new FormData();
//       formData.append("pdf", file);

//       const res = await API.post("/upload", formData);

//       setFilename(res.data.data.filename);

//       alert("File uploaded successfully");
//     } catch (err) {
//       console.error(err);

//       alert(err.response?.data?.message || "Upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleExtract = async () => {
//     if (!filename) {
//       alert("Upload a file first");
//       return;
//     }

//     if (selectedPages.length === 0) {
//       alert("Select at least one page");
//       return;
//     }

//     try {
//       setExtracting(true);

//       const res = await API.post("/extract", {
//         filename,
//         pages: selectedPages,
//       });

//       setNewFile(res.data.data.newFile);

//       alert("PDF extracted successfully");
//     } catch (err) {
//       console.error(err);

//       alert(err.response?.data?.message || "Extraction failed");
//     } finally {
//       setExtracting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white p-6">

//       {/* Header */}
//       <div className="max-w-6xl mx-auto">

//         <div className="text-center mb-10">
//           <div className="flex justify-center mb-4">
//             <div className="bg-indigo-500/20 p-4 rounded-full">
//               <Sparkles className="w-10 h-10 text-indigo-400" />
//             </div>
//           </div>

//           <h1 className="text-4xl font-bold mb-3">
//             PDF Page Extractor
//           </h1>

//           <p className="text-slate-300 max-w-xl mx-auto">
//             Upload your PDF, preview pages, select the pages you want,
//             and download the extracted PDF instantly.
//           </p>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-6 md:p-10">

//           {/* Upload Area */}
//           <div className="border-2 border-dashed border-indigo-400/40 rounded-2xl p-8 text-center bg-slate-900/40">

//             <div className="flex justify-center mb-4">
//               <UploadCloud className="w-14 h-14 text-indigo-400" />
//             </div>

//             <h2 className="text-xl font-semibold mb-2">
//               Upload PDF File
//             </h2>

//             <p className="text-slate-400 mb-6">
//               Select a PDF file to preview and extract pages
//             </p>

//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={handleChange}
//               className="hidden"
//               id="pdfUpload"
//             />

//             <label
//               htmlFor="pdfUpload"
//               className="cursor-pointer inline-block bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-xl font-medium"
//             >
//               Choose PDF
//             </label>

//             {file && (
//               <div className="mt-5 flex items-center justify-center gap-2 text-green-400">
//                 <FileText className="w-5 h-5" />
//                 <span>{file.name}</span>
//               </div>
//             )}

//             <button
//               onClick={handleUpload}
//               disabled={uploading}
//               className="mt-6 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 transition px-8 py-3 rounded-xl font-semibold"
//             >
//               {uploading ? "Uploading..." : "Upload PDF"}
//             </button>
//           </div>

//           {/* Uploaded File */}
//           {filename && (
//             <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-green-300 text-center">
//               Uploaded Successfully
//             </div>
//           )}

//           {/* Preview */}
//           <div className="mt-10">
//             <Preview
//               filename={filename}
//               setSelectedPages={setSelectedPages}
//             />
//           </div>

//           {/* Selected Pages */}
//           {selectedPages.length > 0 && (
//             <div className="mt-6 bg-indigo-500/10 border border-indigo-400/20 rounded-xl p-4 text-center">
//               <p className="text-slate-200">
//                 Selected Pages:
//               </p>

//               <div className="mt-2 flex flex-wrap justify-center gap-2">
//                 {selectedPages.map((page) => (
//                   <span
//                     key={page}
//                     className="bg-indigo-500 px-3 py-1 rounded-full text-sm"
//                   >
//                     {page}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

//             {filename && (
//               <button
//                 onClick={handleExtract}
//                 disabled={extracting}
//                 className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 transition px-8 py-3 rounded-xl font-semibold"
//               >
//                 {extracting ? "Extracting..." : "Extract Pages"}
//               </button>
//             )}

//             {newFile && (
//               <a
//                 href={`${import.meta.env.VITE_API_URL}/download/${newFile}`}
//                 download
//                 className="bg-indigo-600 hover:bg-indigo-700 transition px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
//               >
//                 <Download className="w-5 h-5" />
//                 Download PDF
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Upload;

// import { useState } from "react";
// import API from "../services/api";
// import Preview from "./Preview";

// const Upload = () => {
//   const [file, setFile] = useState(null);
//   const [filename, setFilename] = useState("");
//   const [selectedPages, setSelectedPages] = useState([]);
//   const [newFile, setNewFile] = useState("");
  
//   const handleChange = (e) => {
//     const selectedFile = e.target.files[0];

    
//     if (selectedFile && selectedFile.type !== "application/pdf") {
//       alert("Only PDF files are allowed");
//       return;
//     }

//     setFile(selectedFile);
//   };

  
//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a file");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("pdf", file);

//       const res = await API.post("/upload", formData);

//       // setFilename(res.data.filename);
//       setFilename(res.data.data.filename);

//       alert("File uploaded successfully");
//     // } catch (err) {
//     //   console.error(err);
//     //   alert("Upload failed");
//     // }
//  } catch (err) {
//   console.error(err);

//   alert(
//     err.response?.data?.message || "Upload failed"
//   );
// }
//   };

//   const handleExtract = async () => {
//   if (!filename) {
//     alert("Upload a file first");
//     return;
//   }

//   if (selectedPages.length === 0) {
//     alert("Select at least one page");
//     return;
//   }

//   try {
//     const res = await API.post("/extract", {
//       filename,
//       pages: selectedPages,
//     });

//     // setNewFile(res.data.newFile);
//     setNewFile(res.data.data.newFile);
//     alert("PDF extracted successfully");
//   // } catch (err) {
//   //   console.error(err);
//   //   alert("Extraction failed");
//   // }
//   } catch (err) {
//   console.error(err);

//   alert(
//     err.response?.data?.message || "Extraction failed"
//   );
// }
// };


// return (
//   <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//     <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6">

//       {/* Title */}
//       <h1 className="text-2xl font-bold text-center mb-6">
//         PDF Page Extractor
//       </h1>

//       {/* Upload Section */}
//       <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={handleChange}
//           className="border p-2 rounded w-full sm:w-auto"
//         />

//         <button
//           onClick={handleUpload}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
//         >
//           Upload
//         </button>
//       </div>

//       {/* Uploaded File */}
//       {filename && (
//         <p className="mt-4 text-center text-green-600 font-medium">
//           Uploaded: {filename}
//         </p>
//       )}

//       {/* Preview */}
//       <div className="mt-6">
//         <Preview filename={filename} setSelectedPages={setSelectedPages} />
//       </div>

//       {/* Selected Pages */}
//       {selectedPages.length > 0 && (
//         <p className="mt-4 text-center text-gray-700">
//           Selected Pages:{" "}
//           <span className="font-semibold">
//             {selectedPages.join(", ")}
//           </span>
//         </p>
//       )}

//       {/* Actions */}
//       <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">

//         {/* Extract */}
//         {filename && (
//           <button
//             onClick={handleExtract}
//             className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
//           >
//             Extract Pages
//           </button>
//         )}

//         {/* Download */}
//         {newFile && (
//           <a
//             href={`${import.meta.env.VITE_API_URL}/download/${newFile}`}
//             download
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded transition"
//           >
//             Download PDF
//           </a>
//         )}
//       </div>

//     </div>
//   </div>
// );

// };

// export default Upload;





// //   return (
// //     <div className="p-6 border rounded-lg shadow-md max-w-md mx-auto mt-10">
// //       <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>

// //       <input
// //         type="file"
// //         accept="application/pdf"
// //         onChange={handleChange}
// //         className="mb-4"
// //       />

// //       <button
// //         onClick={handleUpload}
// //         className="bg-blue-500 text-white px-4 py-2 rounded"
// //       >
// //         Upload
// //       </button>

// //       {filename && (
// //         <p className="mt-4 text-green-600">
// //           Uploaded: {filename}
// //         </p>
// //       )}

// //     <Preview filename={filename} setSelectedPages={setSelectedPages}/>

// //           {selectedPages.length > 0 && (
// //         <p className="mt-4">
// //           Selected Pages: {selectedPages.join(", ")}
// //         </p>
// //       )}

// //       {/* Extract Button */}
// // {filename && (
// //   <button
// //     onClick={handleExtract}
// //     className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
// //   >
// //     Extract Pages
// //   </button>
// // )}

// // {/* Download Link */}
// // {newFile && (
// //   <div className="mt-4">
// //     <a
// //       href={`${import.meta.env.VITE_API_URL}/download/${newFile}`}
// //       className="text-blue-600 underline"
// //     >
// //       Download Extracted PDF
// //     </a>
// //   </div>
// // )}

// //     </div>
// //   );