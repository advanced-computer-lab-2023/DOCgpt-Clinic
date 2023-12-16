import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PatientBar from "./patientBar/patientBar";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import WalletIcon from "@mui/icons-material/Wallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  Radio,
  Paper,
  RadioGroup,
  CardContent,
  Grid,
  Alert ,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import image from "../paygirl.jpg";

const PayMoney: React.FC = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isMessage, setIsMessage] = useState(false);
  const handlePayment = async (method: string) => {
    try {
      const authToken = localStorage.getItem("authToken");
      setLoading(true);
      const response = await fetch("/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          method,
        }),
      });
  
      const data = await response.json();
  
      if (response.status >= 200 && response.status < 300) {
        if (method === "card" && data.url) {
          window.location.href = data.url;
        } else if (method === "cash on delivery" || method === "wallet") {
          setIsMessage(true);
          setMessage("Order placed successfully");
          setSnackbarOpen(true);
        }
      } 
      else {
        setIsMessage(true);
        setMessage('Insufficient Wallet Balance');
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      console.error("Error:", error);
      console.error("Server Error Message:", error.response?.data?.error);
  
      setIsMessage(true);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.message);
      } else if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === "string") {
        setError(error);
      } else {
        setError("An error occurred");
      }
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  
    // try {
    //   const response = await axios.get(
    //     "http://localhost:3000/routes/notification/notify"
    //   );
  
    //   if (response.status >= 200 && response.status < 300) {
    //     console.log("Pharmacists notified successfully");
    //   } else {
    //     console.log("Failed to notify pharmacists");
    //   }
    // } catch (error) {
    //   console.error("Error notifying pharmacists:", error);
    // }
  };
  
  const renderSnackbarContent = () => {
    if (message === 'Insufficient Wallet Balance') {
      return "You have insufficient wallet balance.";
    } else if (error) {
      return error;
    } else if (message) {
      return message;
    } else {
      return "";
    }
  };
  const handleClose = () => {
    setSnackbarOpen(false);
  };
  const PaymentCard = ({
    method,
    label,
  }: {
    method: string;
    label: string;
  }) => (
    <Grid item xs={12}>
      <Paper
        elevation={3}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          width: "30%",
          height: "60%",
          marginTop: "20px", // Adjust the marginTop value to move the papers down
          cursor: "pointer",
          backgroundColor: "#eee",
          boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.1)",
        }}
        onClick={() => handlePayment(method)}
        onMouseEnter={(e) => {
          e.currentTarget.style.border = "2px solid #2196F3";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = "2px solid transparent";
        }}
      >
        <Typography
  variant="h6"
  style={{
    textAlign: "left",
    marginBottom: "10px",
    color: "#000",
    fontSize: "1.2rem", // Adjust the fontSize value to make the font bigger
  }}
>
  {label}
</Typography>
        {method === "card" && <CreditCardIcon sx={{ fontSize: "2rem" }} />}
        {method === "cash on delivery" && (
          <MonetizationOnIcon sx={{ fontSize: "2rem" }} />
        )}
        {method === "wallet" && <WalletIcon sx={{ fontSize: "2rem" }} />}
      </Paper>
    </Grid>
  );  
  const getErrorSeverity = (message: string) => {
    if (message === 'Insufficient Wallet Balance' || message === 'Failed to Process Payment') {
      return 'error';
    }
    return 'success';
  };
  
  const getErrorColor = (message: string) => {
    return message === 'Insufficient Wallet Balance' || message === 'Failed to Process Payment'
      ? '#f44336' // Red for error
      : '#4CAF50'; // Green for success
  };
  const ElevationPaper = () => (
    <Paper
      elevation={10} // Set the desired elevation value
      style={{
        position: "absolute",
        top: "41%", // Adjust the top value as needed
        right: "60.5%", // Adjust the right value as needed
        transform: "translateY(-50%)",
        padding: "20px",
        backgroundColor: "#fff", // Set the background color
        zIndex: 1,
        height: "250px", // Set the desired height
        width: "460px",
        marginLeft: "100px", // Set the desired width// Set a higher zIndex than the existing content
      }}
    />
  );
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "710px 710px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right center",
        height: "100vh",
        position: "relative",
        marginTop: "50px",
        zIndex: 0,
      }}
    >
      <PatientBar />
      <div
        style={{
          marginLeft: "150px",
          paddingTop: "64px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{ textAlign: "left", color: "#000", marginLeft: "-8px" }}
        >
          Choose Payment Method 
        </Typography>
        <Grid container spacing={0.0001}>
          <PaymentCard method="wallet" label="Wallet" />
          <PaymentCard method="card" label="Credit Card" />
          <PaymentCard method="cash on delivery" label="Cash on Delivery" />
        </Grid>
      </div>

      {/* Render the elevated Paper component */}
      <ElevationPaper />

     {isMessage && (
  <Snackbar
    open={snackbarOpen}
    autoHideDuration={6000}
    onClose={handleClose}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
  >
    <Alert
      onClose={handleClose}
      severity={getErrorSeverity(message)}
      sx={{
        backgroundColor: getErrorColor(message),
        color: "#fff",
      }}
    >
      {renderSnackbarContent()}
    </Alert>
  </Snackbar>
)}
  </div>
  );
};

export default PayMoney;
