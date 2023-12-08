import React from 'react';
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';
import ShoppingCartCheckoutSharpIcon from '@mui/icons-material/ShoppingCartCheckoutSharp';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText, Divider, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
const navigate=useNavigate();
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

  return (
    <button onClick={() => handleCardClick(_id)}>
<Card style={{ width: '400px', padding: '20px', margin: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Prescription
            </Typography>
            <Divider style={{ margin: '8px 0' }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              <strong>Doctor:</strong> {doctorName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
            <strong>Date:</strong> {formattedDate}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Status:</strong> {status}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ margin: '8px 0' }} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" color="primary" fullWidth>
              View Prescription
            </Button>
          </Grid>
        </Grid>
      </Card>
    </button>
  );
  
};  

export default PrescriptionCard;
