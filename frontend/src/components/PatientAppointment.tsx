import { Alert, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Snackbar, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AppointmentProps {
  appointment: any;
  onStartChat: () => void;
}

const PatientAppointment = ({ appointment, onStartChat }: AppointmentProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigate = useNavigate();
  if (!appointment) {
    return null; // Or render an empty state or error message
  }
  const { status, doctor, date, _id, scheduledBy, type, paid } = appointment;
  const appointmentDate = new Date(date).toISOString().split("T")[0];
  const isPaid = paid ? "Yes ;)" : "No :(";

  const handleAppointmentReschedule = () => {
    localStorage.setItem("selectedAppointmentId", _id);
    localStorage.setItem("selectedDoctor", doctor);
    // create a route in app && a page in patient folder
    navigate("/patient/reschedule");
  };

  const handleFollowUpClicked = () => {
    localStorage.setItem("selectedAppointmentId", _id);
    localStorage.setItem("selectedDoctor", doctor);
    // create a route in app && a page in patient folder
    navigate("/patient/followUp");
  };

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
        "/routes/appointments/cancelAppointment",
        {
          doctorUsername: appointment.doctor,
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
    <Card style={{ padding: "20px", margin: "10px" }}>
      <Grid container>
        <Grid item xs={6}>
          {/* INFO */}
          <Typography> Doctor: {doctor}</Typography>
          <Typography> Date: {appointmentDate}</Typography>
          <Typography> Status: {status}</Typography>
          <Typography> Type: {type}</Typography>
          <Typography> Scheduled By: {scheduledBy}</Typography>
          <Typography> Paid: {isPaid}</Typography>
        </Grid>
        {/* BUTTONS */}
        <Grid item xs={6} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button variant="contained" color="primary" onClick={onStartChat}>
            Start Chat
          </Button>
          <Button onClick={handleAppointmentReschedule}>Reschedule</Button>
          <Button onClick={handleFollowUpClicked}>Request Follow up</Button>
          <Button onClick={handleCancel} disabled={status === "cancelled"}>
            Cancel
          </Button>
        </Grid>
      </Grid>

      {/* Confirmation Dialog */}
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
};

export default PatientAppointment;
