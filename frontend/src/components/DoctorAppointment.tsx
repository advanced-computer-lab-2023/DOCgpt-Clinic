import { Alert, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Snackbar, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import DoctorIcon from '@mui/icons-material/LocalHospital';  // Replace with the actual MUI Doctor icon
import PatientIcon from '@mui/icons-material/Person';        // Replace with the actual MUI Person icon

interface AppointmentProps {
    appointment: any
}


const DoctorAppointment = ({ appointment }: AppointmentProps) => {
    const navigate = useNavigate();
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    if (!appointment) {
        return null; // Or render an empty state or error message
    }
    const {status, patient, date, type, _id, doctor, scheduledBy} = appointment;
    const appointmentDate = new Date(date).toISOString().split('T')[0];

    const handleAppointmentReschedule = () => {
        localStorage.setItem("selectedAppointmentId", _id);
        localStorage.setItem("oldDate", date);
        navigate("/doctor/reschedule");
    } 

    const handleFollowUpClicked = () =>{
        localStorage.setItem("selectedPatient", patient);
        navigate("/doctor/followUp");
    }
    const handleCancel = () => {
        if (status !== "cancelled") {
          setDialogOpen(true);
        }
      };
    
      const handleCancelConfirmation = async () => {
        setDialogOpen(false);
    
        try {
          // Make the backend request using Axios
          const token = localStorage.getItem("authToken");
          const response = await axios.post(
            "/routes/appointments/cancelAppointmentDoc",
            {
              patientUsername: appointment.patient,
              date: appointment.date,
              price: appointment.price,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

    
          // Check the response and update the snackbar accordingly
          if (response.status === 201) {
            setSnackbarMessage("Appointment Cancelled");
            setSnackbarOpen(true);
          } else {
            setSnackbarMessage("Error cancelling appointment");
            setSnackbarOpen(true);
          }
        } catch (error) {
          setSnackbarMessage("An error occurred");
          setSnackbarOpen(true);
        }
      };
    
      const handleCancelCancel = () => {
        setDialogOpen(false);
      };
    
      const handleSnackbarClose = () => {
        setSnackbarOpen(false);
      };
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(appointment.date));
    
    return(
      <Card style={{padding:"10px", margin: "10px" , height: '250px', width: '600px'}}>
        <Container style={{display: "flex", justifyContent: "center"}}>
          <Stack spacing={2}>
            <Container>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {status === "completed" ? (
                <TaskAltRoundedIcon color="success" style={{ marginBottom: "5px", marginRight: "5px" }} />
              ) : status === "cancelled" ? (
                <BlockRoundedIcon color="error" style={{ marginBottom: "5px", marginRight: "5px" }} />
              ) : status === "upcoming" ? (
                <NotificationsActiveRoundedIcon color="info" style={{ marginBottom: "5px", marginRight: "5px" }} />
              ) : (
                <RestoreRoundedIcon color="info" style={{ marginBottom: "5px", marginRight: "5px" }} />
              )}
            <Typography variant="h3" style={{ fontWeight: "bold" }} gutterBottom>
            {formattedDate}
                </Typography>
            </div>

            <Typography style={{ fontWeight: "bold" , textAlign: "center"}}> With {patient}</Typography>
              <Typography display="flex" alignItems="center">
              Status: {status}
            </Typography>
            <Typography> {type} Appointment</Typography>
              {/* <Typography>{isPaid}</Typography> */}
              <div style={{display: 'flex', alignItems: 'center'}}>
              {scheduledBy === doctor ? (
                <Typography> Scheduled by you</Typography>
              ): <Typography>Scheduled by {' '} {scheduledBy}</Typography>}
              {scheduledBy === doctor ? (
                <DoctorIcon color="primary" />
              ) : (
                <PatientIcon color="primary" />
              )}
              
              </div>
            </Container>
            
          <Container style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
  <Button
    onClick={handleAppointmentReschedule}
    variant="contained"
    disabled={status === "cancelled"}
    color="primary"
    style={{ marginRight: "10px", borderRadius: "25px" }}
  >
    Reschedule
  </Button>
  <Button
    onClick={handleFollowUpClicked}
    variant="outlined"
    disabled={status === "cancelled"}
    color="primary"
    style={{ marginRight: "10px", borderRadius: "25px" }}
  >
    Schedule Follow up
  </Button>
  <Button
    onClick={handleCancel}
    disabled={status === "cancelled"}
    variant="contained"
    style={{
      backgroundColor: status === "cancelled" ? "#CCCCCC" : "#FF5252",
      borderRadius: "25px",
    }}
  >
    {status === "cancelled" ? "Cancelled" : "Cancel"}
  </Button>
          </Container>

          </Stack>
        </Container>

      <Dialog open={isDialogOpen} onClose={handleCancelCancel}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to cancel this appointment?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelConfirmation}>Yes</Button>
          <Button onClick={handleCancelCancel}>No</Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar */}
      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity="success" onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
        </Card>
    );

}

export default DoctorAppointment;