import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, Box, Container, Paper } from "@mui/material";
import DrawerAppBar from "../../components/patientBar/patientBar";
import Carousel from "../../components/Carousel";
import logo from "../../logo.jpeg";

import TodayAppointmentsPatient from "./todaysappP";
import El7a2niInfo from "../../components/El7a2ni-info";
import { ServerResponse } from "http";
import ServicesSection from "./servicessection";
import AskDoctorBanner from "./askDoctorBanner";

function HomePage() {
  const navigate = useNavigate();
  const { username } = useParams();
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
      <DrawerAppBar />
      <Carousel />
      <TodayAppointmentsPatient />
      <ServicesSection />
      <AskDoctorBanner />
      <El7a2niInfo />
    </>
  );
}

export default HomePage;
