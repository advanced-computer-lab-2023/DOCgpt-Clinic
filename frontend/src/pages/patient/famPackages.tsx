import React from 'react';
import UnsubscribePackageForMember from "../../components/subscribe";
import PatientAppBar from '../../components/patientBar/patientBar';
import Back from "../../components/backButton";
import El7a2niInfo from '../../components/El7a2ni-info';
const FamPackages: React.FC = () => {
  return (
    <>

        <PatientAppBar/>
        <Back/>



    <div>
      {/* Render the UnsubscribePackageForMember component */}
      <UnsubscribePackageForMember />
    </div>

    <El7a2niInfo/>
    </>
  );
};

export default FamPackages;
