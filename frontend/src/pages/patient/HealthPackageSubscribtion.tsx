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
  const { packageName } = useParams<{ packageName: string }>(); // Get packageName from URL params

  const handlePayment = async (paymentMethod: string) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/routes/subscribeToHealthPackage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            packageName,
            paymentMethod,
          }),
        });

      const data = await response.json();
      console.log(data);

      console.log(data);
      if (paymentMethod === "creditCard" && data.sessionUrl) {
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
  return (
    <React.Fragment>
      <PatientBar />
      <Typography variant="h4" gutterBottom>
        Choose Payment Method
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <PaymentCard paymentMethod="Wallet" label="Wallet" />
        <PaymentCard paymentMethod="creditCard" label="Credit Card" />
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