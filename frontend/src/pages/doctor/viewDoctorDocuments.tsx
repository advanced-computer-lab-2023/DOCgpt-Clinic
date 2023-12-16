import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminBar from "../../components/admin Bar/adminBar";
import { Container, Typography, List, ListItem, Button, CircularProgress, Paper } from "@mui/material";
import Background from '../../UploadDocuments.jpg';
import Back from "../../components/backButton";

interface Document {
  _id: string;
  doctorUsername: string;
  document: string;
  filePath: string;
}

const ViewDoctorDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const doctorUsername = localStorage.getItem("doctorUsername");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        if (doctorUsername) {
          const response = await axios.post("/routes/doctors/getDoctorDocuments", {
            username: doctorUsername,
          });

          if (Array.isArray(response.data)) {
            setDocuments(response.data);
          } else {
            setError('Invalid API response');
          }
        }
      } catch (error) {
        setError('Error fetching doctor documents');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [doctorUsername]);

  const handleDownload = (documentName: string) => {
    axios.post(`/routes/doctors/downloadDocument`, { document: documentName }, {
      responseType: 'blob',
    })
      .then((response) => {
        // Create a blob URL and trigger download
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = documentName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading document:', error);
        console.error("eh el error:", error.message);
      });
  };
  

  return (
    <>
      <AdminBar />
      <div
      style={{
        position: 'relative',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '50vh',
        marginBottom: '100px',
        backgroundPosition: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Transparent overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      ></div>

      <Back />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h1>
          <strong>YOUR UPLOADED DOCUMENTS</strong>
        </h1>
      </div>
    </div>
      <Container maxWidth="md" style={{ marginTop: 20 }}>
        <Paper style={{ padding: 20 }}>
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}
          {!loading && !error && (
            <>
              {documents.length === 0 && (
                <Typography align="center">No documents available.</Typography>
              )}
              {documents.length > 0 && (
                <List>
                  {documents.map((document, index) => (
                    <ListItem key={index} style={{ marginBottom: 10 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDownload(document.document)}
                      >
                        Download {document.document}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              )}
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};


export default ViewDoctorDocuments;









// // ViewDoctorDocuments.tsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DoctorDocumentList from '../../components/doctorDocumentList';
// import AdminBar from "../../components/admin Bar/adminBar"; // Assuming you have an AdminBar component

// const ViewDoctorDocuments: React.FC = () => {
//   const [documents, setDocuments] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchDocuments = async () => {
//       try {
//         const response = await axios.get('/routes/doctors/doctorDocuments');
//         setDocuments(response.data.documents);
//       } catch (error) {
//         console.error('Error fetching doctor documents:', error);
//       }
//     };

//     fetchDocuments();
//   }, []);

//   return (
//     <>
//       <AdminBar />
//       <div style={{ padding: '20px' }}>
//         <h2 style={{ fontFamily: 'YourFont', fontSize: '24px', color: 'YourColor' }}>All Doctors Uploaded Documents</h2>
//         <DoctorDocumentList documents={documents} />
//       </div>
//     </>
//   );
// };

// export default ViewDoctorDocuments;