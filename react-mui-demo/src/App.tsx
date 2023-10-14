import React from 'react';
import AdminForm from './components/AdminPage';
import AdminList from './components/AdminList';
import DoctorInfo from  './components/DoctorInfo'
import Package from './components/Package'
import PackageList from './components/PackageList';
import Packageupdate from './components/updatePackagess'; // Correct the import statement
import Patientview from './components/PatientsList';
function App() {
  return (
    <div>
      <h1>Your App</h1>
      <AdminForm />                    <AdminList />
      
      <DoctorInfo />                    <Package/>
      
      <PackageList/>                  <Packageupdate/>

      <Patientview/>
      

    </div>
  );
}

export default App;
