import React from 'react';
import AdminForm from '../../components/AdminPage';
import AdminList from '../../components/AdminList';
import DoctorInfo from  '../../components/DoctorInfo'
import Package from '../../components/Package'
import PackageList from '../../components/PackageList';
import Packageupdate from '../../components/updatePackagess'; // Correct the import statement
import Patientview from '../../components/PatientsList';
import RemoveDoc from '../../components/RemoveDoc';
import RemovePatient from '../../components/RemovePatient';
import RemoveAdmin from '../../components/RemoveAdmin';
import RemovePackages from '../../components/RemovePackages';
import { Typography } from '@mui/material';
function Admin() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return (
      <div>
        <Typography component="h1" variant="h5">
          access denied
        </Typography>
      </div>
    );
  }
  return (
    <div>
      <h1>Your App</h1>
      <AdminForm />                    <AdminList />
      
      <DoctorInfo />                    <Package/>
      
      <PackageList/>                  <Packageupdate/>

      <Patientview/>
      <RemoveAdmin/>

      <RemoveDoc/>

      <RemovePatient/>

      <RemovePackages/>
      

    </div>
  );
}

export default Admin;
