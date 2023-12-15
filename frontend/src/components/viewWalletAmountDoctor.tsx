import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import WalletIcon from "@mui/icons-material/Wallet";
const ViewWalletAmount: React.FC = () => {
  const [walletAmount, setWalletAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(true);
  const navigate = useNavigate(); // Open the dialog by default
  const handleViewWalletBalance = async () => {
    try {
      //const response = await axios.get(`/routes/patient/viewWalletAmount?patientUsername=${patientUsername}`);
      const token = localStorage.getItem("authToken");
      const authHeader = `Bearer ${token}`;
      const response = await axios.get(`/routes/doctors/viewWalletAmount`, {
        headers: {
          Authorization: authHeader,
        },
      });
      console.log("API Response:", response); // Log the entire response for debugging
      const { walletAmount } = response.data;
      console.log("Extracted Wallet Amount:", walletAmount); // Log the extracted walletAmount for debugging
      setWalletAmount(walletAmount);
      setError(null);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      console.error("Error Details:", error); // Log the specific error for debugging
      setWalletAmount(null);
      setError("Error fetching wallet balance. Please try again.");
    }
  };

  useEffect(() => {
    // Fetch wallet balance when the component mounts
    handleViewWalletBalance();
  }, []); // Trigger a fetch whenever the patientUsername changes
  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/doctor/home");
  };
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <WalletIcon sx={{ fontSize: 32, marginRight: 1 }} />
          <Typography variant="h6" color="primary">
            Wallet Balance
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        {walletAmount !== null && (
          <Typography variant="h4" color="textPrimary">
            ${walletAmount.toFixed(2)}
          </Typography>
        )}
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewWalletAmount;
