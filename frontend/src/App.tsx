import React from 'react'
import Upload from "./components/Upload";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  // return (
  //   <div>
  //          <Upload />
  //   </div>
  // )
  return (
    <>
      <Upload />
      <ToastContainer />
    </>
  );

}

export default App
