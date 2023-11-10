import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Button, Box, Container, Paper } from '@mui/material';
import DrawerAppBar from '../../components/patientBar/patientBar';

function HomePage() {
  const navigate = useNavigate();
  const { username } = useParams();

  const handleButtonClick = () => {
    navigate('/other-page'); // Replace with the path of your other page
  };

  return (
    <>
      <DrawerAppBar />
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
            patient
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
