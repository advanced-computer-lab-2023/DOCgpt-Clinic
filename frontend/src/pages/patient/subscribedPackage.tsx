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
          <strong>SUBSCRIBED PACKAGES</strong>
        </h1>
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