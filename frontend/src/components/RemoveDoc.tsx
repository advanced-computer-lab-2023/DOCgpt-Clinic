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

const DeleteDoctor: React.FC = () => {
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

  const handleDeleteDoctor = async () => {
    try {
      // Send a DELETE request to delete the doctor by username
      const response = await axios.delete('/routes/admins/deletedoc', {
        data: { username }, // Send the username in the request body
      });

      // Handle success
      if (response.status === 200) {
        setMessage('Doctor deleted successfully');
        setSnackbarOpen(true);
        handleClose();
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
      setMessage('Error deleting doctor');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="10vh">
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={handleOpen}
        sx={{ backgroundColor: '#1976D2', height: '48px', width: '150px' }} // Adjust height and width
      >
        Remove Doctor
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Remove Doctor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the username of the doctor you want to remove.
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
          <Button onClick={handleDeleteDoctor} color="secondary">
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

export default DeleteDoctor;
