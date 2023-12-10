import { Button, Card, Container, Typography } from "@mui/material";

interface AppointmentProps {
  appointment: any;
  onStartChat: () => void;
}

const PatientAppointment = ({ appointment, onStartChat }: AppointmentProps) => {
  if (!appointment) {
    return null; // Or render an empty state or error message
  }
  const { status, doctor, date } = appointment;
  const appointmentDate = new Date(date).toISOString().split("T")[0];

  return (
    <Card style={{ padding: "20px", margin: "10px" }}>
      <Typography> Doctor: {doctor}</Typography>
      <Typography> Date: {appointmentDate}</Typography>
      <Typography> Status: {status}</Typography>
    </Card>
  );
};

export default PatientAppointment;
