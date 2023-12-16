import React from 'react';
import SubscribedHealthPackages from '../../components/SubscribedHealthPackages';
import PatientAppBar from '../../components/patientBar/patientBar';
import ViewFamilyMembersAndPackages from '../../components/subscribe';
import El7a2niInfo from '../../components/El7a2ni-info';
import Background from '../../HealthPack.jpeg';
import Back from "../../components/backButton";

const subscribedPage = () => {
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
      <h1> <strong>SUBSCRIBED PACKAGES</strong></h1>
      {/* <p>Additional text content</p> */}
    </div>
    </div>
    <div>
      
      <SubscribedHealthPackages />
      <div style={{ margin: '30px' }}>
        {/* <ViewFamilyMembersAndPackages /> */}
      </div>

      {/* Other content for the My Packages page if needed */}
      <El7a2niInfo/>
    </div>
    </>
  );
};

export default subscribedPage