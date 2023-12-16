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
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";

import SearchIcon from "@mui/icons-material/Search";
import AdminBar from "./admin Bar/adminBar";
import El7a2niInfo from "./El7a2ni-info";
import Background from '../patient.jpeg';
import Back from "./backButton";

interface Patient {
  _id: string;
  username: string;
  name: string;
  email: string;
  dateofbirth: string;
  mobilenumber: string;
  emergencyContact: {
    fullName: string;
    mobileNumber: string;
    relation: string;
  };
  // Add other fields as needed
}

const PatientList1: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredPatients = searchTerm
    ? patients.filter((patient) =>
        patient.username.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
    : patients;

  const handleOpenDeleteDialog = (username: string) => {
    setSelectedUsername(username);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = (username: string) => {
    console.log(username, 'heree');
    setSelectedUsername(username); // Store the username of the patient to be deleted
    setOpenDialog(true);
  };

  const backdropStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Adjust the alpha value (0.2) as needed
  };

  const handleRemovePatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedPatient(null);
    setOpenDialog(false);
  };

  const handleDeletePatient = async () => {
    console.log("Deleting patient:", selectedPatient);
  
    if (selectedPatient) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete("/routes/admins/deletepatient", {          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { username: selectedPatient?.username },
        });
        // Filter out the deleted patient from the patients list
        setPatients((prevPatients) =>
          prevPatients.filter(
            (patient) => patient.username !== selectedPatient?.username
          )
        );
        // Close the delete dialog and show the success message
        setOpenDeleteDialog(false);
        setOpenSuccessDialog(true);
        // Close the confirmation dialog as well
        setOpenDialog(false);
      } catch (error) {
        console.error("Error removing patient:", error);
        // Optionally, handle the error by displaying an error message to the user
        // e.g., setOpenErrorMessage(true);
      }
    }
  };
  

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/routes/patient/getP", {          headers: {
            Authorization:` Bearer ${token}`,
          },
        });

        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching pharmacists:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleCloseSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <AdminBar />
      <div
      style={{
        position: 'relative',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '50vh',
        marginBottom: '100px',
        backgroundPosition: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Transparent overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      ></div>

      <Back />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h1>
          <strong>PATIENT LIST</strong>
        </h1>
      </div>
    </div>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
          {/* Search bar on the right */}
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search by username"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              width: 250, // Adjust the width as needed
              borderRadius: '20px',
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
      <Grid container spacing={2}>
      {filteredPatients.map((patient) => {
            // Format the date of birth
            const formattedDateOfBirth = patient.dateofbirth ?
              new Date(patient.dateofbirth).toLocaleDateString('en-CA') : 'Unknown';
  
            return (
              <Grid item xs={42} sm={16} md={13} key={patient._id}>
                <Paper elevation={14} style={{ marginBottom: 18, width: '100%' }}>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <Avatar><PersonIcon /></Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={patient.username}
                      secondary={
                        <>
                          Email: {patient.email}
                          <br />
                          Date of Birth: {formattedDateOfBirth}
                          <br />
                          Mobile Number: {patient.mobilenumber}
                          <br />
                          Emergency Contact: {patient.emergencyContact ?` ${patient.emergencyContact.fullName} ( ${patient.emergencyContact.relation})` : 'Not available'}
                          <br />
                          Emergency Contact Number: {patient.emergencyContact ? patient.emergencyContact.mobileNumber : 'Not available'}
                        </>
                      }
                    />
                <Button
                  onClick={() => handleRemovePatient(patient)}
                 variant="contained"
                    size="small"
                    style={{
                      marginLeft: "auto",
                      bottom:-50,
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
       );
    })}
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Patient</DialogTitle>
        <DialogContent>
        <DialogContentText>
  Are you sure you want to delete patient {selectedPatient?.name}?
</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeletePatient} color="primary">
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


export default PatientList1;