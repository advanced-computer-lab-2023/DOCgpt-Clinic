import React, { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import axios from 'axios';

interface ViewUpcomingProps {
    doctorUsername: any;
}


const ViewUpcomingAppointments: React.FC<ViewUpcomingProps> = ({doctorUsername}) => {
    const [appointments, setAppointments] = useState<any[]>([]);

    const fetchAppointments = async () => {
        console.log('Fetching patients...');
        try {
        const response = await axios.get(`/routes/doctors/viewPatientsUpcoming?doctorUsername=${doctorUsername}`);
        console.log('Upcoming Response:', response.data);
        setAppointments(response.data);
        } catch (error) {
        console.error('Error:', error);
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
        <div>
        <Typography variant="h4" gutterBottom>
            View Upcoming Appointments
        </Typography>
        <Button variant="contained" onClick={fetchAppointments}>
            View Upcoming
        </Button>

        <div>
            {appointments.map((appointment: any, index: number) => (
            <div key={index}>
                <Box
                    sx={{
                        border: '1px solid #ccc',
                        padding: 2,
                        marginBottom: 2,
                    }}
                >
                    
                <Typography variant="h6"> {JSON.stringify(appointment)}</Typography>
                
                
                
                </Box>
            </div>
            ))}
        </div>
        </div>
    );
};


export default ViewUpcomingAppointments