import { Alert, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Snackbar, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


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
    const {status, patient, date, type, _id} = appointment;
    const appointmentDate = new Date(date).toISOString().split('T')[0];

    const handleAppointmentReschedule = () => {
        localStorage.setItem("selectedAppointmentId", _id);
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

    return(
        <Card style={{padding: '20px', margin: '10px'}}>
            <Grid container>
                <Grid item xs={6}>
                    <Typography> Patient: {patient}</Typography>
                    <Typography> Date: {appointmentDate}</Typography>
                    <Typography> Status: {status}</Typography>
                    <Typography> Type: {type}</Typography>
                </Grid>
                <Grid item xs={6} style={{display:'flex', justifyContent:'end', alignItems:'center'}}>
                        <Button onClick={handleAppointmentReschedule}>
                            Reschedule
                        </Button>
                        <Button onClick={handleFollowUpClicked}>
                            Schedule Follow up
                        </Button>
                        <Button onClick={handleCancel} disabled={status === "cancelled"}>
            Cancel
          </Button>

                </Grid>
            </Grid>
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