import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Landing from './pages/Landing';
import LandingPage from './pages/landingPage';
import PatientRegistrationForm from './pages/patient/signup';
import DoctorRegistrationForm from './pages/doctor/doctorSignUp';
import PatientHome from './pages/patient/patientHome';
import PatientPrescriptions from './pages/patient/prescriptions';
import AddFamilyMember from './pages/patient/addFam';
import ViewFamilyMembers from './pages/patient/getFam';
import Admin from './pages/admin/admin';
//import timeslottt from './pages/doctor/timeslot';
import PatientPage from './pages/patient/Patient';
import DoctorMain from './pages/doctor/doctorMain';
import DoctorLogin from './pages/doctor/doctorLogin';
import MyAppointments from './pages/doctor/MyAppointments';
import MyPatients from './pages/doctor/MyPatients';
import SignupDoctor from './pages/doctor/signupDoctor';
import ViewWalletAmountPage from './pages/patient/viewWalletAmountPage';
import HealthPackages from './pages/patient/healthPackages';import contract from './pages/doctor/contract';import DrawerAppBar from './components/patientBar/patientBar';
import SignUpPatient from './pages/patient/signingUp';
import Log from './pages/login'
import HomePage from './pages/patient/homePage';
import DoctorHomePage from './pages/doctor/homePage';
import AdminHomePage from './pages/admin/homePage';

//import DoctorAvailability from './components/DoctorAvailability';
function App() {
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
        // <Route path="/doctor/main" Component={DoctorMain} />
        // <Route path="/doctor/login" Component={DoctorLogin} />
        // <Route path="/patient/prescriptions/:username" element={<PatientPrescriptions />} />
         <Route path="/patient/home" element={<HomePage/>} />
         <Route path="/doctor/home" element={<DoctorHomePage/>} />
         <Route path="/admin/home" element={<AdminHomePage/>} />
        {/* //<Route path="/doctor/timeslot" Component={timeslottt}/> */}
         <Route path="/patient/addMember" element={<AddFamilyMember />} />
         <Route path="/patient/ViewFamilyMembers" element={<ViewFamilyMembers />} />
        // <Route path="/admin" Component={Admin} />
        // <Route path="/doctor/appointments" Component={MyAppointments} />
        <Route path="/patient/walletAmount/:username" element={<ViewWalletAmountPage />} />
        <Route path="/doctor/signup" element={<SignupDoctor />} />
        // <Route path="/doctor/patients" Component={MyPatients} />
      
      </Routes>
    
        
    </Router>
  );
}

export default App;


