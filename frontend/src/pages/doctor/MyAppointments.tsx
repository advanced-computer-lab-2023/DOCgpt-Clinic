import { Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Switch, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import DoctorAppointment from "../../components/DoctorAppointment";
import DoctorBar from "../../components/Doctor bar/doctorBar";
import El7a2niInfo from "../../components/El7a2ni-info";
import Background from "../../Background.jpeg";


function MyAppointments(){
//THE LOGIC OF VIEWING A DOCTOR'S APPOINTMENTS
//THW LINK TO BACK
    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const doctorUsername = queryParams.get('doctorUsername');

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
                const token=localStorage.getItem("authToken")
                const response = await axios.get(`/routes/appointments`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            if(response){
                console.log('Response:', response);
                const data = await response.data;
                setAppointments(data);
            }
            else {
                console.error('Failed to fetch doctor data');
            }
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
    <Container >
    <div className="filterSection">
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Typography color="primary" variant="h1" marginTop="30px" style={{ fontWeight: 'bold'}}>Your Appointments So Far..</Typography>
        </div>
        <Grid container style={{ padding: '20px'}}>
            <Grid item xs={3}>
                <Stack>
                    <Typography color="primary"> <strong> Choose Appointment Status: </strong></Typography>
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
                    <Typography color="primary"> <strong>Pick a Date: </strong></Typography>
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
                <Typography color="primary"> <strong>Upcoming Appointments: </strong></Typography>
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
                <Typography color="primary"> <strong>Past Appointments: </strong></Typography>
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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                </div>
                <Grid container spacing={2} style={{ padding: '20px' }}>
                    {filteredAppointments.map((appointment: any, index: number) => (
                        <Grid item key={index} xs={12} md={6}>
                            <DoctorAppointment appointment={appointment} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            </div>
    </Container>
    <El7a2niInfo />
      
    </>
    </div>
    
);

}

export default MyAppointments;