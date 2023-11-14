import React from 'react';
import SubscribedHealthPackages from '../../components/SubscribedHealthPackages';
import PatientAppBar from '../../components/patientBar/patientBar';
import ViewFamilyMembersAndPackages from '../../components/subscribe';

const subscribedPage = () => {
  return (
    <>
    <PatientAppBar/>
    <div>
      
      <SubscribedHealthPackages />
      <ViewFamilyMembersAndPackages />


      {/* Other content for the My Packages page if needed */}
    </div>
    </>
  );
};

export default subscribedPage