import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import FollowUpRequest from "../../components/FollowUpRequest";
import DoctorBar from "../../components/Doctor bar/doctorBar";
import El7a2niInfo from "../../components/El7a2ni-info";
import Background from "../../Background.jpeg";

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
    <div
        style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: "cover",
            minHeight: "100vh",
            backgroundPosition: "center",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Increased shadow values
        }}
        >
        <>
        <DoctorBar />
        <Container>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Typography marginTop="10px" marginBottom="30px" variant="h1" color="primary" style={{ fontWeight: 'bold'}}>Follow Up Requests</Typography>
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
    </div>
    );
}

export default ViewFollowUpRequests;