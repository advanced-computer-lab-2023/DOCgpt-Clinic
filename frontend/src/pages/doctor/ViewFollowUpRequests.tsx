import { Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import FollowUpRequest from "../../components/FollowUpRequest";


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
        <Container>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant="h3" style={{ fontWeight: 'bold'}}>Your Requests So Far..</Typography>
        </div>
            <Container>
            {requests && requests.map((request, index) => (
            <FollowUpRequest key={index} request={request} />
            ))}

            </Container>
        </Container>
    );
}

export default ViewFollowUpRequests;