import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Card, TextField } from '@mui/material';
import axios from 'axios';

interface ViewMyAppointmentsProps{
    doctorUsername : string;
}

const ViewMyAppointments: React.FC<ViewMyAppointmentsProps> = ({doctorUsername}) => {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchDateValue, setSearchDateValue] = useState<string>('');
    const [filteredAppointments, setFilteredAppointments] = useState<any[]>([]);

    const fetchAppointments = async () => {
        console.log('Fetching appointments...');
        try {
        const response = await axios.get(`/api/appointment/?doctorUsername=${doctorUsername}`);
        console.log('Response:', response);
        setAppointments(response.data);
        setFilteredAppointments(response.data);
        } catch (error) {
        console.error('Error:', error);
        }
    };

    useEffect(() => {
        // Filter medicines based on the search value
        const filtered = appointments.filter((appointment: any) =>
            appointment.status.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredAppointments(filtered);
        }, [searchValue, appointments]);

    useEffect(() => {
        // Filter medicines based on the search value
        const filtered = appointments.filter((appointment: any) =>
            appointment.date === searchDateValue 
            );
            setFilteredAppointments(filtered);
        }, [searchDateValue]);
    return (
        <div>
        <Typography variant="h4" gutterBottom>
            View My Appointments
        </Typography>
        <Button variant="contained" onClick={fetchAppointments}>
            View Appointments
        </Button>

        {/* Search Bar */}
        <TextField
            label="Search by Status"
            variant="outlined"
            fullWidth
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
        />

        {/* Search Bar */}
        <TextField
            label="Search by Date"
            variant="outlined"
            fullWidth
            value={searchDateValue}
            onChange={(e) => setSearchDateValue(e.target.value)}
        />
        <div>
            {/* {appointments.map((appointment: any, index: number) => (
            <div key={index}>
                <Box
                    sx={{
                        border: '1px solid #ccc',
                        padding: 2,
                        marginBottom: 2,
                    }}
                >
                <Typography variant="h6">Patient: {appointment.patient}</Typography>
                <Typography>Date: {appointment.date}</Typography>
                <Typography>Status: {appointment.status}</Typography>
                </Box>
            </div>
            ))} */}

            {(filteredAppointments).map((appointment: any, index: number) => (
            <div key={index}>
                <Box
                    sx={{
                        border: '1px solid #ccc',
                        padding: 2,
                        marginBottom: 2,
                    }}
                >
                <Typography variant="h6">Patient: {appointment.patient}</Typography>
                <Typography>Date: {appointment.date}</Typography>
                <Typography>Status: {appointment.status}</Typography>
                </Box>
            </div>
            ))}
        </div>
        </div>
    );
};

export default ViewMyAppointments;