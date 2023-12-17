import React, { useState } from 'react';
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';
import ShoppingCartCheckoutSharpIcon from '@mui/icons-material/ShoppingCartCheckoutSharp';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText, Divider, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';import axios from 'axios';
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
  const { doctorName, date, status, medicines, _id} = prescription;
const navigate=useNavigate();  const [cart, setCart] = useState<Prescription | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState<string>("");




  const handleDownload = () => {
    console.log('Download button clicked');
  };

  // const handleCheckout = () => {
  //   console.log('Checkout button clicked');
  // };
  console.log(prescription._id);
  console.log(prescription.doctorName);
  const handleCardClick = (id:String) => {
    console.log(id);
    navigate(`/selectedPres/${id}`);
  };
  const formattedDate = prescription && new Date(prescription.date).toISOString().split('T')[0];
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
    <div style={{margin:'left', justifyContent: 'center', alignItems: 'center' }}>
      <Card  style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '300px', width: '500px' }}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Prescription
            </Typography>
            <Divider style={{ margin: '8px 0' }} />
          </Grid>
          <Grid item xs={12} >
            <Typography marginRight='30px' align="right"  fontSize="h3" color="textSecondary" gutterBottom >
               {formattedDate}
            </Typography>
          </Grid>
          <Grid item xs={12 }>
            <Typography align="center" fontSize="h3" color="textSecondary" gutterBottom>
              <strong>Doctor:</strong> {doctorName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" fontSize="h3" color="textSecondary" gutterBottom>
              <strong>Status:</strong> {status}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ margin: '8px 0' }} />
          </Grid>
          <Grid container justifyContent="center" alignItems="center"item xs={12}>
            <Button variant="contained" onClick={() => handleCardClick(_id)} >
              View Prescription
            </Button>
          </Grid>
        </Grid>
      </Card>
      </div>
  );
  
};  

export default PrescriptionCard;
