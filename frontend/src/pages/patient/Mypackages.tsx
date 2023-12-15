import React from 'react';
import SubscribedHealthPackages from '../../components/SubscribedHealthPackages';
import ViewStatusOfPackage from '../../components/ViewStatusOfPackage'; // Update the path accordingly
import PatientAppBar from '../../components/patientBar/patientBar';
import { Typography } from '@mui/material';
import El7a2niInfo from "../../components/El7a2ni-info";
import Background from '../../HealthPack.jpeg';
import Back from "../../components/backButton";

const MyPackagesPage = () => {
  return (
  
    <>
    <PatientAppBar/>
    <div
      
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '50vh',
        marginBottom:'100px',
        backgroundPosition: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Increased shadow values
      }}
    >   
        <Back/>
     <div
      style={{
        position: 'absolute', // Set position to absolute
        top: '35%', // Adjust top value to center vertically
        left: '50%', // Adjust left value to center horizontally
        transform: 'translate(-50%, -50%)', // Center the text
        textAlign: 'center', // Center text horizontally
        color: 'white', // Set text color
      }}
    >
      <h1> <strong>PACKAGES HISTORY</strong></h1>
      {/* <p>Additional text content</p> */}
    </div>
    </div>
    <div>
    <Typography variant="h4" gutterBottom color="primary" style={{ textAlign: 'center'}} marginTop="20px" marginBottom="100px">
    </Typography>
      <ViewStatusOfPackage />
      {/* Other content for the My Packages page if needed */}
    </div>
    <El7a2niInfo/>
    </>
  );
};

export default MyPackagesPage;