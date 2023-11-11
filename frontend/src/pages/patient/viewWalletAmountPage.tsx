import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ViewWalletBalance from '../../components/viewWalletBalance';
import Typography from '@mui/material/Typography';
import WalletIcon from '@mui/icons-material/Wallet';

const ViewWalletAmountPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [walletAmount, setWalletAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchWalletBalance = async () => {
  //     try {
  //       const response = await fetch(`/routes/patient/viewWalletAmount?patientUsername=${username}`);
  //       const data = await response.json();
  //       console.log('Data received:', data); // Log the data received from the backend
  //       setWalletAmount(data.walletAmount);
  //       setError(null);
  //     } catch (error: any) {
  //       console.error('Error fetching wallet balance:', error);
  //       console.error('Error response:', error.response); // Log the response details
  //       setWalletAmount(null);
  //       setError('Error fetching wallet balance. Please try again.');
  //     }
  //   };
  
  //   fetchWalletBalance();
  // }, [username]);
  

  const pageStyle: React.CSSProperties = {
    textAlign: 'center',
    marginTop: '50px',
  };

  const backButtonStyle: React.CSSProperties = {
    display: 'block',
    margin: '20px auto',
    padding: '10px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '16px',
  };

  return (
    <div style={pageStyle}>
      <Link to={`/patient/home/${username}`} style={backButtonStyle}>
        Back to Patient Home
      </Link>

      <div>
        {/* Wallet icon */}
        <WalletIcon style={{ fontSize: 50, color: 'black' }} />
      </div>

      <div>
        <Typography variant="h5">Current Balance</Typography>
        <ViewWalletBalance patientUsername={username} />
      </div>

      {walletAmount !== null && !isNaN(walletAmount) && (
        <Typography variant="h6">Wallet Balance: ${walletAmount.toFixed(2)}</Typography>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
};

export default ViewWalletAmountPage;
