import React from 'react';
import SubscribedHealthPackages from '../../components/SubscribedHealthPackages';
import ViewStatusOfPackage from '../../components/ViewStatusOfPackage'; // Update the path accordingly
import PatientAppBar from '../../components/patientBar/patientBar';

const MyPackagesPage = () => {
  return (
    <>
    <PatientAppBar/>
    <div>
      <h1>All Packages</h1>
      <ViewStatusOfPackage />
      {/* Other content for the My Packages page if needed */}
    </div>
    </>
  );
};

export default MyPackagesPage;