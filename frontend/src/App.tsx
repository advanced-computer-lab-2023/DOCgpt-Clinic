
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Landing from './pages/Landing';
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
import MyAppointments from './pages/doctor/MyAppointments';
import MyPatients from './pages/doctor/MyPatients';
import DrawerAppBar from './components/patientBar/patientBar';
import SignUpPatient from './pages/patient/signingUp';
import Log from './pages/login'
import HomePage from './pages/patient/homePage';
import DoctorHomePage from './pages/doctor/homePage';
import AdminHomePage from './pages/admin/homePage';


function App() {
  const role = localStorage.getItem('role');
  useEffect(() => {
    // Create a link element for the font stylesheet
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href =
      'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';


    // Append the link element to the document head
    document.head.appendChild(linkElement);
  }, []);

  return (

    <Router>
     

        <Routes>
    <Route path="/"  Component={Landing} />
    {/* //     <Route path="/"  Component={LandingPage} /> */}
        
        <Route path="/"  Component={Landing} />
        <Route path="/login"  Component={Log} />
        <Route path="/register/patient" Component={SignUpPatient} />
         <Route path="/register/doctor" Component={DoctorRegistrationForm } />
        // <Route path="/patient/main" Component={PatientPage} />
        // <Route path="/patient/main/patients" Component={viewAll} />
        // <Route path="/patient/viewApp/:username" Component={papp} />
        // <Route path="/doctor/main" Component={DoctorMain} />
        // <Route path="/doctor/login" Component={DoctorLogin} />
        // <Route path="/patient/prescriptions/:username" element={<PatientPrescriptions />} />
         <Route path="/patient/home" element={<HomePage/>} />
         <Route path="/doctor/home" element={<DoctorHomePage/>} />
         <Route path="/admin/home" element={<AdminHomePage/>} />
        // <Route path="/patient/addFam/:username" element={<AddFamilyMember />} />
        // <Route path="/patient/ViewFamilyMembers/:username" element={<ViewFamilyMembers />} />
        // <Route path="/admin" Component={Admin} />
        // <Route path="/doctor/appointments" Component={MyAppointments} />
        // <Route path="/doctor/patients" Component={MyPatients} />
      
      </Routes>
    
        
    </Router>
  );
}

export default App;
