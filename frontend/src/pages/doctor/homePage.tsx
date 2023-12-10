import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Button, Box, Container, Paper } from '@mui/material';
import DoctorBar from '../../components/Doctor bar/doctorBar';
import DoctorMain from './doctorMain';
import Footer from '../../components/Footer';

function HomePage() {
  const navigate = useNavigate();
  const { username } = useParams();

  const handleButtonClick = () => {
    navigate('/other-page'); // Replace with the path of your other page
  };

  return (
    <>
      <DoctorBar />
      <Container>
     
        {/* <Typography variant="body1" paragraph>
          This is your home page with a poster and a greeting.
        </Typography> */}
        {/* Add more content here */}
       
      </Container>
      <Footer />

    </>
  );
}

export default HomePage;