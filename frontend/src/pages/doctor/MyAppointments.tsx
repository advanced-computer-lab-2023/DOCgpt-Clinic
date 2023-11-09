// IMPORTS

import { Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Switch, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import Appointment from "../../components/Appointment";
import React from "react";

function MyAppointments(){
//THE LOGIC OF VIEWING A DOCTOR'S APPOINTMENTS
//THW LINK TO BACK
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const doctorUsername = queryParams.get('doctorUsername');

    const [appointments, setAppointments] = useState<any[]>([]);
    const [filteredAppointments, setFilteredAppointments] = useState<any[]>([]);
    const [status, setstatus] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [upcoming, setupcoming] = useState(false);
    const [past, setPast] = useState(false);

    const chooseStatus = (event: SelectChangeEvent) => {
        setstatus(event.target.value);
    };
    const handleDateChange = (event: any) => {
        const newDate = event.target.value;
        setSelectedDate(newDate);
    };
    const handleUpcomingSwitch = () => {
        setupcoming((prevSwitchState) => !prevSwitchState);
    };
    const handlePastSwitch = () => {
        setPast((prevSwitchState) => !prevSwitchState);
    };
    useEffect(() => {
        const fetchAppointments = async () => {
            console.log('Fetching appointments...');
            try {
            const response = await axios.get(`/routes/appointments/?doctorUsername=${doctorUsername}`);
            console.log('Response:', response);
            setAppointments(response.data);
            } catch (error) {
            console.error('Error:', error);
            }
        };
        fetchAppointments();
    }, []);

    useEffect(() => {
        // Filter medicines based on the search value
        const filtered = appointments.filter((appointment: any) =>
            appointment.status.toLowerCase().includes(status.toLowerCase())
            );
            setFilteredAppointments(filtered);
            if(status.toLowerCase() === "all")
            {
                setFilteredAppointments(appointments);
            }
    }, [status, appointments]);

    useEffect(() => {
        // Filter medicines based on the search value    
        const filtered = appointments.filter((appointment) => {
            // Convert the Mongoose date to "YYYY-MM-DD" format
            const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
            // Compare the dates
            return appointmentDate === selectedDate;
        });
        setFilteredAppointments(filtered);
        }, [selectedDate]);

    useEffect(() => {
        if(upcoming){
            const filtered = appointments.filter((appointment: any) =>
                appointment.status.toLowerCase() === 'upcoming'
                );
                setFilteredAppointments(filtered);
        }
        else{
            setFilteredAppointments(appointments);
        }
    }, [upcoming]);

    useEffect(() => {
        if(past){
            const filtered = appointments.filter((appointment: any) =>
                appointment.status.toLowerCase() !== 'upcoming'
                );
                setFilteredAppointments(filtered);
        }
        else{
            setFilteredAppointments(appointments);
        }
    }, [past]);

//return
//THE VIEWING (THE COMPONENTS)
//1- UPCOMING SWITCH 
//2- PAST SWITCH 
//3- DATE PICKER FILTER
//4- STATUS DROP DOWN FILTER
//5- LIST OF APPOINTMENTS COMPONENTS

//EACH APPOINTMENT COMPONENT SHOULD CONTAIN:
//- A CHECK CIRCLE TO MARK COMPLETE(OPTIONAL)
//- THE INFO OF THE APPOINTMENTS (DATE, STATUS, PATIENT NAME DON'T CONATIN THE DOCTOR NAME AND DISPLAY THE INFO IN A PROPER WAY)

return(
    <Container>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Typography variant="h3" style={{ fontWeight: 'bold'}}>Your Appointments So Far..</Typography>
        </div>
        <Grid container style={{ padding: '20px'}}>
            <Grid item xs={3}>
                <Stack>
                    <Typography>Choose Appointment Status:</Typography>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Status"
                        onChange={chooseStatus}
                        >
                        <MenuItem value={'upcoming'}>UpComing</MenuItem>
                        <MenuItem value={'completed'}>Completed</MenuItem>
                        <MenuItem value={'cancelled'}>Cancelled</MenuItem>
                        <MenuItem value={'rescheduled'}>Rescheduled</MenuItem>
                        <MenuItem value={'all'}>All</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Grid>
            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Stack>
                    <Typography>Pick a Date:</Typography>
                    <div>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                    <p>
                        {selectedDate}
                    </p>
                    </div>
                </Stack>
            </Grid>
            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Stack>
                    <Typography>Upcoming Appointments:</Typography>
                    <div>
                    <Switch
                        checked={upcoming}
                        onChange={handleUpcomingSwitch}
                        name="upcoming-switch"
                    />
                    <span>
                        {upcoming ? 'Upcoming' : 'All'}
                    </span>
                    </div>
                </Stack>
            </Grid>
            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Stack>
                    <Typography>Past Appointments:</Typography>
                    <div>
                    <Switch
                        checked={past}
                        onChange={handlePastSwitch}
                        name="past-switch"
                    />
                    <span>
                        {past ? 'Past' : 'All'}. 
                    </span>
                    </div>
                </Stack>
            </Grid>
        </Grid>
        <Container>
            {appointments && !(filteredAppointments) && appointments.map((appointment) => (
                <Appointment appointment={appointment}/>
            ))}
            {filteredAppointments && filteredAppointments.map((appointment: any, index: number) => (
                <Appointment appointment={appointment}/>
            ))}
        </Container>
    </Container>
);

}

export default MyAppointments;