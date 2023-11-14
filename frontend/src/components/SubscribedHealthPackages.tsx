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
} from '@mui/material';

interface ApiResponse {
  subscribedPackages: {
    name: string;
    startdate?: string | Date;
    enddate?: string | Date;
    status: 'subscribed with renewal date' | 'unsubscribed' | 'cancelled with end date';
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
    <div>
      <Typography color="primary" style={{ textAlign: 'center'}} variant="h4" gutterBottom>
        Subscribed Packages
      </Typography>
      {subscribedPackages.length > 0 ? (
        <Paper elevation={3} style={{ padding: '10px' }}>
          <List>
            {subscribedPackages.map((pkg, index) => (
              <ListItem key={index}>
                <ListItemText primary={pkg.name} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleRemoveSubscription(pkg.name)}
                >
                  Remove Subscription
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography variant="body1">No subscribed packages found.</Typography>
      )}

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
    </div>
  );
};

export default SubscribedHealthPackages;