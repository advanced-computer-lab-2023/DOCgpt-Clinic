import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Grid, Paper, Typography, Avatar, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';
import LockResetIcon from '@mui/icons-material/LockReset';
import man from '../../man.jpg'
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import PatientAppBar from '../../components/patientBar/patientBar'

const API_BASE_URL = 'http://localhost:3000'; // Replace with your actual base URL

const PatientProfilePage = () => {
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Authorization token is missing');
        }

        const response = await axios.get('/routes/patient/getPatient', {
          headers: { Authorization: `Bearer ${token}` },
        });
         console.log(response.data);
        setPatient(response.data);
      } catch (err : any ) {
        setError(err.message || 'An error occurred while fetching patient data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatient();
  }, []);

  if (isLoading) {
    return <div>Loading patient data...</div>;
  }

  if (error) {
    return <div>Error loading page: {error}</div>;
  }

  if (!patient) {
    return <div>No patient data available.</div>;
  }

  const { name, username, email, mobilenumber, gender, dateofbirth,  address , emergencyContact} = patient;
  const { fullName, mobileNumber, relation } = emergencyContact; // Destructure the emergencyContact object

  const profileImage = gender === 'Male' ? '/male-image.jpg' : '/female-image.jpg'; // Replace with your image paths

  const profileStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    p: 4,
    bgcolor: 'primary.main',
    color: 'white',
  };

  const detailStyle = {
    p: 4,
    bgcolor: 'background.paper',
  };

  const iconStyle = {
    mr: 2,
    verticalAlign: 'bottom',
  };

  return (
    <>
    <PatientAppBar/>
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={profileStyle}>
            <Box>
              <Avatar
                src={man}
                alt={name}
                sx={{ width: 128, height: 128 }}
              />
              <Typography variant="h4" sx={{ mt: 2 }}>
                {name}
              </Typography>
              <Typography variant="subtitle1">{username}</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={detailStyle}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Typography>
                <EmailIcon sx={iconStyle} />
                {email}
              </Typography>
              <Typography>
                <PhoneIcon sx={iconStyle} />
                {mobilenumber}
              </Typography>
              {address && (
                <Typography>
                  <HomeIcon sx={iconStyle} />
                  {address}
                </Typography>
              )}
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Typography>
                <CakeIcon sx={iconStyle} />
                Date of Birth: {new Date(dateofbirth).toLocaleDateString()}
              </Typography>
              <Typography>Gender: {gender}</Typography>
              <Typography>  
                <ContactEmergencyIcon sx={iconStyle} />
Emergency Contact:</Typography>
  <Typography>

    Full Name: {fullName}
  </Typography>
  <Typography>
    Mobile Number: {mobileNumber}
  </Typography>
  <Typography>
    Relation: {relation}
  </Typography>            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<LockResetIcon />}
              sx={{ mb: 2 }}
            >
              Change Password
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default PatientProfilePage;