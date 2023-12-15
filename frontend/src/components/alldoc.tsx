import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  ListItem,
  ListItemText,
  Paper,
  ListItemIcon,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  ListItemSecondaryAction,
  IconButton,
  List,
  ListItemAvatar,
  TextField,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminBar from "./admin Bar/adminBar";
import El7a2niInfo from "./El7a2ni-info";
import SearchIcon from "@mui/icons-material/Search";
import Background from '../doctorss.jpeg';
import Back from "./backButton";

interface Doctor {
  _id: string;
  username: string;
  name: string;
  email: string;
  // Add other fields as needed
}

const DocList1: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleOpenDeleteDialog = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteDoctor = async () => {
    if (selectedDoctor) {
      // Perform the deletion operation here with axios
      try {
        const token = localStorage.getItem("authToken");
        await axios.patch("/routes/doctors/removedoc", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { username: selectedDoctor.username },
        });
        // Filter out the deleted doctor from the doctors list
        setDoctors((prevDoctors) =>
          prevDoctors.filter(
            (doctor) => doctor.username !== selectedDoctor.username
          )
        );
        setOpenDialog(false);
      } catch (error) {
        console.error("Error removing doctor:", error);
      }
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/routes/doctors/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching accepted doctors:", error);
      }
    };
  
    fetchDoctors();
  }, []);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const filteredPharmacists = doctors.filter((doctor) =>
    doctor.username.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <>
      <AdminBar />
      <div
      
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '50vh',
        marginBottom:'100px',
        backgroundPosition: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Increased shadow values
      }}
    >   
        <Back/>
     <div
      style={{
        position: 'absolute', // Set position to absolute
        top: '35%', // Adjust top value to center vertically
        left: '50%', // Adjust left value to center horizontally
        transform: 'translate(-50%, -50%)', // Center the text
        textAlign: 'center', // Center text horizontally
        color: 'white', // Set text color
      }}
    >
      <h1> <strong>DOCTORS LIST</strong></h1>
      {/* <p>Additional text content</p> */}
    </div>
    </div>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search by username"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              width: '250px',
              borderRadius: '20px',
              backgroundColor: '#fff',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <List>
        <Grid container spacing={2}>
          {filteredPharmacists.map((doctor) => (
             <Grid item xs={42} sm={16} md={13} key={doctor._id}>
             <Paper elevation={14} style={{ marginBottom: 18, width: '100%' }}>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <Avatar><PersonIcon /></Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={doctor.username}
                    secondary={`Email: ${doctor.email}`}
                  />
                  <Button
                    onClick={() => handleOpenDeleteDialog(doctor)}
                    variant="contained"
                    size="small"
                    style={{
                      marginLeft: "auto",
                      bottom:-12,
                      marginRight: 2,
                      backgroundColor: "#primary",
                      color: "#primary" 
                    }}
                  >
                    <DeleteIcon style={{ color: "#primary" }} /> 
                  </Button>
                </ListItem>
              </Paper>
            </Grid>
          ))}
        </Grid>
        </List>
        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Delete Doctor</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete doctor {selectedDoctor?.name}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDoctor} color="primary">
              Delete
            </Button>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <El7a2niInfo/>
    </>
  );
};

export default DocList1;
