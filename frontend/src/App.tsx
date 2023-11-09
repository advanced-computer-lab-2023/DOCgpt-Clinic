
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import LandingPage from './pages/landingPage';
import PatientRegistrationForm from './pages/patient/signup';
import DoctorRegistrationForm from './pages/doctor/doctorSignUp';
import PatientHome from './pages/patient/patientHome';
import PatientPrescriptions from './pages/patient/prescriptions';
import AddFamilyMember from './pages/patient/addFam';
import ViewFamilyMembers from './pages/patient/getFam';
import Admin from './pages/admin/admin';
import PatientPage from './pages/patient/Patient';
import DoctorMain from './pages/doctor/doctorMain';
import papp from './pages/patient/papp'
import viewAll from './pages/patient/viewAll'
import DoctorLogin from './pages/doctor/doctorLogin';




// App.js
import Navbar from './components/navBar'; // Import the Navbar component
import DrawerAppBar from './components/bar/appBar';

// App.tsx
function App()  {
  return (
    <Router>
    <DrawerAppBar />
    {/* <AppRoutes /> */}
    <Routes>
    <Route path="/"  Component={LandingPage} />
    </Routes>
  </Router>
  );
};


export default App;


