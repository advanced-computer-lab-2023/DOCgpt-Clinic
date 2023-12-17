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

import LockResetIcon from "@mui/icons-material/LockReset";
import man from "../../man.jpg";
import PatientAppBar from "../../components/patientBar/patientBar";
import AdminAppBar from "../../components/admin Bar/adminBar";
import { margin } from "@mui/system";
import { useNavigate } from "react-router-dom";

const AdminProfilePage = () => {
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authorization token is missing");
        }

        const response = await axios.get("/routes/admins/getadmin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("response.data", response.data);

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
  useEffect(() => {
    console.log("patient has been updated", patient);
  }, [patient]);
  if (isLoading) {
    return <div>Loading patient data...</div>;
  }

  if (error) {
    return <div>Error loading page: {error}</div>;
  }

  if (!patient) {
    return <div>No patient data available.</div>;
  }

  const { username, email } = patient;

  const profileImage = "/male-image.jpg";

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
    borderRadius: "15px",
    padding: "30px",
    // Rounded borders like in the screenshot
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
  const handleChangePasswordClick = () => {
    navigate("/changepasswordadmin");
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
      <AdminAppBar />
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>
              Welcome, {username}
            </Typography>
            <Paper sx={paperStyle}>
              <Avatar
                src={man}
                alt={username}
                sx={{ width: 128, height: 128, mb: 2 }}
              />
              <Box sx={{ width: "100%" }}>
                <Box sx={iconListStyle}>
                  <EmailIcon />
                  <Typography>{email}</Typography>
                </Box>

                {/* Add more details as needed */}
              </Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<LockResetIcon />}
                sx={{ mt: 3 }}
                onClick={handleChangePasswordClick}
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

export default AdminProfilePage;
