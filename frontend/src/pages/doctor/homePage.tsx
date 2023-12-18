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
