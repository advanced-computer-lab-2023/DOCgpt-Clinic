// SelectedPres.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Divider, Grid, Button, List, ListItem, ListItemText, Container, Card, CardContent, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import PatientAppBar from '../../components/patientBar/patientBar';
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';
import ShoppingCartCheckoutSharpIcon from '@mui/icons-material/ShoppingCartCheckoutSharp';
import PrescriptionCard from '../../components/prescription';

interface Medicine {
  medicineName: string;
  dosage: string;
  quantity: number;
  _id: string;
}
interface Prescription {
  doctorUsername: string;
  date: string;
  status: string;
  Medicines: Medicine[];
  _id: string;
}

const SelectedPrescription = () => {
  const { id } = useParams();
  const [prescription, setPrescription] = useState<Prescription>();
  const [open, setOpen] = useState(true);
  

  
  useEffect(() => {
    const fetchPrescriptionDetails = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`/routes/getPrescriptionDetails?prescriptionId=${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setPrescription(response.data.prescription);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching prescription details:', error);
      }
    };

    fetchPrescriptionDetails();
  }, [id]);

  const handleCheckout = () => {
    console.log('Checkout button clicked');
  };
  const handleDownload = () => {
    console.log('Download button clicked');
  };
  const formattedDate = prescription && new Date(prescription.date).toISOString().split('T')[0];
  const navigate=useNavigate();

  
  const handleClose = () => {
    setOpen(false);
    navigate('/patient/prescriptions');

  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h4" gutterBottom color="primary" style={{ textAlign: 'center' }}>
          PRESCRIPTION DETAILS
        </Typography>
      </DialogTitle>
      <DialogContent>
        {prescription ? (
          <Container>
            <Divider style={{ margin: '16px 0' }} />
            <Typography variant="body1" color="textSecondary" gutterBottom>
              <strong>Doctor: </strong> {prescription.doctorUsername}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Date:</strong> {formattedDate}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Status:</strong> {prescription.status}
            </Typography>
            <Divider style={{ margin: '16px 0' }} />

            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Medicines:</strong>
            </Typography>
            <List>
              {prescription.Medicines &&
                prescription.Medicines.map((medicine, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${medicine.medicineName} - Dosage: ${medicine.dosage}, Quantity: ${medicine.quantity}`}
                    />
                  </ListItem>
                ))}
            </List>
          </Container>
        ) : (
          <p>Loading..</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCheckout}
          startIcon={<ShoppingCartCheckoutSharpIcon />}
          disabled={prescription && prescription.status === 'filled'}
        >
          Checkout
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleDownload}
          startIcon={<FileDownloadSharpIcon />}
        >
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default SelectedPrescription;
