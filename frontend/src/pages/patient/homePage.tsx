import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Button, Box, Container, Paper } from '@mui/material';
import DrawerAppBar from '../../components/patientBar/patientBar';
import Carousel from '../../components/Carousel';
import logo from '../../logo.jpeg';

function HomePage() {
  const navigate = useNavigate();
  const { username } = useParams();

  const handleButtonClick = () => {
    navigate('/other-page'); // Replace with the path of your other page
  };

  return (
    <>
      <DrawerAppBar />
      <Carousel />
      
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
}

export default HomePage;
