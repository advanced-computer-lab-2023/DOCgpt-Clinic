
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

// import AdminRegistrationForm from './AdminRegistrationForm';
function App() {
  return (
    <Router>
         <Routes>
        <Route path="/"  Component={LandingPage} />
        <Route path="/register/patient" Component={PatientRegistrationForm} />
        <Route path="/register/doctor" Component={DoctorRegistrationForm } />
        <Route path="/patient/main" Component={PatientPage} />
        <Route path="/doctor/main" Component={DoctorMain} />
        <Route path="/patient/prescriptions/:username" element={<PatientPrescriptions />} />
        <Route path="/patient/home/:username" element={<PatientHome />} />
        <Route path="/patient/home/:username" element={<PatientHome />} />
        <Route path="/patient/addFam/:username" element={<AddFamilyMember />} />
        <Route path="/patient/ViewFamilyMembers/:username" element={<ViewFamilyMembers />} />
        <Route path="/admin" Component={Admin} />

      </Routes>
    </Router>
  );
}

export default App;
