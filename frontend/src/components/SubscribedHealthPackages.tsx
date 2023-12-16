import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  Grid,
} from '@mui/material';

interface ApiResponse {
  subscribedPackages: {
    name: string;
    startdate: string ;
    enddate: string ;
    status: 'subscribed' | 'unsubscribed' | 'cancelled with end date';
    payedBy: string;
  }[];
}

const SubscribedHealthPackages = () => {
  const [subscribedPackages, setSubscribedPackages] = useState<ApiResponse['subscribedPackages']>([]);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('/routes/viewSubscribedPackages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubscribedPackages(response.data.subscribedPackages);
    } catch (error) {
      console.error('Error fetching subscribed packages:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemoveSubscription = (packageName: string) => {
    setSelectedPackage(packageName);
    setConfirmationDialogOpen(true);
  };

  const handleCloseConfirmationDialog = () => {
    setSelectedPackage(null);
    setConfirmationDialogOpen(false);
  };

  const handleConfirmRemoveSubscription = async () => {
    try {
      const token = localStorage.getItem('authToken');
      console.log('Removing subscription for package:', selectedPackage);

      const apiResponse = await axios.patch(
        '/routes/cancelSubscription',
        { packageName: selectedPackage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Response from cancelSubscription:', apiResponse.data);

      // Refetch subscribed packages after removal
      fetchData();
    } catch (error) {
      console.error('Error removing subscription:', error);
    } finally {
      handleCloseConfirmationDialog();
    }
  };

  return (
    <Container>
   
    <Grid container spacing={2}>
      {Array.isArray(subscribedPackages) &&
        subscribedPackages.map((pkg, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Paper
              style={{
                padding: '20px',
                height: '250px',
                transition: 'box-shadow 0.3s',
                width: '100%', // Set the width to 100%
                overflow: 'hidden',
              }}
              sx={{
                '&:hover': {
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              <Typography variant="h2" color="text.secondary" gutterBottom>
             <strong> {pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1)} </strong>
            </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Status:</strong> {pkg.status}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Start Date:</strong> {pkg.startdate.split('T')[0]}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>End Date:</strong> {pkg.enddate.split('T')[0]}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveSubscription(pkg.name)}
                style={{ marginTop: '15px' }}
              >
                Unsubscribe
              </Button>
            </Paper>
          </Grid>
        ))}
    </Grid>

    {/* Confirmation Dialog */}
    <Dialog open={isConfirmationDialogOpen} onClose={handleCloseConfirmationDialog}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to cancel your subscription for "{selectedPackage}"?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirmRemoveSubscription} color="primary" autoFocus>
          Yes
        </Button>
        <Button onClick={handleCloseConfirmationDialog} color="primary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  </Container>
);
};

export default SubscribedHealthPackages;