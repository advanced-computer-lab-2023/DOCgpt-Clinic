import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(true);
  const [showValidate, setShowValidate] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const generateOTP = async () => {
    try {
      // Make an API call to generate and send OTP to the user's email
      const response = await axios.post("/routes/otp/otpMail", {
        email,
      });
      setMessage(response.data.message);
      setOtpSent(false);
      setShowValidate(true);
    } catch (error) {
      setMessage("Error: Unable to generate OTP.");
    }
  };

  const verifyOTP = async () => {
    try {
      // Make an API call to verify the OTP
      const response = await axios.post(`/routes/otp/verifyOtp?code=${otp}`);
      setMessage(response.data.msg);
      setShowValidate(false);
      setShowPass(true);
    } catch (error) {
      setMessage("Error: Invalid OTP.");
    }
  };

  const resetPassword = async () => {
    try {
      // Make an API call to reset the password
      const response = await axios.post("/routes/otp/resetPassword", {

        newPassword,
        confirmPassword,
      });
      setMessage(response.data.message);
      navigate("/login");
    } catch (error) {
      setMessage("Error: Unable to reset password.");
      console.log(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h5">Password Reset</Typography>
        {otpSent ? (
          <div>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={generateOTP}>
              Generate OTP
            </Button>
          </div>
        ) : null}
        {showValidate ? (
          <div>
            <TextField
              label="OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={verifyOTP}>
              Verify OTP
            </Button>
          </div>
        ) : null}
        {showPass ? (
          <div>

            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={resetPassword}>
              Reset Password
            </Button>
          </div>
        ) : null}
        <Typography variant="body1" style={{ marginTop: 20 }}>
          {message}
        </Typography>
      </Paper>
    </Container>
  );
};

export default PasswordReset;