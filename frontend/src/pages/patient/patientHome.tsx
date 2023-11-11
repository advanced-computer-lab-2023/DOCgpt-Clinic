import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const PatientHome = () => {
  const { username} = useParams();
  console.log(username)
  const navigate = useNavigate(); // Get the navigate function for navigation

  useEffect(() => {
    // Fetch the patient's information using the username from URL params
    fetch(`/routes/prescriptions/${username}`)
      .then((response) => response.json())
      .then((data) => setPatientInfo(data))
      .catch((error) => console.error(error));
  }, [username]);
  

  const buttonStyle: React.CSSProperties = {
    display: 'block',
    width: '200px',
    padding: '10px',
    backgroundColor: '#2196F3', // Change to the color you prefer
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    margin: '10px auto',
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: '16px', // Add font size
  };

  const handleViewPrescriptions = () => {
    // Use navigate to go to the "/patient/prescriptions" route with the current username
    navigate(`/patient/prescriptions/${username}`);

  };

  const handleAddFam = () => {
    // Use navigate to go to the "/patient/prescriptions" route with the current username
      navigate(`/patient/addFam/${username}`);
    
  };
  

  const handleViewFam = () => {
      navigate(`/patient/ViewFamilyMembers/${username}`);
  };
  const handleapp = () => {
    navigate(`/patient/Viewapp/${username}`);
  
};
  
const handleViewWalletBalance = () => {
    navigate(`/patient/walletAmount/${username}`);
};

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Welcome, {username}!</h2>

      {/* <Link to="/add-family-members" style={buttonStyle}>
        Add Family Members
      </Link> */}

      {/* <Link to="/view-family-members" style={buttonStyle}>
        View Registered Family Members
      </Link> */}

      {/* <Link to={`/patient/${usernamee}/view-doctors`} style={buttonStyle}>
        View List of Doctors
      </Link> */}

      <button style={buttonStyle} onClick={handleViewPrescriptions}>
        View Prescriptions
      </button>

      <button style={buttonStyle} onClick={handleAddFam}>
        add family member
      </button>

      <button style={buttonStyle} onClick={handleViewFam}>
       View family Members
      </button>

      <button style={buttonStyle} onClick={handleapp}>
       View and filter appoinments
      </button>

      <button style={buttonStyle} onClick={handleViewWalletBalance}>
       View Wallet Balance
      </button>

      <Link to="/patient/main/patients" style={buttonStyle}>
        view All
      </Link>

      <Link to="/patient/main" style={buttonStyle}>
        search for a doctor
      </Link>
      <Link to="/patient/main" style={buttonStyle}>
        Filter doctors
      </Link>
    </div>
  );
};

export default PatientHome;
function setPatientInfo(data: any): any {
  throw new Error('Function not implemented.');
}



