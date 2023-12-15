import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import FollowUpRequest from "../../components/FollowUpRequest";
import DoctorBar from "../../components/Doctor bar/doctorBar";
import El7a2niInfo from "../../components/El7a2ni-info";
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


    //VIEW
    return(
   
        <>
        <DoctorBar />
        <div
      
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '50vh',
        marginBottom:'100px',
        backgroundPosition: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Increased shadow values
      }}
    >   
        <Back/>
     <div
      style={{
        position: 'absolute', // Set position to absolute
        top: '35%', // Adjust top value to center vertically
        left: '50%', // Adjust left value to center horizontally
        transform: 'translate(-50%, -50%)', // Center the text
        textAlign: 'center', // Center text horizontally
        color: 'white', // Set text color
      }}
    >
      <h1> <strong>FOLLOW UP REQUESTS</strong></h1>
      {/* <p>Additional text content</p> */}
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
        <El7a2niInfo />
      
    </>

    );
}

export default ViewFollowUpRequests;