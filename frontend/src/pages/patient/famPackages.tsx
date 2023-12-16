import React from 'react';
import UnsubscribePackageForMember from "../../components/subscribe";
import PatientAppBar from '../../components/patientBar/patientBar';
import Back from "../../components/backButton";
import El7a2niPatientInfo from '../../components/El7a2niPatient-info';
const FamPackages: React.FC = () => {
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
