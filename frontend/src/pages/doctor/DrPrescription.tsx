// DOCTOR Prescriptions.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DrPrescription from '../../components/DrPrescription'; 
import DrawerAppBar from '../../components/Doctor bar/doctorBar';
import { Grid, Typography } from '@mui/material';
import El7a2niInfo from '../../components/El7a2ni-info';
import Back from "../../components/backButton";


interface Medicine {
  medicineName: string;
  dosage: string;
  quantity: number;
  _id: string;
}
interface Prescription {
  PatientName: string;
  date: string;
  status: string;
  medicines: Medicine[];
  _id: string;
}
const DrPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);


  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/routes/getAllPrescriptionsDoctor', {
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
    <DrawerAppBar />
    <Back/>
    <Typography variant="h4" gutterBottom color="primary" style={{ textAlign: 'center'}} padding={5}>
      MY PRESCRIPTIONS   
      </Typography>
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {prescriptions.map((prescription, index) => (
        <Grid item key={index}>
            <DrPrescription prescription={prescription} />
        </Grid>
      ))}
    </Grid>
    <El7a2niInfo/>
    </>

  );
};

export default DrPrescriptions;
