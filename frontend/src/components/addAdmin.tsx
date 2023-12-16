import React, { useState } from "react";
import axios from "axios";
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
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone'; // Import the add person icon
import Alert from '@mui/material/Alert'; // Import Alert for displaying errors

const CreateAdminButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCreateAdmin = async () => {
    const token = localStorage.getItem("authToken");
    console.log(`Token: ${token}`); // Debug log
  
    if (!token) {
      setSnackbarMessage("Authentication token not found.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
  
    try {
      const response = await axios.post(
        "/routes/admins/addAdmin",
        { username, password, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbarMessage(`Admin '${username}' created successfully`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleClose();
    } catch (error: any) {
      console.error('Error creating admin:', error);
      if (error.response) {
        if (error.response.status === 409) {
          setSnackbarMessage("Username or email already in use.");
        } else {
          setSnackbarMessage("Username already taken.");
        }
      } else {
        setSnackbarMessage("Network error. Check your connection.");
      }
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="10vh"
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<PersonAddTwoToneIcon />}
        onClick={handleOpen} // This adds the icon to the button
      >
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
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateAdmin} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          severity={snackbarSeverity}
          sx={{ width: '100%', fontSize: '1.5rem' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateAdminButton;
