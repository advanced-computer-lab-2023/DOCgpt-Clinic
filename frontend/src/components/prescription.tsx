import React, { useState } from 'react';
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';
import ShoppingCartCheckoutSharpIcon from '@mui/icons-material/ShoppingCartCheckoutSharp';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import axios from 'axios';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

interface Medicine {
  medicineName: string;
  dosage: string;
  quantity: number;
  _id: string;
}

interface Prescription {
  doctorName: string;
  date: string;
  status: string;
  medicines: Medicine[];
  _id: string;
}

const PrescriptionCard: React.FC<{ prescription: Prescription }> = ({ prescription }) => {
  const { doctorName, date, status, medicines ,_id} = prescription;
  const [cart, setCart] = useState<Prescription | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState<string>("");




  const handleDownload = () => {
    console.log('Download button clicked');
  };
  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    setError("");
  };
  
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('authToken');
    console.log(token); 
    const prescriptionId = _id;

    const response = await axios.post('/routes/addToCart', {
      prescriptionId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    setCart(response.data);
    window.location.href = 'http://localhost:3001/CartView';

  } catch (error: any) {
    console.log("Error:", error); // Check what the error object contains

    if (error.response && error.response.data && error.response.data.error) {
      setError(error.response.data.error);
    } else if (error instanceof Error) {
      setError(error.message);
    } else if (typeof error === "string") {
      setError(error);
    } else {
      setError("An error occurred");
    }

    setSnackbarOpen(true);
  }
 // Log the response message

      // If the backend call succeeds, navigate to another page (e.g., '/success')
    
  };

  return (
    <React.Fragment>
    <Card style={{ width: '300px', margin: '16px' }}>
      <CardContent>
        <Typography variant="h6" align="center">
          Prescription
        </Typography>
        <Button
              variant="outlined"
              color="secondary"
              onClick={handleCheckout}
              startIcon={<ShoppingCartCheckoutSharpIcon />}
            >
              Checkout
            </Button>

        <Divider style={{ margin: '8px 0' }} />
        <Typography variant="body1" color="textSecondary" gutterBottom>
          <strong>Doctor:</strong> {doctorName}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <strong>Date:</strong> {date}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <strong>Status:</strong> {status}
        </Typography>
        <Divider style={{ margin: '8px 0' }} />
        <List>
          {medicines.map((medicine, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText
                  primary={`${medicine.medicineName} - Dosage: ${medicine.dosage}, Quantity: ${medicine.quantity}`}
                />
              </ListItem>
            
            </div>
          ))}
        </List>
        <Divider style={{ margin: '8px 0' }} />
        {status === 'notFilled' && (
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-around' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleDownload}
              startIcon={<FileDownloadSharpIcon />}
            >
              Download
            </Button>
          
          </div>
        )}
      </CardContent>
    </Card>
    <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Set anchor origin to bottom center
        style={{ marginBottom: '64px' }} // Add margin bottom to push it above the page content
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="error"
        >
          {error}
        </MuiAlert>
      </Snackbar>
    </React.Fragment>
)};

export default PrescriptionCard;
