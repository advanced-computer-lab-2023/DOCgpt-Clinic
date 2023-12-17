import { Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EventIcon from "@mui/icons-material/Event";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Container } from '@mui/system';

interface Timeslot {
    date: Date;
    // Add other properties as needed
  }

  interface DoctorTimeSlotProps {
    timeslot: Timeslot
  }

  
// Define a functional component that takes props
const DoctorTimeSlot = ({ timeslot }: DoctorTimeSlotProps) => {
  // Access props values
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [severity, setseverity] = React.useState<"success" | "error">(
    "success"
); 

  const removeTimeSlotFromDatabase = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.patch(
        '/routes/doctors/removetimeslot',
        {
          dates: [timeslot.date],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        console.log("to be deleted",timeslot.date);
        
      console.log('Time slots are deleted:', response.data);
        // Check the response and update the snackbar accordingly
       
          setSnackbarMessage("Time Slot Deleted Successfully");
          setseverity("success");
          setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding time slots:', error);
      setSnackbarMessage("An error occurred");
      setseverity("error");

          setSnackbarOpen(true);
    }
  };
  
  const handleCancelConfirmation = () =>{
    removeTimeSlotFromDatabase();
  }
  const handleDelete = () => {
    setDialogOpen(true);
  };

  const handleCancelCancel = () => {
    setDialogOpen(false);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    window.location.reload();
  };
  const token = localStorage.getItem("authToken");
  if (!token) {
    return (
      <div>
        <Typography component="h1" variant="h5">
          access denied
        </Typography>
      </div>
    );
  }
  return (
    <Container>
      <Grid container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Grid item xs={10}>
                    {/* Calendar Icon */}
                    <Typography variant="h3" style={{display:'flex', alignItems: 'center'}}>
                    <EventIcon style={{ marginRight: "8px"}} />{" "}
                    <span style={{marginRight: "10px"}}>
                    {` ${new Date(timeslot.date).toLocaleString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        })}`}
            {" "}

                    </span>
                    <span style={{ fontWeight: "bold" }}>
                          {new Date(timeslot.date).getHours() === 14
                            ? new Date(timeslot.date).getHours() - 2
                            : new Date(timeslot.date).getHours() === 13 
                            ? new Date(timeslot.date).getHours() - 2
                            : new Date(timeslot.date).getHours() > 12 
                            ? new Date(timeslot.date).getHours() - 14
                            : new Date(timeslot.date).getHours() === 0
                            ? new Date(timeslot.date).getHours() + 10
                            : new Date(timeslot.date).getHours() === 1
                            ? new Date(timeslot.date).getHours() + 10
                            : new Date(timeslot.date).getHours() === 2
                            ? new Date(timeslot.date).getHours() + 10
                            : new Date(timeslot.date).getHours() - 2}
                          {":"}
                          {new Date(timeslot.date).getMinutes() < 10
                            ? new Date(timeslot.date)
                                .getMinutes()
                                .toString()
                                .padStart(2, "0")
                            : new Date(timeslot.date).getMinutes()}{" "}
                          {new Date(timeslot.date).getHours() === 0? "PM"
                          :new Date(timeslot.date).getHours() === 1? "PM"
                          :new Date(timeslot.date).getHours() >= 14 ? "PM" : "AM"}
                        </span>
                
                    </Typography>
                  </Grid>

                  <Grid item xs={2}>
                <IconButton onClick={handleDelete}>
                < DeleteRoundedIcon color='primary' />{" "}
                </IconButton>

                  </Grid>
                </Grid>

                <Dialog open={isDialogOpen} onClose={handleCancelCancel}>
                  <DialogTitle>Confirmation</DialogTitle>
                  <DialogContent>
                    <Typography>Are you sure you want to Delete this time slot?</Typography>
                    <Typography variant="h3" style={{ fontWeight: "bold" }} gutterBottom>
                        {` ${new Date(timeslot.date).toLocaleString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        })}`}
                        {" "}
              {(new Date(timeslot.date).getHours() > 12)? new Date(timeslot.date).getHours() - 14
              : (new Date(timeslot.date).getHours() === 2 )? new Date(timeslot.date).getHours() + 10
              : new Date(timeslot.date).getHours() - 2
              } 
            {":"}
            {(new Date(timeslot.date).getMinutes()<10)? new Date(timeslot.date).getMinutes().toString().padStart(2, '0') : new Date(timeslot.date).getMinutes()}
            {" "}
            {new Date(timeslot.date).getHours() >= 12 ? "PM" : "AM"}
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleCancelConfirmation}>Yes</Button>
                    <Button onClick={handleCancelCancel}>No</Button>
                  </DialogActions>
                </Dialog>

                <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity={severity} onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DoctorTimeSlot;
