import React from "react";
import AdminBar from '../../components/admin Bar/adminBar';
import { Typography } from "@mui/material";

const adminHome = () => {
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
    return <AdminBar />;

};
export default adminHome;