import React from 'react';
import SubscribedHealthPackages from '../../components/SubscribedHealthPackages';
import ViewStatusOfPackage from '../../components/ViewStatusOfPackage'; // Update the path accordingly
import PatientAppBar from '../../components/patientBar/patientBar';
import { Typography } from '@mui/material';
import El7a2niInfo from "../../components/El7a2ni-info";
import Background from '../../Background.jpeg';


const MyPackagesPage = () => {
  return (
    <div
    style={{
      backgroundImage: `url(${Background})`,
      backgroundSize: 'cover',
      minHeight: '100vh',
      backgroundPosition: 'center',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Increased shadow values
    }}
  >   
    <>
    <PatientAppBar/>
    <div>
    <Typography variant="h4" gutterBottom color="primary" style={{ textAlign: 'center'}} marginTop="20px" marginBottom="100px">
    </Typography>
      <ViewStatusOfPackage />
      {/* Other content for the My Packages page if needed */}
    </div>
    <El7a2niInfo/>
    </>
    </div>
  );
};

export default MyPackagesPage;