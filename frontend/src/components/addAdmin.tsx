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

const CreateAdminButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleCreateAdmin = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "/routes/admins/addAdmin",
        {
          username,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSnackbarMessage(`Admin '${username}' created successfully`);
      setSnackbarOpen(true);
      handleClose();
    } catch (error) {
      setSnackbarMessage("Error creating admin");
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
        size="large"
        onClick={handleOpen}
        sx={{ backgroundColor: '#1976D2', width: '150px' }} // Match the color of the "Add Admin" button
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
        message={snackbarMessage}
      />
    </Box>
  );
};

export default CreateAdminButton;