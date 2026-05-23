import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

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
    <div>
      <h2 className="text-2xl font-bold text-center mb-8">
        PDF Preview
      </h2>

      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {Array.from(new Array(numPages), (_, index) => {
            const pageNumber = index + 1;
            const isSelected = selected.includes(pageNumber);

            return (
              <div
                key={index}
                className={`rounded-2xl overflow-hidden transition-all duration-300 border backdrop-blur-lg
                ${
                  isSelected
                    ? "border-cyan-400 bg-cyan-500/10 scale-[1.02]"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelect(pageNumber)}
                      className="w-4 h-4"
                    />

                    <span className="font-medium">
                      Page {pageNumber}
                    </span>
                  </label>

                  {isSelected && (
                    <span className="text-xs bg-cyan-500 text-white px-2 py-1 rounded-full">
                      Selected
                    </span>
                  )}
                </div>

                {/* PDF Page */}
                <div className="p-4 flex justify-center overflow-auto">
                  <Page pageNumber={pageNumber} width={250} />
                </div>
              </div>
            );
          })}
        </div>
      </Document>
    </div>
  );
};

export default Preview;

// import { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";

// pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;




// // const Preview = ({ filename }) => {
// const Preview = ({ filename, setSelectedPages }) => {    
//   const [numPages, setNumPages] = useState(null);
//   const [selected, setSelected] = useState([]);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };


//   const handleSelect = (page) => {
//     let updated;

//     if (selected.includes(page)) {
//       updated = selected.filter((p) => p !== page);
//     } else {
//       updated = [...selected, page];
//     }

//     setSelected(updated);
//     setSelectedPages(updated); 
//   };


//   if (!filename) return null;


// const fileUrl = `${import.meta.env.VITE_API_URL}/${filename}`;

// return (
//   <div>
//     <h2 className="text-lg font-semibold mb-4 text-center">
//       PDF Preview
//     </h2>

//     <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {Array.from(new Array(numPages), (_, index) => {
//           const pageNumber = index + 1;

//           return (
//             <div
//               key={index}
//               className="bg-gray-50 border rounded-lg p-3 shadow-sm"
//             >
//               {/* Checkbox */}
//               <label className="flex items-center mb-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={selected.includes(pageNumber)}
//                   onChange={() => handleSelect(pageNumber)}
//                   className="mr-2"
//                 />
//                 <span className="text-sm font-medium">
//                   Page {pageNumber}
//                 </span>
//               </label>

//               {/* PDF Page */}
//               <Page pageNumber={pageNumber} width={250} />
//             </div>
//           );
//         })}
//       </div>
//     </Document>
//   </div>
// );


// };

// export default Preview;




// //   return (
// //     <div className="mt-6">
// //       <h2 className="text-xl font-semibold mb-4">PDF Preview</h2>

// //       {/* <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} onLoadError={(error) => console.error("PDF load error:", error)}>
// //         {Array.from(new Array(numPages), (el, index) => (
// //           <Page
// //             key={index}
// //             pageNumber={index + 1}
// //             className="mb-4 border"
// //           />
// //         ))}
// //       </Document> */}
// //        <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
// //         {Array.from(new Array(numPages), (_, index) => {
// //           const pageNumber = index + 1;

// //           return (
// //             <div key={index} className="mb-6 border p-2">
// //               {/* Checkbox */}
// //               <div className="mb-2">
// //                 <input
// //                   type="checkbox"
// //                   checked={selected.includes(pageNumber)}
// //                   onChange={() => handleSelect(pageNumber)}
// //                 />
// //                 <span className="ml-2">Page {pageNumber}</span>
// //               </div>

// //               {/* PDF Page */}
// //               <Page pageNumber={pageNumber} />
// //             </div>
// //           );
// //         })}
// //       </Document>
// //     </div>
// //   );