import React from 'react';
import SubscribedHealthPackages from '../../components/SubscribedHealthPackages';
import ViewStatusOfPackage from '../../components/ViewStatusOfPackage'; // Update the path accordingly
import PatientAppBar from '../../components/patientBar/patientBar';
import { Typography } from '@mui/material';

const MyPackagesPage = () => {
  return (
    <>
    <PatientAppBar/>
    <div>
    <Typography variant="h4" gutterBottom color="primary" style={{ textAlign: 'center'}}>
      All Packages   
      </Typography>
      <ViewStatusOfPackage />
      {/* Other content for the My Packages page if needed */}
    </div>
    </>
  );
};

export default MyPackagesPage;