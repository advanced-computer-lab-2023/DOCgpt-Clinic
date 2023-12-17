import React from 'react';
import SubscribedHealthPackages from '../../components/SubscribedHealthPackages';
import ViewStatusOfPackage from '../../components/ViewStatusOfPackage'; // Update the path accordingly
import PatientAppBar from '../../components/patientBar/patientBar';
import { Typography } from '@mui/material';
import El7a2niPatientInfo from "../../components/El7a2niPatient-info";
import Background from '../../HealthPack.jpeg';
import Back from "../../components/backButton";

const MyPackagesPage = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return (
      <div>
        <Typography component="h1" variant="h5">
          access denied
        </Typography>
      </div>
    );
  }
  return (
  
    <>
    <PatientAppBar/>
    <div
      style={{
        position: 'relative',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '50vh',
        marginBottom: '100px',
        backgroundPosition: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Transparent overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      ></div>

      <Back />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h1>
          <strong>MY PACKAGES HISTORY</strong>
        </h1>
      </div>
    </div>
    <div>
    <Typography variant="h4" gutterBottom color="primary" style={{ textAlign: 'center'}} marginTop="20px" marginBottom="100px">
    </Typography>
      <ViewStatusOfPackage />
      {/* Other content for the My Packages page if needed */}
    </div>
    <El7a2niPatientInfo/>
    </>
  );
};

export default MyPackagesPage;