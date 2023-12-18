import React from "react";
import AdminList from "../../components/ViewAllAdmins";
import CreateAdminButton from "../../components/addAdmin";
import AdminBar from "../../components/admin Bar/adminBar";
import RemoveAdmin from "../../components/RemoveAdmin";
import Background from '../../admin.jpeg';
import Back from "../../components/backButton";
import { Typography } from "@mui/material";

const adminPage = () => {
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
            <AdminBar/>
            <div
      style={{
        position: 'relative',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '50vh',
        marginBottom: '100px',
        backgroundPosition: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Transparent overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      ></div>

      <Back />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h1>
          <strong>ADMINS LIST</strong>
        </h1>
      </div>
    </div>
           <AdminList></AdminList>
          
         


        </div>
    );
};
export default adminPage;