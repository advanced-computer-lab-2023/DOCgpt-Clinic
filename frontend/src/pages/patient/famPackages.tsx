import React from 'react';
import UnsubscribePackageForMember from "../../components/subscribe";
import PatientAppBar from '../../components/patientBar/patientBar';
import Back from "../../components/backButton";
import El7a2niPatientInfo from '../../components/El7a2niPatient-info';
import { Typography } from '@mui/material';
const FamPackages: React.FC = () => {
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
        <Back/>



    <div>
      {/* Render the UnsubscribePackageForMember component */}
      <UnsubscribePackageForMember />
    </div>

    <El7a2niPatientInfo/>
    </>
  );
};

export default FamPackages;
