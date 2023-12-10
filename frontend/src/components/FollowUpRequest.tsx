import { Button, Card, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface RequestProps {
    request: any
}

const FollowUpRequest = ({ request }: RequestProps) => {
    if (!request) {
        return null; // Or render an empty state or error message
    }
    const {Appointmentstatus, patient, AppointmentDate, type, price, paid, followUpDate, _id, status} = request;
    
    const isPaid = paid? "Yes ;)": "No :(";

    const oldAppointmentDate = new Date(AppointmentDate).toISOString().split('T')[0];

    const requestedfollowUpDate = new Date(followUpDate).toISOString().split('T')[0];

    const handleAccept = () => {
        //call accept doctors backend
        acceptRequest();
    } 
    const acceptRequest = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.patch('/routes/doctors/acceptFollowUpRequest', {
                requestId: _id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            
        } catch (error) {
            console.error('Error fetching timeslots:', error);
        }
    };

    const handleReject = () =>{
        //call reject doctor backend
        rejectRequest();
    }
    const rejectRequest = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.patch('/routes/doctors/rejectRequest', {
                requestId: _id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            
        } catch (error) {
            console.error('Error fetching timeslots:', error);
        }
    };

    return(
        <Card style={{padding: '20px', margin: '10px'}}>
            <Grid container>
                <Grid item xs={6}>
                    <Typography > <strong>Old Appointment:</strong></Typography>
                    <Typography> With Patient: {patient}</Typography>
                    <Typography> Date: {oldAppointmentDate}</Typography>
                    <Typography> Status: {Appointmentstatus}</Typography>
                    <Typography> Type: {type}</Typography>
                    <Typography> Paid: {isPaid}</Typography>


                    <Typography> <strong>Request:</strong></Typography>
                    <Typography> On Date: {requestedfollowUpDate}</Typography>
                    <Typography> Status: {status}</Typography>

                </Grid>
                <Grid item xs={6} style={{display:'flex', justifyContent:'end', alignItems:'center'}}>
                        <Button onClick={handleAccept}>
                            Accept
                        </Button>
                        <Button onClick={handleReject}>
                            Reject
                        </Button>
                </Grid>
            </Grid>
        </Card>
    );

}

export default FollowUpRequest;