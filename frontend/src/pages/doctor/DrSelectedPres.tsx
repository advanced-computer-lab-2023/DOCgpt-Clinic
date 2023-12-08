// SelectedPres.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Divider, Grid, Button, List, ListItem, ListItemText, Container, Card, CardContent } from '@mui/material';
import DrawerAppBar from '../../components/Doctor bar/doctorBar';


interface Medicine {
  medicineName: string;
  dosage: string;
  quantity: number;
  _id: string;
}
interface Prescription {
  patientUsername: string;
  date: string;
  status: string;
  Medicines: Medicine[];
  _id: string;
}

const DrSelectedPrescription = () => {
  const { id } = useParams();
  const [prescription, setPrescription] = useState<Prescription>();

  

  
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

  const handleUpdate = () => {
    console.log('Update button clicked');
  };
  const handleDownload = () => {
    console.log('Download button clicked');
  };
  const formattedDate = prescription && new Date(prescription.date).toISOString().split('T')[0];

  
  return (
    <>
      <DrawerAppBar/>
      <Card variant="outlined" style={{ maxWidth: 600, margin: 'auto', marginTop: 50 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom color="primary" style={{ textAlign: 'center' }}>
            PRESCRIPTION DETAILS
          </Typography>

          {prescription ? (
            <Container>
              <Divider style={{ margin: '16px 0' }} />
              <Typography variant="body1" color="textSecondary" gutterBottom>
                <strong>Patient:</strong> {prescription.patientUsername}
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
                {prescription.Medicines && prescription.Medicines.map((medicine, index) => (
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

          <Divider style={{ margin: '8px 0' }} />

          <Grid container justifyContent="space-around">
            <Grid item>
            </Grid>
                <Grid item>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleUpdate}
                >
                    Update
                </Button>
                </Grid>
                <Grid item>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleDownload}
                >
                    Download
                </Button>
                </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );

};


export default DrSelectedPrescription;
