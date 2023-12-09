import { Button, Card, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface AppointmentProps {
  appointment: any;
  onStartChat: () => void;
}

const PatientAppointment = ({ appointment, onStartChat }: AppointmentProps) => {
  const navigate = useNavigate();
  if (!appointment) {
    return null; // Or render an empty state or error message
  }
  const { status, doctor, date, _id , scheduledBy, type , paid} = appointment;
  const appointmentDate = new Date(date).toISOString().split("T")[0];
  const isPaid = paid? "Yes ;)" : "No :(";

  const handleAppointmentReschedule = () => {
      localStorage.setItem("selectedAppointmentId", _id);
      localStorage.setItem("selectedDoctor", doctor);
      //create a route in app && a page in patient folder
      navigate("/patient/reschedule");
  } 

  const handleFollowUpClicked = () =>{
      localStorage.setItem("selectedAppointmentId", _id);
      localStorage.setItem("selectedDoctor", doctor);
      //create a route in app && a page in patient folder
      navigate("/patient/followUp");
  }
  const handleCancel = () =>{
      
  }

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
        <Grid item xs={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <Button variant="contained" color="primary" onClick={onStartChat}>
            Start Chat
          </Button>
          <Button onClick={handleAppointmentReschedule}>
              Reschedule
          </Button>
          <Button onClick={handleFollowUpClicked}>
              Request Follow up
          </Button>
          <Button onClick={handleCancel}>
              Cancel
          </Button>
        </Grid>
      </Grid>

    </Card>
  );
};

export default PatientAppointment;
