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
    const handleCancel = () =>{
        
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
                        <Button onClick={handleAppointmentReschedule}>
                            Reschedule
                        </Button>
                        <Button onClick={handleFollowUpClicked}>
                            Schedule Follow up
                        </Button>
                        <Button onClick={handleCancel}>
                            Cancel
                        </Button>
                </Grid>
            </Grid>
        </Card>
    );

}

export default DoctorAppointment;