import { Button, Card, Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

interface Doctor {
    username:string;
    name: string;
    email: string;
    hourlyRate: number;
    speciality: string;
    timeslots: [{date: Date}];
    educationalBackground: string;
}

interface DoctorProps{
    doctor: Doctor
}
const DocDetails = ({doctor}: DoctorProps) => {
    const navigate = useNavigate();
    const [sessionPrice, setSessionPrice] = useState<number>();
    const caculateSessionPrice = async () => {
        console.log('Fetching Doctors...');
        try {
            const token=localStorage.getItem("authToken")
            const response = await axios.get(`/routes/doctors/sessionPrice?hourlyRate=${doctor.hourlyRate}`, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
        });
        if(response){
            console.log('Response:', response);
            const data = await response.data;
            setSessionPrice(response.data);
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };

    useEffect(() => {
        caculateSessionPrice();
    }, []);

    if(!doctor){
        return null;
    }
    const {name, username, email, hourlyRate, speciality, timeslots, educationalBackground} = doctor;
    
    const handleClick = () =>{
        localStorage.setItem("selectedDoctor", username);
        navigate(`/patient/doctorinfo?price=${sessionPrice}`);
    }

    return(
        <Card style={{padding: '20px', margin: '10px', display: 'flex', justifyContent:'space-between', alignItems:'center'}} >
            <Container onClick={handleClick}>
            <Typography> Name: {name}</Typography>
            <Typography> Speciality: {speciality}</Typography>
            <Typography> Session Price: {sessionPrice}</Typography>

            </Container>
        </Card>
    );
}
export default DocDetails;