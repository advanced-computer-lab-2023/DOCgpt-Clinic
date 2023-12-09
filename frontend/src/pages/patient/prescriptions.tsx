// PatientPrescriptions.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PrescriptionCard from '../../components/prescription'; // Adjust the import path
import PatientAppBar from '../../components/patientBar/patientBar';
import { Grid, Typography } from '@mui/material';
import logo from '../../logo.jpeg';

interface Medicine {
  medicineName: string;
  dosage: string;
  quantity: number;
  _id: string;
}
interface Prescription {
  doctorName: string;
  date: string;
  status: string;
  medicines: Medicine[];
  _id: string;
}
const PatientPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);


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
        console.log(response.data);
        setPrescriptions(response.data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []); // Empty dependency array to run the effect once on component mount

  return (
    <>
    <PatientAppBar />
    <Typography variant="h4" gutterBottom color="primary" style={{ textAlign: 'center'}} padding={5}>
      MY PRESCRIPTIONS   
      </Typography>
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {prescriptions.map((prescription, index) => (
        <Grid item key={index}>
            <PrescriptionCard prescription={prescription} />
        </Grid>
      ))}
    </Grid>
    <div style={{ display: 'flex', backgroundColor: '#333', color: '#fff', padding: '50px', marginTop:'100px' }}>
      <div style={{ display: 'flex', alignItems: 'left', maxWidth: '600px', margin: '0 auto' }}>
      <img src={logo}  alt="Clinic Logo" style={{ width: '300px', height:'100px',  marginRight: '20px' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'left' }}>
          <h2>EL7A2NI</h2>
          <p>Address: 123 Main Street, City</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@example.com</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'right', maxWidth: '600px', margin: '0 auto' }}>

        <div style={{ textAlign: 'left' }}>
          <h2>Our Treatments</h2>
          <p>ayy hagaaa</p>
          <p>traetmentt blaablaa</p>
          <p>agmad treatment</p>
        </div>
      </div>
    </div>
    </>

  );
};

export default PatientPrescriptions;
