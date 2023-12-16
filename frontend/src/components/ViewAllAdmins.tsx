import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  ListItemIcon,
  Avatar,
  Paper,
  Grid,
  Button, // Import Button from @mui/material
  Dialog, // Import Dialog from @mui/material
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Snackbar,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone'; // Import the add person icon
import CreateAdminButton from './addAdmin'; // Update the path as necessary
import El7a2niAdminInfo from "./El7a2niAdmin-info";

interface Admin {
  _id: string;
  username: string;
  email: string;
  // Add other fields as needed
}

const AdminList: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null); // Track the selected admin for removal
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/routes/admins/viewAdmin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdmins(response.data.admins);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  const handleRemoveAdmin = (admin: Admin) => {
    setSelectedAdmin(admin);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedAdmin(null);
    setOpenDialog(false);
  };

  const handleConfirmRemove = async () => {
    if (selectedAdmin) {
      try {
        const response = await axios.delete('/routes/admins/delete', {
          data: { username: selectedAdmin.username },
        });

        if (response.status === 200) {
          // Handle successful removal here (e.g., update the admins list)
          const updatedAdmins = admins.filter((admin) => admin._id !== selectedAdmin._id);
          setAdmins(updatedAdmins);
        }
      } catch (error) {
        console.error('Error deleting admin:', error);
      }

      handleCloseDialog();
    }
  };

  return (
    <>
    <Container maxWidth="sm">
    
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="h4" align="center" style={{ padding: '20px' }} gutterBottom>
          Admins List
        </Typography>
        <CreateAdminButton /> {/* This will render the "Add Admin" button */}
      </Box>
      <Grid container spacing={2}>
        {admins.map((admin, index) => (
          <Grid item xs={42} sm={16} md={13} key={admin._id}>
                 <Paper elevation={14} style={{ marginBottom: 18, width: '100%' }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <ListItem alignItems="flex-start" style={{ flexGrow: 1 }}>
                <ListItemIcon>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={admin.username}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                      >
                        Email: {admin.email}
                      </Typography>
                    </>
                  }
                />
                 </ListItem>
                 <Button
  onClick={() => handleRemoveAdmin(admin)}
  variant="contained"
  size="small"
  style={{
    marginLeft: "auto",
    marginRight: 16,
    backgroundColor: "#primary",
    color: "#primary" 
  }}
>
  <DeleteIcon style={{ color: "#primary" }} /> 
</Button>

              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Remove Admin</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove admin {selectedAdmin?.username}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
       
          <Button onClick={handleConfirmRemove} color="primary">
            Remove
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    <El7a2niAdminInfo/>
    </>
  );
};

export default AdminList;
