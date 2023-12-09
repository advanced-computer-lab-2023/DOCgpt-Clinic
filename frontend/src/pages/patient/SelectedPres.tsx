import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Divider,
  Container,
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Snackbar,
  CircularProgress,
  Alert,
} from '@mui/material';
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';
import ShoppingCartCheckoutSharpIcon from '@mui/icons-material/ShoppingCartCheckoutSharp';

// Define the AlertColor type
import { AlertColor } from '@mui/material/Alert';

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
  const [prescription, setPrescription] = useState<Prescription | undefined>();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>('error');

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
      } catch (error) {
        console.error('Error fetching prescription details:', error);
      }
    };

    fetchPrescriptionDetails();
  }, [id]);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      const prescriptionId = id;

      const response = await axios.post(
        '/routes/addToCart',
        { prescriptionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLoading(false);

      if (response.status === 200) {
        setSnackbarSeverity('success');
        setSnackbarMessage('Prescription added to cart successfully');
        setSnackbarOpen(true);
      } else {
        const errorMessage = response.data && response.data.error
          ? response.data.error
          : 'Error adding prescription to cart';
        setSnackbarMessage(errorMessage);
        setSnackbarOpen(true);
      }

      window.location.href = 'http://localhost:3001/CartView';
    } catch (error: any) {
      console.error('Error:', error);

      if (error.response) {
        const errorMessage = error.response.data && error.response.data.error
          ? error.response.data.error
          : 'An error occurred';
        setSnackbarMessage(errorMessage);
        setSnackbarOpen(true);
      } else if (error.request) {
        console.error('No response received:', error.request);
        setSnackbarMessage('No response received from the server');
        setSnackbarOpen(true);
      } else {
        console.error('Error setting up the request:', error.message);
        setSnackbarMessage('Error setting up the request');
        setSnackbarOpen(true);
      }

      setLoading(false);
    }
  };

  const handleDownload = () => {
    console.log('Download button clicked');
  };

  const formattedDate = prescription && new Date(prescription.date).toISOString().split('T')[0];
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate('/patient/prescriptions');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
              <strong>Doctor:</strong> {prescription.doctorUsername}
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
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Checkout'}
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
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarSeverity} onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default SelectedPrescription;
