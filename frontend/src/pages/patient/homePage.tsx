import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Button, Box, Container, Paper } from '@mui/material';
import DrawerAppBar from '../../components/patientBar/patientBar';
import Carousel from '../../components/Carousel';
import logo from '../../logo.jpeg';
import El7a2niInfo from '../../components/El7a2ni-info';

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
      <El7a2niInfo/>
    </>
  );
}

export default HomePage;
