import { Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Switch, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Patient from "../../components/Patient";
import SearchIcon from '@mui/icons-material/Search';
import DocDetails from "../../components/DocDetails";
interface Doctor {
    name: string;
    email: string;
    hourlyRate: number;
    speciality: string;
    timeslots: [{date: Date}];
    educationalBackground: string;
}

function ViewDoctors(){
//THE LOGIC OF VIEWING A DOCTOR'S PATIENTS
//THE LINK TO BACK
    const [selectedDate, setSelectedDate] = useState('');
    const [doctors, setdoctors] = useState<any[]>([]);
    const [allDoctors, setAllDoctors] = useState<any[]>([]);
    const [nameSearchTerm, setNameSearchTerm] = useState('');
    const [specialitySearchTerm, setspecialitySearchTerm] = useState('');
    const [speciality, setspeciality] = useState<string[]>([]);

    const fetchDoctors = async () => {
        console.log('Fetching Doctors...');
        try {
        const response = await axios.get(`/routes/doctors/`);
        if(response){
            console.log('Response:', response);
            const data = await response.data;
            setdoctors(data);
            setAllDoctors(data)
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);
    
    async function searchDoctorsbyName() {
        try {
            if(!nameSearchTerm){
                setdoctors(allDoctors);
            }
            const token=localStorage.getItem("authToken")
            const response = await axios.get(`/routes/patient/doctors/search?name=${nameSearchTerm}`, {
                headers:{
                    Authorization:`Bearer ${token}`
                }});
            if(response){
                console.log('Response:', response);
                const data = await response.data;
                setdoctors(data);
            }
            else {
                console.error('Failed to fetch doctor data');
            }
        } catch (error) {
        console.error('Error searching for doctors: ', error);
        }
    }
    async function searchDoctorsbySpeciality() {
        try {
            if(!specialitySearchTerm){
                setdoctors(allDoctors);
            }
            const token=localStorage.getItem("authToken")
            const response = await axios.get(`/routes/patient/doctors/search?speciality=${specialitySearchTerm}`, {
                headers:{
                    Authorization:`Bearer ${token}`
                }});
            if(response){
                console.log('Response:', response);
                const data = await response.data;
                setdoctors(data);
            }
            else {
                console.error('Failed to fetch doctor data');
            }
        } catch (error) {
        console.error('Error searching for doctors: ', error);
        }
    }

    const FilterBySpec = () => {
        console.log(speciality);
        
        // Filter medicines based on the search value
        const filtered = doctors.filter((doctor: any) =>
            speciality.includes(doctor.speciality.toLowerCase())
            );
            setdoctors(filtered);
            if(speciality.includes("all"))
            {
                setdoctors(allDoctors);
            }
    }

    const choosespeciality = (event: any) => {
        speciality.push(event.target.value);
    };

    const handleDateChange = (event: any) => {
        const newDate = event.target.value;
        setSelectedDate(newDate);
    };
    const [selectedTime, setSelectedTime] = useState();
    
    const handleTimeChange = (event: any) => {
        console.log("time", event.target.value);
        
      setSelectedTime(event.target.value);
    };

    const filterDateTime = () =>{
        const filteredDoctors = doctors.filter((doctor) => {
            // Convert the Mongoose date to "YYYY-MM-DD" format
            const combinedDateTimeString = `${selectedDate}T${selectedTime}:00.000Z`;
            
            console.log(combinedDateTimeString);
            
            // Check if the timeslots array contains the combined date and time
            return doctor.timeslots.some((timeslot: any) => {
                const timeslotDateTimeString = new Date(timeslot.date).toISOString();
                return timeslotDateTimeString === combinedDateTimeString;
            });
            });
        
            setdoctors(filteredDoctors);
    }

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
        <Container>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'}}>
            <Typography variant="h3" style={{ fontWeight: 'bold'}}>All Doctors</Typography>
            </div>
            <Grid container>
                <Grid item xs={3}>
                    <Stack>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Filter By Speciality:</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={speciality}
                            onChange={choosespeciality}
                            >
                            <MenuItem value={'cardiologist'}>Cardiologist</MenuItem>
                            <MenuItem value={'heart'}>Heart</MenuItem>
                            <MenuItem value={'dermatologist'}>Dermatologist</MenuItem>
                            <MenuItem value={'allergist'}>Allergist</MenuItem>
                            <MenuItem value={'neurologist'}>Neurologist</MenuItem>
                            <MenuItem value={'all'}>All</MenuItem>
                            </Select>
                        </FormControl>
                        {speciality && speciality.map((element) => (
    <Typography key={element}>{element}</Typography>
))}
                        <Button onClick={FilterBySpec}> Filter</Button>
                    </Stack>

                </Grid>
                <Grid item xs={3} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <TextField
                    label="Search by Name"
                    variant="outlined"
                    value={nameSearchTerm}
                    onChange={(e) => setNameSearchTerm(e.target.value)}
                />

                <IconButton onClick={searchDoctorsbyName}>
                    <SearchIcon />
                </IconButton>
                </Grid>
                <Grid item xs={3} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <TextField
                    label="Search by Speciality"
                    variant="outlined"
                    value={specialitySearchTerm}
                    onChange={(e) => setspecialitySearchTerm(e.target.value)}
                />

                <IconButton onClick={searchDoctorsbySpeciality}>
                    <SearchIcon />
                </IconButton>
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
                    <Typography>Pick a Time:</Typography>
                    <div>
                    <input
                    type="time"
                    value={selectedTime} // Make sure the value is in HH:mm format
                    onChange={handleTimeChange}
                    />
                    <p>
                        {selectedTime}
                    </p>
                    </div>
                <Button onClick={filterDateTime}>Filter</Button>
                </Stack>
            </Grid>
                <Grid>

                </Grid>
            </Grid>
            <Container>
            {doctors && doctors.map((doctor) => (
                <DocDetails doctor={doctor}></DocDetails>
            ))}
            {/* {filteredPatients && filteredPatients.map((patient) => (
                <Patient patient={patient}/>
            ))} */}
            </Container>
        </Container>
        </Container>
    );
}

export default ViewDoctors