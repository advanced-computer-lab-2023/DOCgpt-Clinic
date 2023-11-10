import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Button, Box, Container, Paper } from '@mui/material';
import DoctorBar from '../../components/Doctor bar/doctorBar';

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
        <Paper
          sx={{
            // backgroundImage: 'url(/path/to/your/image.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: 400,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 4,
          }}
        >
          <Button variant="contained" color="primary" onClick={handleButtonClick}>
            doctor
          </Button>
        </Paper>
        {/* <Typography variant="body1" paragraph>
          This is your home page with a poster and a greeting.
        </Typography> */}
        {/* Add more content here */}
      </Container>
    </>
  );
}

export default HomePage;
