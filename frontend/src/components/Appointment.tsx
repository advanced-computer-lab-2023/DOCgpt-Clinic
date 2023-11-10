import { Card, Container, Typography } from "@mui/material";


interface AppointmentProps {
    appointment: any
}


const Appointment = ({ appointment }: AppointmentProps) => {

    if (!appointment) {
        return null; // Or render an empty state or error message
    }
    const {status, patient, date} = appointment;
    const appointmentDate = new Date(date).toISOString().split('T')[0];

    return(
        <Card style={{padding: '20px', margin: '10px'}}>
            <Typography> Patient: {patient}</Typography>
            <Typography> Date: {appointmentDate}</Typography>
            <Typography> Status: {status}</Typography>
        </Card>
    );

}

export default Appointment;