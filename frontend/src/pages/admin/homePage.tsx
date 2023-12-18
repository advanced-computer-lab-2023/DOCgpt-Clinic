import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Typography, Button, Box, Container, Paper } from "@mui/material";
import AdminBar from "../../components/admin Bar/adminBar";
import Carousel from "react-material-ui-carousel";
import MyCarousel from "../../components/Carousel";
import El7a2niAdminInfo from "../../components/El7a2niAdmin-info";

function AdminHomePage() {
  const navigate = useNavigate();
  const { username } = useParams();

  // Function to handle navigation to health record page
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
    <>
      <AdminBar />
      <MyCarousel />

      <El7a2niAdminInfo />
    </>
  );
}

export default AdminHomePage;
