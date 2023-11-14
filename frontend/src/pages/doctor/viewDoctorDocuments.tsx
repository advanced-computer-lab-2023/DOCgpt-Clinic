// ViewDoctorDocuments.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorDocumentList from '../../components/doctorDocumentList';
import AdminBar from "../../components/admin Bar/adminBar"; // Assuming you have an AdminBar component

const ViewDoctorDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<string[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('/routes/doctors/doctorDocuments');
        setDocuments(response.data.documents);
      } catch (error) {
        console.error('Error fetching doctor documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <>
      <AdminBar />
      <div style={{ padding: '20px' }}>
        <h2 style={{ fontFamily: 'YourFont', fontSize: '24px', color: 'YourColor' }}>All Doctors Uploaded Documents</h2>
        <DoctorDocumentList documents={documents} />
      </div>
    </>
  );
};

export default ViewDoctorDocuments;