import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Snackbar,
  Box,
} from '@mui/material';

const RemoveAdmin: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleRemoveAdmin = async () => {
    try {
      // Send a DELETE request to delete the admin by username
      const response = await axios.delete('/routes/admins/delete', {
        data: { username }, // Send the username in the request body
      });

      // Handle success
      if (response.status === 200) {
        setMessage(`Admin '${username}' deleted successfully`);
        setSnackbarOpen(true);
        handleClose();
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      setMessage('Error deleting admin');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="10vh">
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleOpen}
        sx={{ backgroundColor: '#1976D2' }} // Match the color of the "Add Admin" button
      >
        Remove Admin
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Remove Admin</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the username of the admin you want to remove.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemoveAdmin} color="primary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={message}
      />
    </Box>
  );
};

export default RemoveAdmin;
