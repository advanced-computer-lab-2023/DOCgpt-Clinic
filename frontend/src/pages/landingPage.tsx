// LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <h1>Welcome to Registration</h1>
      <p>Please choose your role:</p>
      <hr />
      <Link to="/register/patient">Register as a Patient</Link>
      <br />

      <Link to="/register/doctor">Register as a Doctor</Link>
      <br />
      <Link to="/doctor/login">Login as a Doctor</Link>
      <br />
      <Link to="/admin">go to Admin page </Link>
    </div>
  );
}

export default LandingPage;
