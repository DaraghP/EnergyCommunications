import React, { useState } from 'react';

// component to upload a file to backend
const FileUpload = ({ onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  // selecting a file - seems to work
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("event.target:", event.target);// debugging
    console.log("file:", file);
    

    if (file) {
        setSelectedFiles([file]);
    }
    console.log("selectedFiles:", selectedFiles);
  };


  // upload file
  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      console.log('Error: No file selected');
      return;
    }

    const formData = new FormData();
    // console.log("selectedFiles in handleUpload: ", selectedFiles);
    // console.log("formData before:", formData);
    formData.append('file', selectedFiles[0]);
    console.log("formData after:", formData);

    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert('Upload successful!');
        onUpload();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error during upload:', error);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={handleFileChange} />
      <button className="rounded bg-blue-200 p-3" type="submit">
        Upload a PDF
      </button>
    </form>
  );
};

export default FileUpload;
