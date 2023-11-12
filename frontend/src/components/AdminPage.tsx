import React, { useState } from "react";
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
} from "@mui/material";

const RegisterAdmin: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('/routes/addAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setMessage('Admin registered successfully');
        setSnackbarMessage('Admin registered successfully');
        setSnackbarOpen(true);
      } else {
        const data = await response.json();
        setMessage(data.error);
        setSnackbarMessage('Error registering admin');
        setSnackbarOpen(true);
      }
    } catch (error) {
      setMessage('Internal server error');
      setSnackbarMessage('Internal server error');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="10vh">
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Admin
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Admin</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the username and password for the new admin.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRegister} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
      <div>{message}</div>
    </Box>
  );
};

export default RegisterAdmin;
