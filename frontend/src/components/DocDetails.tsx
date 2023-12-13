import { Button, Card, Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Doctor {
username: string;
name: string;
email: string;
hourlyRate: number;
speciality: string;
timeslots: [{ date: Date }];
educationalBackground: string;
}

interface DoctorProps {
doctor: Doctor;
}

const DocDetails = ({ doctor }: DoctorProps) => {
const navigate = useNavigate();
const [sessionPrice, setSessionPrice] = useState<number>();
const calculateSessionPrice = async () => {
    console.log("Fetching Doctors...");
    try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
        `/routes/doctors/sessionPrice?hourlyRate=${doctor.hourlyRate}`,
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        }
    );
    if (response) {
        console.log("Response:", response);
        const data = await response.data;
        setSessionPrice(response.data);
    }
    } catch (error) {
    console.error("Error:", error);
    }
};

useEffect(() => {
    calculateSessionPrice();
}, []);

if (!doctor) {
    return null;
}
const {
    name,
    username,
    email,
    hourlyRate,
    speciality,
    timeslots,
    educationalBackground,
} = doctor;

const handleClick = () => {
    localStorage.setItem("selectedDoctor", username);
    navigate(`/patient/doctorinfo?price=${sessionPrice}`);
};

return (
    <Card
    onClick={handleClick}
    sx={{
        padding: "20px",
        margin: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        "&:hover": {
        backgroundColor: "#f0f0f0",
        },
    }}
    >
    <Container>
        <Typography
        variant="h6"
        style={{ fontWeight: "bold", fontSize: "18px", color: "#2196f3" }}
        >
        Reserve With Dr. {name}
        </Typography>
        <Typography variant="body1">Speciality: {speciality}</Typography>
        <Typography variant="body1">
        <span style={{ fontSize: "16px" }}>Session Price:&nbsp;</span>
        <span style={{ fontWeight: "bold", fontSize: "16px" }}>
            {sessionPrice}
        </span>
        </Typography>
        <Typography
        variant="body2"
        color="textSecondary"
        style={{ textAlign: "center" }}
        >
        Click to register
        </Typography>
    </Container>
    </Card>
);
};

export default DocDetails;
