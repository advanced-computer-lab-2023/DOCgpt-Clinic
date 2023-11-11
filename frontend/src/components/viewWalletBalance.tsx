import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography } from '@mui/material';

interface ViewMyWalletAmount {
  patientUsername: any;
}

const ViewWalletBalance: React.FC<ViewMyWalletAmount> = ({ patientUsername }) => {
  const [walletAmount, setWalletAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleViewWalletBalance = async () => {
    try {
      const response = await axios.get(`/routes/patient/viewWalletAmount?patientUsername=${patientUsername}`);
      console.log('API Response:', response); // Log the entire response for debugging
      const { walletAmount } = response.data;
      console.log('Extracted Wallet Amount:', walletAmount); // Log the extracted walletAmount for debugging
      setWalletAmount(walletAmount);
      setError(null);
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      console.error('Error Details:', error); // Log the specific error for debugging
      setWalletAmount(null);
      setError('Error fetching wallet balance. Please try again.');
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleViewWalletBalance}>
        View Wallet Balance
      </Button>
      {walletAmount !== null && (
        <Typography>
          Wallet Balance: ${walletAmount.toFixed(2)} {/* Assuming walletAmount is a number */}
        </Typography>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
};

export default ViewWalletBalance;
