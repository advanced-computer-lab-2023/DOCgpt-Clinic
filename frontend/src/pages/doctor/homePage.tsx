import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, Box, Container, Paper } from "@mui/material";
import DoctorBar from "../../components/Doctor bar/doctorBar";
import DoctorMain from "./doctorMain";
import Carousel from "react-material-ui-carousel";
import MyCarousel from "../../components/Carousel";
import TodayAppointmentsComponent from "./todaysappDOC";
import El7a2niDocInfo from "../../components/El7a2niDoc-info";
import HealthcareServices from "./DoctorHealthCarServices";
import AskPatientBanner from "./askPatientBanner";

function HomePage() {
  const navigate = useNavigate();
  const { username } = useParams();

  return (
    <>
      <DoctorBar />
      <MyCarousel />
      <TodayAppointmentsComponent />
      <HealthcareServices />
      <AskPatientBanner />
      <El7a2niDocInfo />
    </>
  );
}

export default HomePage;
