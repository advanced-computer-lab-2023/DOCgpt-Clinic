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
import AdminBar from "./admin Bar/adminBar";
import Background from "../changePassword.jpg";
import Back from "./backButton";
import El7a2niInfo from "./El7a2ni-info";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { set } from "date-fns";

const theme = createTheme();

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [snackbarType, setSnackbarType] = useState<SnackbarType>("success");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  type SnackbarType = "success" | "error" | "warning" | "info";

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
        "/routes/patient/changePassPatient",
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
        setSnackbarType("success");
        setOpenSnackbar(true);
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch (error: any) {
      // If there is an error, use the message from the server response
      const errorMessage =
        error.response?.data?.message || "Failed to change password";
      setError(errorMessage);
      setSnackbarType("error");
      setOpenSnackbar(true);
    }
  };
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <PatientBar />
      <div
        style={{
          position: "relative",
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          minHeight: "50vh",
          marginBottom: "100px",
          backgroundPosition: "center",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Transparent overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        ></div>

        <Back />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
          }}
        >
          <h1>
            <strong>CHANGE PASSWORD</strong>
          </h1>
        </div>
      </div>
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
            </form>
          </div>
        </Container>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarType} // This will be either 'success' or 'error'
            sx={{ width: "100%" }}
          >
            {snackbarType === "success" ? message : error}
          </Alert>
        </Snackbar>
      </ThemeProvider>
      <El7a2niInfo />
    </>
  );
};

export default ChangePassword;
