// import React, { useState, ChangeEvent } from 'react';
// import axios from 'axios';
// import { Button, Typography, TextField } from '@mui/material';

// interface UploadAndSubmitReqDocsProps {
//   // Add any props if needed
// }

// const UploadAndSubmitReqDocs: React.FC<UploadAndSubmitReqDocsProps> = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [documentName, setDocumentName] = useState<string>('');
//   const [submittedDocuments, setSubmittedDocuments] = useState<string[]>([]);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//       setFile(files[0]);
//     }
//   };

//   const handleDocumentNameChange = (value: string) => {
//     setDocumentName(value);
//   };

//   const handleUpload = async () => {
//     try {
//       if (!file || !documentName.trim()) {
//         setErrorMessage('Please fill in all the required fields.');
//         return;
//       }

//       const formData = new FormData();
//       formData.append('file', file);


//       const storedUsername = localStorage.getItem('doctorUsername');
//       if (storedUsername) {
//         formData.append('username', storedUsername);
//       }
//       console.log('File:', file);
//       console.log('Stored Username:', storedUsername);
      
//       console.log("hnaaa" , formData);


//       const response = await axios.post('http://localhost:9000/routes/doctors/upload', formData);

//       if (response.status === 200) {
//         setSubmittedDocuments((prev) => [...prev, documentName]);
//         setDocumentName('');
//         setFile(null);
//         setErrorMessage(null);
//       } else {
//         console.error('Error submitting document:', response.statusText);
//         setErrorMessage('Error submitting document. Please try again.');
//       }
//     } catch (error: any) {
//       console.error('Error submitting document:', error.message);
//       setErrorMessage('Error submitting document. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h6">Submit Documents</Typography>
//       <TextField
//         label="Document Name"
//         value={documentName}
//         onChange={(e) => handleDocumentNameChange(e.target.value)}
//         fullWidth
//         required
//         margin="normal"
//       />
//       <input type="file" accept=".pdf, .jpg, .jpeg, .png, .docx" onChange={handleFileChange} />
//       <Button variant="contained" onClick={handleUpload}>
//         Submit Document
//       </Button>
//       {errorMessage && <Typography color="error">{errorMessage}</Typography>}
//       {submittedDocuments.length > 0 && (
//         <div>
//           <Typography variant="h6">Submitted Documents</Typography>
//           <ul>
//             {submittedDocuments.map((doc, index) => (
//               <li key={index}>{doc}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadAndSubmitReqDocs;










import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Button, Typography, TextField } from '@mui/material';

interface UploadAndSubmitReqDocsProps {
  // Add any props if needed
}

const UploadAndSubmitReqDocs: React.FC = () => {
//const UploadAndSubmitReqDocs: React.FC<UploadAndSubmitReqDocsProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [submittedDocuments, setSubmittedDocuments] = useState<string[]>([]);

  const handleUpload = () => {
    const storedUsername = localStorage.getItem("doctorUsername");
  
    if (file && storedUsername) {
      const formData = new FormData();
      formData.append('file', file);
  
      // Include the stored username in the request payload
      formData.append('username', storedUsername);
  
      axios.post('http://localhost:9000/routes/doctors/upload', formData)
        .then(res => {
          console.log(res);
          // Update the submitted documents state if needed
          setSubmittedDocuments(prevDocuments => [...prevDocuments, res.data.document]);
        })
        .catch(err => console.log(err));
    }
  };
  

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {submittedDocuments.length > 0 && (
        <div>
          <Typography variant="h6">Submitted Documents</Typography>
          <ul>
            {submittedDocuments.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))}
          </ul>
        </div>
      )} 
    </div>
  );
};

export default UploadAndSubmitReqDocs;










// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button, Typography, TextField } from '@mui/material';
// import { response } from 'express';

// const UploadAndSubmitReqDocs: React.FC = () => {
//   const [documentName, setDocumentName] = useState<string>('');
//   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
//   const [submittedDocuments, setSubmittedDocuments] = useState<string[]>([]);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//       setSelectedFiles(files);
//     }
//   };

//   const handleDocumentNameChange = (value: string) => {
//     setDocumentName(value);
//   };
// const handleSubmit = async () => {
//     try {
//       if (!selectedFiles || !documentName.trim()) {
//         setErrorMessage('Please fill in all the required fields.');
//         return;
//       }
  
//       const formData = new FormData();
//       const fileNameWithoutSpaces = documentName.replace(/\s+/g, '');
//       const fileExtension = selectedFiles[0].name.split('.').pop();
//       const fileName = `${fileNameWithoutSpaces}.${fileExtension}`;
//       formData.append('documents', selectedFiles[0], fileName);
  
//       const response = await axios.post('/routes/doctors/uploadAndSubmitReqDocs', formData);
  
//       if (response.status === 200) {
//         setSubmittedDocuments((prev) => [...prev, documentName]);
//         setDocumentName('');
//         setErrorMessage(null);
//       } else {
//         console.error('Error submitting document:', response.statusText);
//         setErrorMessage('Error submitting document. Please try again.');
//       }
//     } catch (error:any) {
//       console.error('Error submitting document:', error.message);
//       setErrorMessage('Error submitting document. Please try again.');
//     }
//   };
  
  

//   return (
//     <div>
//       <Typography variant="h6">Submit Documents</Typography>
//       <TextField
//         label="Document Name"
//         value={documentName}
//         onChange={(e) => handleDocumentNameChange(e.target.value)}
//         fullWidth
//         required
//         margin="normal"
//       />
//       <input
//         type="file"
//         accept=".pdf, .jpg, .jpeg, .png, .docx"
//         onChange={handleFileChange}
//       />
//       <Button variant="contained" onClick={handleSubmit}>
//         Submit Document
//       </Button>
//       {errorMessage && <Typography color="error">{errorMessage}</Typography>}
//       {submittedDocuments.length > 0 && (
//         <div>
//           <Typography variant="h6">Submitted Documents</Typography>
//           <ul>
//             {submittedDocuments.map((doc, index) => (
//               <li key={index}>{doc}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadAndSubmitReqDocs;