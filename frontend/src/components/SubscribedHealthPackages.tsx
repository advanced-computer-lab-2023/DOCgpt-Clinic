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
    startdate?: string | Date;
    enddate?: string | Date;
    status: 'subscribed with renewal date' | 'unsubscribed' | 'cancelled with end date';
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
    <Typography color="primary" style={{ textAlign: 'center'}} variant="h4" gutterBottom>
      My Subscribed Packages
    </Typography>
    <Grid container spacing={2}>
      {Array.isArray(subscribedPackages) && subscribedPackages.map((pkg, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6">Package Name: {pkg.name}</Typography>
            <Typography>Status: {pkg.status}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleRemoveSubscription(pkg.name)}
            >
              Remove Subscription
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