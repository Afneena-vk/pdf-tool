import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;




// const Preview = ({ filename }) => {
const Preview = ({ filename, setSelectedPages }) => {    
  const [numPages, setNumPages] = useState(null);
  const [selected, setSelected] = useState([]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };


  const handleSelect = (page) => {
    let updated;

    if (selected.includes(page)) {
      updated = selected.filter((p) => p !== page);
    } else {
      updated = [...selected, page];
    }

    setSelected(updated);
    setSelectedPages(updated); 
  };


  if (!filename) return null;


const fileUrl = `${import.meta.env.VITE_API_URL}/${filename}`;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">PDF Preview</h2>

      {/* <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} onLoadError={(error) => console.error("PDF load error:", error)}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={index}
            pageNumber={index + 1}
            className="mb-4 border"
          />
        ))}
      </Document> */}
       <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_, index) => {
          const pageNumber = index + 1;

          return (
            <div key={index} className="mb-6 border p-2">
              {/* Checkbox */}
              <div className="mb-2">
                <input
                  type="checkbox"
                  checked={selected.includes(pageNumber)}
                  onChange={() => handleSelect(pageNumber)}
                />
                <span className="ml-2">Page {pageNumber}</span>
              </div>

              {/* PDF Page */}
              <Page pageNumber={pageNumber} />
            </div>
          );
        })}
      </Document>
    </div>
  );
};

export default Preview;