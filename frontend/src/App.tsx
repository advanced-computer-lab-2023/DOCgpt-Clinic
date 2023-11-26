import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import LandingPage from "./pages/landingPage";
import PatientRegistrationForm from "./pages/patient/signup";
import DoctorRegistrationForm from "./pages/doctor/doctorSignUp";
import PatientHome from "./pages/patient/patientHome";
import PatientPrescriptions from "./pages/patient/prescriptions";
import AddFamilyMember from "./pages/patient/addFam";
import ViewFamilyMembers from "./pages/patient/getFam";
import Admin from "./pages/admin/admin";
//import timeslottt from './pages/doctor/timeslot';
import PatientPage from "./pages/patient/Patient";
import DoctorMain from "./pages/doctor/doctorMain";
import DoctorLogin from "./pages/doctor/doctorLogin";
import MyAppointments from "./pages/doctor/MyAppointments";
import MyPatients from "./pages/doctor/MyPatients";
import SignupDoctor from "./pages/doctor/signupDoctor";
import ViewWalletAmountPage from "./pages/patient/viewWalletAmountPage";
import HealthPackages from "./pages/patient/healthPackages";
import contract from "./pages/doctor/contract";
import DrawerAppBar from "./components/patientBar/patientBar";
import SignUpPatient from "./pages/patient/signingUp";
import Log from "./pages/login";
import HomePage from "./pages/patient/homePage";
import DoctorHomePage from "./pages/doctor/homePage";
import AdminHomePage from "./pages/admin/homePage";
import LinkFamilyMember from "./components/linkfammem";
import DoctorRequests from "./components/admin/DoctorRequests";
import PasswordReset from "./components/resetPassword";
import DoctorAvailability from "./components/doctor/DoctorAvailability";
import SubscribeFam from "./pages/patient/SubscribeFam";
import Mypackages from "./pages/patient/Mypackages";
import subscribedPage from "./pages/patient/subscribedPackage";
import HealthRecord from "./pages/doctor/HealthRecord";
import HealthRecordEmpty from "./pages/doctor/HealthRecordEmpty";
import HealthRecordForm from "./pages/doctor/HealthRecordForm";
import PatientsInfo from "./pages/doctor/PatientsInfo";
import ViewMyTimeSlots from "./pages/doctor/ScheduleFollowUp";
import DoctorInfo from "./pages/patient/DoctorInfo";
import ViewDoctors from "./pages/patient/viewDoctors";
import ViewMyAppointments from "./pages/patient/ViewMyAppointments";
import ViewMyHealthRecord from "./pages/patient/ViewMyHealthRecord";
import ViewMyFam from "./pages/patient/ViewMyFam";
import ViewDoctorDocuments from "./pages/doctor/viewDoctorDocuments";
import HealthPackageSubscriptionPage from "./pages/patient/HealthPackageSubscribtion";
import FamSub from "./pages/patient/famSub";
import PayForApp from "./pages/patient/payForAppointment";
import PayForFam from "./pages/patient/payForFam";
import adminPage from "./pages/admin/adminPage";
import adminHome from "./pages/admin/adminHome";
import RemoveDoc from "./components/RemoveDoc";
import DoctorInformation from "./components/DoctorInfo";
import RemovePatient from "./components/RemovePatient";
import PackagesPage from "./pages/admin/packages";
import HealthPackage from "./components/healthPackages";
import ChangePassword from "./components/changePasswordPatient";
import ChangePasswordDoctor from "./components/changePassworddoctor";
import ChangePasswordAdmin from "./components/changePasswordadmin";
function App() {
  useEffect(() => {
    // Create a link element for the font stylesheet
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap";

    // Append the link element to the document head
    document.head.appendChild(linkElement);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" Component={Landing} />
        {/* //     <Route path="/"  Component={LandingPage} /> */}
        <Route path="/" Component={Landing} />
        <Route path="/login" Component={Log} />
        <Route path="/register/patient" Component={SignUpPatient} />
        <Route path="/register/doctor" Component={DoctorRegistrationForm} />
        // <Route path="/patient/main" Component={PatientPage} />
        // <Route path="/doctor/main" Component={DoctorMain} />
        // <Route path="/doctor/login" Component={DoctorLogin} />
        //{" "}
        <Route
          path="/patient/prescriptions/:username"
          element={<PatientPrescriptions />}
        />
        <Route path="/patient/home" element={<HomePage />} />
        <Route path="/patient/link" element={<LinkFamilyMember />} />
        <Route path="/doctor/home" element={<DoctorHomePage />} />
        <Route path="/admin/home" element={<AdminHomePage />} />
        <Route path="/doctor/time" element={<DoctorAvailability />} />
        {/* //<Route path="/doctor/timeslot" Component={timeslottt}/> */}
        <Route path="/patient/addMember" element={<AddFamilyMember />} />
        <Route
          path="/patient/ViewFamilyMembers"
          element={<ViewFamilyMembers />}
        />
        // <Route path="/admin" Component={Admin} />
        <Route
          path="/patient/walletAmount/:username"
          element={<ViewWalletAmountPage />}
        />
        <Route path="/doctor/signup" element={<SignupDoctor />} />
        <Route path="/requests" element={<DoctorRequests />} />
        // <Route path="/doctor/patients" Component={MyPatients} />
        <Route path="/forgetpassword" element={<PasswordReset />} />
        <Route path="/contract" Component={contract} />
        <Route path="/patient/healthPackages" Component={HealthPackages} />
        <Route path="/patient/SubscribeFam" Component={SubscribeFam} />
        <Route path="/patient/packages" Component={Mypackages} />
        <Route path="/patient/subscribedPage" Component={subscribedPage} />
        <Route path="/doctor/appointments" Component={MyAppointments} />
        <Route path="/doctor/patients" Component={MyPatients} />
        <Route path="/doctor/patientInfo" Component={PatientsInfo} />
        <Route path="/doctor/patientHealthRecord" Component={HealthRecord} />
        <Route path="/doctor/healthRecordEmpty" Component={HealthRecordEmpty} />
        <Route path="/doctor/healthRecordForm" Component={HealthRecordForm} />
        <Route path="/patient/viewDoctors" Component={ViewDoctors} />
        <Route
          path="/patient/viewMyappointments"
          Component={ViewMyAppointments}
        />
        <Route
          path="/patient/viewMyhealthrecords"
          Component={ViewMyHealthRecord}
        />
        <Route path="/doctor/followUp" element={<ViewMyTimeSlots />} />
        <Route path="/patient/doctorinfo" Component={DoctorInfo} />
        <Route path="/patient/ViewMyFam/:date/:price" Component={ViewMyFam} />
        <Route
          path="/view-doctor-documents"
          element={<ViewDoctorDocuments />}
        />
        <Route
          path="/health-package-subscription/:packageName"
          Component={HealthPackageSubscriptionPage}
        />
        <Route path="/subFam/:packageName" Component={FamSub} />
        <Route path="/makeApp/:date/:price" Component={PayForApp} />
        <Route path="/makeAppForFam/:date/:price" Component={PayForFam} />
        <Route path="/AdminPage" Component={adminPage} />
        <Route path="/AdminHome" Component={adminHome} />
        <Route path="/requests" element={<DoctorRequests />} />
        <Route path="/Doctor/Remove" element={<RemoveDoc />} />
        <Route path="/admin/info" element={<DoctorInformation />} />
        <Route path="/patient/remove" element={<RemovePatient />} />
        <Route path="patient/PackagesPage" Component={PackagesPage} />
        <Route path="/hp" Component={HealthPackage} />
        <Route path="/changepasswordpatient" Component={ChangePassword} />
        <Route path="/changepassworddoctor" Component={ChangePasswordDoctor} />
        <Route path="/changepasswordadmin" Component={ChangePasswordAdmin} />
      </Routes>
    </Router>
  );
}

export default App;
