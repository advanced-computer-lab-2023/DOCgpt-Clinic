import { Button, Card, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface AppointmentProps {
    appointment: any
}


const DoctorAppointment = ({ appointment }: AppointmentProps) => {
    const navigate = useNavigate();

    if (!appointment) {
        return null; // Or render an empty state or error message
    }
    const {status, patient, date, type} = appointment;
    const appointmentDate = new Date(date).toISOString().split('T')[0];

    const handleAppointmentCompleted = async () => {
        try {
            const token=localStorage.getItem("authToken")
            const response = await axios.patch(`/routes/appointments/completed`, {
              // Add any additional data you want to include in the request body
                status: status,
                patient: patient,
                date: date
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
        
            console.log('Appointment marked as completed:', response.data);
        } catch (error) {
            console.error('Error marking appointment as completed:', error);
        }
    } 

    const handleFollowUpClicked = () =>{
        localStorage.setItem("selectedPatient", patient);
        navigate("/doctor/followUp");
    }

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
                        <Button onClick={handleAppointmentCompleted}>
                            Completed
                        </Button>
                        <Button onClick={handleFollowUpClicked}>
                            Schedule Follow up
                        </Button>
                </Grid>
            </Grid>
        </Card>
    );

}

export default DoctorAppointment;