import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, Box, Container, Paper } from "@mui/material";
import DrawerAppBar from "../../components/patientBar/patientBar";
import Carousel from "../../components/Carousel";
import logo from "../../logo.jpeg";
import Footer from "../../components/El7a2niInfo";
import TodayAppointmentsPatient from "./todaysappP";

function HomePage() {
  const navigate = useNavigate();
  const { username } = useParams();

  return (
    <>
      <DrawerAppBar />
      <Carousel />
      <TodayAppointmentsPatient />
      <Footer />
    </>
  );
}

export default HomePage;
