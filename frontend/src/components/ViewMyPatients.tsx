import React, { useEffect, useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import axios from 'axios';

interface ViewMyPatientsProps {
    doctorUsername: string;
}

const ViewMyPatients: React.FC<ViewMyPatientsProps> = ({doctorUsername}) => {
    const [patients, setPatients] = useState<any[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<any | null>();
    const [healthRecord, setHealthRecord] = useState<any | null>();
    const [filteredPatients, setFilteredPatients] = useState<any[]>([]);

    const fetchPatients = async () => {
        console.log('Fetching patients...');
        try {
        const response = await axios.get(`/api/doctors/viewMyPatients?doctorUsername=${doctorUsername}`);
        const filteredResponse = await axios.get(`/api/doctors/viewPatientsUpcoming?doctorUsername=${doctorUsername}`);
        console.log('Response:', response);
        setPatients(response.data);
        setFilteredPatients(filteredResponse.data)
        setSelectedPatient(null); // Reset selected patient
        } catch (error) {
        console.error('Error:', error);
        }
    };

    const handlePatientClick = (patient: any) => {
        setSelectedPatient(patient);
    };

    const upcomingClick = () => {
        setPatients(filteredPatients);
    }


    return (
        <div>
        <Typography variant="h4" gutterBottom>
            View My Patients
        </Typography>
        <Button variant="contained" onClick={fetchPatients}>
            View Patients
        </Button>

        <Button onClick={upcomingClick}>
            Upcoming
        </Button>

        <div>
            {patients.map((patient: any, index: number) => (
            <div key={index}>
                <Button variant="outlined" onClick={() => handlePatientClick(patient)}>
                {patient.username}
                </Button>
            </div>
            ))}
        </div>

        {selectedPatient && (
            <Box
            sx={{
                border: '1px solid #ccc',
                padding: 2,
                marginBottom: 2,
            }}
            >
            <Typography variant="h6">Username: {selectedPatient.username}</Typography>
            <Typography>Name: {selectedPatient.name}</Typography>
            <Typography>Email: {selectedPatient.email}</Typography>
            <Typography>Date of Birth: {selectedPatient.dateofbirth}</Typography>
            <Typography>Mobile Number: {selectedPatient.mobilenumber}</Typography>
            <Typography variant="h6">Emergency Contact:</Typography>
            <Typography>Full Name: {selectedPatient.emergencyContact.fullName}</Typography>
            <Typography>Mobile Number: {selectedPatient.emergencyContact.mobilenumber}</Typography>
            <Typography>Relation: {selectedPatient.emergencyContact.relation}</Typography>

            {/* <Button onClick={getHealthRecord()}>VIEW HEALTH RECORD</Button> */}
            </Box>
        )}
        </div>
    );
};

export default ViewMyPatients;