import { Button, Card, Container, Grid, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface RequestProps {
    request: any
}

const FollowUpRequest = ({ request }: RequestProps) => {
    if (!request) {
        return null; // Or render an empty state or error message
    }
    const {Appointmentstatus, patient, AppointmentDate, type, price, paid, followUpDate, _id, status} = request;
    
    const isPaid = paid? "Yes ": "No ";

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
    const token = localStorage.getItem("authToken");
    if (!token) {
      return (
        <div>
          <Typography component="h1" variant="h5">
            access denied
          </Typography>
        </div>
      );
    }
    return (
        
        <Container>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ padding: '20px', margin: '10px', height: '300px' }}>
              <Grid container direction="column">
                <Grid item xs={12}>
                  <Typography variant="h3" color="primary" marginBottom="10px"> <strong>Old Appointment:</strong></Typography>
                  <Typography variant="h6" color="text.secondary"><strong>With Patient:</strong>  {patient}</Typography>
                  <Typography variant="h6" color="text.secondary"> {oldAppointmentDate}</Typography>
                  <Typography variant="h6" color="text.secondary"><strong>Status:</strong>  {Appointmentstatus}</Typography>
                  <Typography variant="h6" color="text.secondary" marginBottom="30px"> {type} Appointment </Typography>
      
                  <Typography variant="h3" color="primary" marginBottom="10px"> <strong>Request:</strong></Typography>
                  <Typography variant="h6" color="text.secondary"><strong>{requestedfollowUpDate} </strong>  </Typography>
                  <Typography variant="h6" color="text.secondary"><strong>Status: </strong>  {status}</Typography>
                </Grid>
                <Grid item xs={12} style={{ marginBottom:'40px', marginRight: '40px', display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={handleAccept} style={{ color: '#009688', marginRight: '10px', fontSize: '3rem'}}>
                    <CheckIcon style={{ fontSize: '2rem' }} />
                  </IconButton>
                  <IconButton onClick={handleReject} style={{ color: 'red', marginRight: '10px', fontSize: '3rem' }}>
                    <CloseIcon style={{ fontSize: '2rem' }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Card>
          </div>
        </Container>
      );
      
}

export default FollowUpRequest;