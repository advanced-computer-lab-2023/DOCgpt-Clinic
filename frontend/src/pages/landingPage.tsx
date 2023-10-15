// LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <h1>Welcome to Registration</h1>
      <p>Please choose your role:</p>
      <Link to="/register/patient">Register as a Patient</Link>
      <Link to="/register/doctor">Register as a Doctor</Link>
      <Link to="/admin">go to Admin page </Link>
    </div>
  );
}

export default LandingPage;
