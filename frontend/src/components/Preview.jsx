import { pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;


import { useState } from "react";
import { Document, Page } from "react-pdf";

const Preview = ({ filename }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!filename) return null;


const fileUrl = `${import.meta.env.VITE_API_URL}/${filename}`;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">PDF Preview</h2>

      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} onLoadError={(error) => console.error("PDF load error:", error)}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={index}
            pageNumber={index + 1}
            className="mb-4 border"
          />
        ))}
      </Document>
    </div>
  );
};

export default Preview;