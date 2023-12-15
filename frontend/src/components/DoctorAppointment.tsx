import { Alert, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Snackbar, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DrawerAppBar from '../components/Doctor bar/doctorBar';
import El7a2niInfo from '../components/El7a2ni-info';



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

      return (
        
        <Card style={{ padding: '20px', margin: '10px' }}>
          <Grid container spacing={2}>
            {/* Patient Information */}
            <Grid item xs={6}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                <strong> Patient: </strong> {patient}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                <strong>Date: </strong> {appointmentDate}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                <strong> Status: </strong> {status}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                <strong>Type: </strong> {type}
              </Typography>
            </Grid>
      
            {/* Buttons */}
            <Grid item xs={6}>
              <Grid container direction="column" alignItems="flex-end">
                <Button onClick={handleAppointmentReschedule} style={{ margin: '10px' }}>
                  Reschedule
                </Button>
                <Button onClick={handleFollowUpClicked} style={{ margin: '10px' }}>
                  Schedule Follow up
                </Button>
                <Button onClick={handleCancel} disabled={status === "cancelled"} style={{ margin: '10px' }}>
                  Cancel
                </Button>
              </Grid>
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