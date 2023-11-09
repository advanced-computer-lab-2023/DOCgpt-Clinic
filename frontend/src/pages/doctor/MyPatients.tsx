//IMPORTS

import { Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Patient from "../../components/Patient";
import { SearchBar } from "../../components/SearchBar";


function MyPatients(){
//THE LOGIC OF VIEWING A DOCTOR'S PATIENTS
//THE LINK TO BACK
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const doctorUsername = queryParams.get('doctorUsername');
    const [patients, setpatients] = useState<any[]>([]);

    useEffect(() => {
        const fetchPatients = async () => {
            console.log('Fetching patients...');
            try {
            const response = await axios.get(`/routes/doctors/viewMyPatients?doctorUsername=${doctorUsername}`);
            console.log('Response:', response);
            setpatients(response.data);
            } catch (error) {
            console.error('Error:', error);
            }
        };
        fetchPatients();
    }, []);

//return
//THE VIEW (THE COMPONENTS)
//1- UPCOMING SWITCH
//2- SEARCH BAR TO SEARCH BY NAME
//3- LIST OF PATIENTS 

// A PATIENT COMPONENT ITSELF SHOULD CONTAIN: 
//1- A BUTTON TO THE HEALTH RECORDS PAGE/ EMPTY PAGE
//2- THE PATIENT ITSELF ON CLICK SHOULD NAVIGATE TO ANOTHER PAGE TO SHOW ITS INFO
    return(
        <Container>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant="h3" style={{ fontWeight: 'bold'}}>Your Current Registered Patients</Typography>
            </div>

            <SearchBar doctorUsername={doctorUsername}></SearchBar>
            <Container>
            {patients && patients.map((patient) => (
                <Patient patient={patient}/>
            ))}
            </Container>
        </Container>
    );
}

export default MyPatients;

