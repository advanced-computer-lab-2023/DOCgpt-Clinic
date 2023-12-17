import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import FollowUpRequest from "../../components/FollowUpRequest";
import DoctorBar from "../../components/Doctor bar/doctorBar";
import El7a2niDocInfo from "../../components/El7a2niDoc-info";
import Background from '../../Appointments.jpeg';
import Back from "../../components/backButton";

function ViewFollowUpRequests(){
    // LOGIC
    const [requests, setRequests] = useState<any[]>([]);

    useEffect(() => {
        const fetchRequests = async () => {
            console.log('Fetching Requests...');
            try {
                const token=localStorage.getItem("authToken")
                const response = await axios.get(`/routes/doctors/viewRequests`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            if(response){
                console.log('Response:', response);
                const data = await response.data.requests;
                setRequests(data);
            }
            else {
                console.error('Failed to fetch doctor data');
            }
            } catch (error) {
            console.error('Error:', error);
            }
        };
        fetchRequests();
    }, []);

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
    //VIEW
    return(
   
        <>
        <DoctorBar />
        <div
      style={{
        position: 'relative',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '50vh',
        marginBottom: '100px',
        backgroundPosition: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Transparent overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      ></div>

      <Back />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h1>
          <strong>FOLLOW UP REQUESTS</strong>
        </h1>
      </div>
    </div>
        <Container>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        </div>
        
            <Grid container direction="row">
            {requests && requests.map((request, index) => (
            <Grid item xs={6}>

            <FollowUpRequest key={index} request={request} />
            </Grid>
            ))}

            </Grid>

            
        </Container>
        <El7a2niDocInfo />
      
    </>

    );
}

export default ViewFollowUpRequests;