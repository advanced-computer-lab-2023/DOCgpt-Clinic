import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import CakeIcon from "@mui/icons-material/Cake";
import LockResetIcon from "@mui/icons-material/LockReset";
import man from "../../man.jpg";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import PatientAppBar from "../../components/patientBar/patientBar";

const API_BASE_URL = "http://localhost:3000"; // Replace with your actual base URL

const PatientProfilePage = () => {
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authorization token is missing");
        }

        const response = await axios.get("/routes/patient/getPatient", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setPatient(response.data);
      } catch (err: any) {
        setError(
          err.message || "An error occurred while fetching patient data."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatient();
  }, []);

  if (isLoading) {
    return <div>Loading patient data...</div>;
  }

  if (error) {
    return <div>Error loading page: {error}</div>;
  }

  if (!patient) {
    return <div>No patient data available.</div>;
  }

  const {
    name,
    username,
    email,
    mobilenumber,
    gender,
    dateofbirth,
    address,
    emergencyContact,
  } = patient;
  const { fullName, mobileNumber, relation } = emergencyContact; // Destructure the emergencyContact object

  const profileImage =
    gender === "Male" ? "/male-image.jpg" : "/female-image.jpg"; // Replace with your image paths

  const profileStyle = {
    display: "flex",
    justifyContent: "space-between",
    p: 4,
    bgcolor: "primary.main",
    color: "white",
  };

  const detailStyle = {
    p: 4,
    bgcolor: "background.paper",
  };

  const iconStyle = {
    mr: 2,
    verticalAlign: "bottom",
  };
  const paperStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    p: 4,
    mb: 2,
    bgcolor: "background.paper",
    borderRadius: "15px", // Rounded borders like in the screenshot
  };

  // New icon style for a uniform look
  const iconListStyle = {
    display: "flex",
    alignItems: "center",
    mt: 1,
    "& svg": {
      mr: 1,
    },
  };
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
      <PatientAppBar />
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>
              Welcome, {name}
            </Typography>
            <Paper sx={paperStyle}>
              <Avatar
                src={man}
                alt={name}
                sx={{ width: 128, height: 128, mb: 2 }}
              />
              <Box sx={{ width: "100%" }}>
                <Box sx={iconListStyle}>
                  <EmailIcon />
                  <Typography>{email}</Typography>
                </Box>
                <Box sx={iconListStyle}>
                  <PhoneIcon />
                  <Typography>{mobilenumber}</Typography>
                </Box>
                <Box sx={iconListStyle}>
                  <CakeIcon />
                  <Typography>
                    Date of Birth: {new Date(dateofbirth).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box sx={iconListStyle}>
                  <ContactEmergencyIcon />
                  <Typography variant="h5" sx={{ width: "100%" }}>
                    Emergency Contact
                  </Typography>
                </Box>
                <Box sx={iconListStyle}>
                  <Typography variant="body1" sx={{ width: "100%" }}>
                    Name: {fullName}
                  </Typography>
                </Box>
                <Box sx={iconListStyle}>
                  <Typography variant="body1" sx={{ width: "100%" }}>
                    Mobile Number: {mobileNumber}
                  </Typography>
                </Box>
                <Box sx={iconListStyle}>
                  <Typography variant="body1" sx={{ width: "100%" }}>
                    Relation: {relation}
                  </Typography>
                </Box>
                {/* Add more details as needed */}
              </Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<LockResetIcon />}
                sx={{ mt: 3 }}
              >
                Change Password
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PatientProfilePage;
