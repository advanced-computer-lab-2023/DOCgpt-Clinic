// PatientPrescriptions.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PrescriptionCard from '../../components/prescription'; // Adjust the import path

const PatientPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/routes/getAllPrescriptionsPatient', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Replace with your authentication token
          },
        });
        setPrescriptions(response.data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []); // Empty dependency array to run the effect once on component mount

  return (
    <div>
      {prescriptions.map((prescription, index) => (
        <PrescriptionCard key={index} prescription={prescription} />
      ))}
    </div>
  );
};

export default PatientPrescriptions;
