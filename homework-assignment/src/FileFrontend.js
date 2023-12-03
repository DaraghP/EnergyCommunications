import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';

const FileFrontend = () => {
  const [uploadedPDFs, setUploadedPDFs] = useState([]);

  const getUploadedPDFs = async () => {
    try { // get uploaded PDFs from backend
      const response = await fetch('http://127.0.0.1:5000/uploaded');
      const data = await response.json();

      if (response.ok) {
        setUploadedPDFs(data.pdfFiles);
      } else {
        console.error(`Error: ${data.error}`);
      }
    } catch (error) {
      console.log('Error fetching uploaded PDFs:', error);
    }
  };

  useEffect(() => {
    getUploadedPDFs();
  }, []);

  return (
    // frontend page for uploading PDFs
    <div class="p-5">
      <h1>Frontend page for NodeJS Fastify backend - Upload & Download PDFs</h1>
      <hr class="mt-3 h-1"/>
      
      <h2 class="text-xl font-bold mt-4 mb-2">Uploaded PDFs</h2>
      <ul>
        {/* iterate through files, and display each one with a link to download */}
        {uploadedPDFs.map((file) => (
          <li class="p-5" key={file}>
            {file}
            <a href={`http://127.0.0.1:5000/download/${file}`} download class="bg-orange-200 p-1 mt-5 border-blue-500 rounded ml-2">
              Download
            </a>
          </li>
        ))}
      </ul>

      <hr class="mt-3 h-1"/>

      <h2 class="text-xl font-bold mt-4 mb-2">PDF Uploader</h2>
      <FileUpload onUpload={getUploadedPDFs} />
    </div>
  );
};

export default FileFrontend;
