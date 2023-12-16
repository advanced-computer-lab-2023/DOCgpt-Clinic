import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PatientBar from "../../components/patientBar/patientBar";
import { Card, CardContent, Grid, Snackbar } from "@mui/material";

const PayMedicines: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { date, price } = useParams<{ date: string, price: string }>();

  const handlePayment = async (paymentMethod: string) => {
    try {
        const doctorUsername=localStorage.getItem('selectedDoctor');
        const familyMemberName =localStorage.getItem('fam');
        const token = localStorage.getItem('authToken');
        const response = await fetch('/routes/appointments/makeApp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            price,
            date,
            doctorUsername,
            paymentMethod
          }),
        });

      const data = await response.json();
      console.log(data);

      console.log(data);
      if (paymentMethod === "card" && data.sessionUrl) {
        window.location.href = data.sessionUrl;
      } else if (paymentMethod === "Wallet") {
        setMessage("Order placed succesfully");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setSnackbarOpen(false);
  };
  const PaymentCard = ({
    paymentMethod,
    label,
  }: {
    paymentMethod: string;
    label: string;
  }) => (
    <Grid item xs={12}>
      <Card variant="outlined">
        <CardContent>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handlePayment(paymentMethod)}
            disabled={loading}
          >
            {label}
          </Button>
        </CardContent>
      </Card>
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
    <React.Fragment>
      <PatientBar />
      <Typography variant="h4" gutterBottom>
        Choose Payment Method
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <PaymentCard paymentMethod="wallet" label="wallet" />
        <PaymentCard paymentMethod="card" label="card" />
      </Grid>
      {message ? (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
        />
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};
export default PayMedicines;