import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import PatientBar from "./patientBar/patientBar";
import DoctorBar from "./Doctor bar/doctorBar";

const theme = createTheme();

const ChangePasswordDoctor: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "currentPassword") {
      setCurrentPassword(e.target.value);
    } else if (e.target.name === "newPassword") {
      setNewPassword(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "/routes/doctors/changePassDoc",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setMessage("Password changed successfully");
      }
    } catch (error) {
      setError("Failed to change password");
    }
  };

  return (
    <>
      <DoctorBar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Typography component="h1" variant="h5">
              Change Password
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="currentPassword"
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                value={newPassword}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Change Password
              </Button>
              <Box mt={2}>
                <Typography variant="body1" color="textPrimary">
                  {message}
                </Typography>
                <Typography variant="body1" color="error">
                  {error}
                </Typography>
              </Box>
            </form>
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default ChangePasswordDoctor;