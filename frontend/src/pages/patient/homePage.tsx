import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, Box, Container, Paper } from "@mui/material";
import DrawerAppBar from "../../components/patientBar/patientBar";
import Carousel from "../../components/Carousel";
import logo from "../../logo.jpeg";

import TodayAppointmentsPatient from "./todaysappP";
import El7a2niPatientInfo from "../../components/El7a2niPatient-info";

function HomePage() {
  const navigate = useNavigate();
  const { username } = useParams();

  return (
    <>
      <DrawerAppBar />
      <Carousel />
      <TodayAppointmentsPatient />

      <El7a2niPatientInfo />
    </>
  );
}

export default HomePage;
