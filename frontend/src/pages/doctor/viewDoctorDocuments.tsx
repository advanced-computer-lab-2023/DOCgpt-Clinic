import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminBar from "../../components/admin Bar/adminBar";
import { Container, Typography, List, ListItem, Button } from "@mui/material";

interface Document {
  username: string;
  document: string;
  filePath: string;
}

const ViewDoctorDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const doctorUsername = localStorage.getItem("doctorUsername");
  console.log( "doc username:", doctorUsername);

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
            console.error('Invalid API response:', response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching doctor documents:', error);
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
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Your Uploaded Documents
        </Typography>
        <List>
          {documents.map((document, index) => (
            <ListItem key={index}>
              <Button
                onClick={() => handleDownload(document.document)}
              >
                Download {document.document}
              </Button>
            </ListItem>
          ))}
        </List>
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