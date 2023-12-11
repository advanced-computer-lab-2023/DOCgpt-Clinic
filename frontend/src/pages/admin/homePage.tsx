import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Typography, Button, Box, Container, Paper } from "@mui/material";
import AdminBar from "../../components/admin Bar/adminBar";
import Carousel from "react-material-ui-carousel";
import MyCarousel from "../../components/Carousel";
import El7a2niInfo from "../../components/El7a2ni-info";

function AdminHomePage() {
  const navigate = useNavigate();
  const { username } = useParams();

  // Function to handle navigation to health record page

  return (
    <>
      <AdminBar />
      <MyCarousel />

      <El7a2niInfo />
    </>
  );
}

export default AdminHomePage;
