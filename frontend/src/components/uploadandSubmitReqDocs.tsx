import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, TextField } from '@mui/material';

const UploadAndSubmitReqDocs: React.FC = () => {
  const [documentName, setDocumentName] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [submittedDocuments, setSubmittedDocuments] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles(files);
    }
  };

  const handleDocumentNameChange = (value: string) => {
    setDocumentName(value);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedFiles || !documentName.trim()) {
        setErrorMessage('Please fill in all the required fields.');
        return;
      }

      const formData = new FormData();
      const fileName = `${documentName.replace(/\s+/g, '')}_${selectedFiles[0].name}`;
      formData.append('documents', selectedFiles[0], fileName);

      await axios.post('routes/doctors/uploadAndSubmitReqDocs', formData);

      setSubmittedDocuments((prev) => [...prev, documentName]);
      setDocumentName('');
      setErrorMessage(null);
    } catch (error) {
      console.error('Error submitting document:', error);
      setErrorMessage('Error submitting document. Please try again.');
    }
  };

  return (
    <div>
      <Typography variant="h6">Submit Documents</Typography>
      <TextField
        label="Document Name"
        value={documentName}
        onChange={(e) => handleDocumentNameChange(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png, .docx"
        onChange={handleFileChange}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit Document
      </Button>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
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