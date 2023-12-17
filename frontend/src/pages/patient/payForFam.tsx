import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PatientBar from "../../components/patientBar/patientBar";
import { Alert, AlertColor, Card, CardContent, CircularProgress, Grid, Paper, Snackbar } from "@mui/material";
import Back from "../../components/buttonBlack";
import WalletIcon from "@mui/icons-material/Wallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import image from "../../paygirl.jpg";
import El7a2niPatientInfo from "../../components/El7a2niPatient-info";

const PayMedicines: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const { date, price } = useParams<{ date: string; price: string }>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>('error');
  const [isWalletLoading, setWalletLoading] = useState(false);
const [isCardLoading, setCardLoading] = useState(false);


  const handlePayment = async (paymentMethod: string) => {
    try {
      setLoading(true);
      if (paymentMethod === "wallet") {
        setWalletLoading(true);
      } else if (paymentMethod === "card") {
        setCardLoading(true);
      }
        const doctorUsername=localStorage.getItem('selectedDoctor');
        const user =localStorage.getItem('FamMemUserName');
        const token = localStorage.getItem('authToken');
        const response = await fetch('/routes/appointments/makeAppForFam', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            price,
            date,
            doctorUsername,
            paymentMethod,
            user
          }),
        });

      const data = await response.json();
      console.log(data);

      console.log(data);
      if(response.status>=200  && response.status<300){
        if (paymentMethod === "card" && data.sessionUrl) {
          window.location.href = data.sessionUrl;
        } else if (paymentMethod === "wallet") {
          setSnackbarSeverity('success');
          setSnackbarMessage('Appointment scheduled succesfully');
          setSnackbarOpen(true);
        }
      }
      else{
        setSnackbarSeverity('error');
        setSnackbarMessage('"Insufficient balance in your wallet');
        setSnackbarOpen(true);
      }
      } catch (error : any) {
        setSnackbarSeverity('error');
        setSnackbarMessage('Error '+ error.message);
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
        setWalletLoading(false);
        setCardLoading(false);
      }
  };
  const handleClose = () => {
    setSnackbarOpen(false);
    navigate('/patient/viewDoctors');

  };
  const PaymentCard = ({
    paymentMethod,
    label,
  }: {
    paymentMethod: string;
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
        marginTop: "20px",
        cursor: "pointer",
        backgroundColor: "#eee",
        boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.1)",
      }}
      onClick={() => handlePayment(paymentMethod)}
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
          fontSize: "1.2rem",
        }}
      >
        {label}
      </Typography>
      {paymentMethod === "card" ? <CreditCardIcon sx={{ fontSize: "2rem" }} /> : null}
      {paymentMethod === "wallet" ? <WalletIcon sx={{ fontSize: "2rem" }} /> : null}
      {paymentMethod === "wallet" && isWalletLoading ? <CircularProgress size={24} /> : null}
      {paymentMethod === "card" && isCardLoading ? <CircularProgress size={24} /> : null}
    </Paper>
  </Grid>
);
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
    <Back/>
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
          <PaymentCard paymentMethod="wallet" label="Wallet" />
          <PaymentCard paymentMethod="card" label="Credit Card" />
        </Grid>
      </div>
    </div>
    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity={snackbarSeverity} onClose={handleClose}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
    <El7a2niPatientInfo />

  </>
);

};
export default PayMedicines;
