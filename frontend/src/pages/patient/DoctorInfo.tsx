import { Button, Card, CardContent, Container, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Doctor {
    username:string;
    name: string;
    email: string;
    hourlyRate: number;
    speciality: string;
    timeslots: [{date: Date}];
    educationalBackground: string;
}
interface Timeslot {
    date: Date;
    // Add other properties as needed
  }
function DoctorInfo(){
    //THE LOGIC OF GETTING A CERTAIN PATIENTS INFO UPON CLICK
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const price = queryParams.get('price');
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const selectedDoctor = localStorage.getItem("selectedDoctor");
    const navigate = useNavigate();
    const [selectedTimeslot, setSelectedTimeslot] = useState<Timeslot>();

    const fetchDoctor = async () => {
        console.log('Fetching Doctor...');
        try {
        const response = await axios.get(`/routes/patient/doctors/select?username=${selectedDoctor}`);
        console.log('Response:', response);
        setDoctor(response.data);
        } catch (error) {
        console.error('Error:', error);
        }
    };


    useEffect(() => {
        fetchDoctor();
    }, []);
    const handleTimeslotSelect = (selectedTimeslot: Timeslot) => {
        // Handle the selected timeslot as needed
        setSelectedTimeslot(selectedTimeslot);
      };

      const ReserveAppointmentForMe = ()=>{
        //fel page de hangeb el doctor username mn local storage w neb3ato lel back f body w session price f body, w el token fel header
        //set doctorUsername fel local storage
        if(doctor &&selectedTimeslot ){
            localStorage.setItem("doctorUserName", doctor.username);
            navigate(`/makeApp/${selectedTimeslot.date}/${price}`);
        }

      };
      const ReserveAppointmentForFam = () =>{
        if(doctor && selectedTimeslot){
        //fel page de hangeb el doctor username mn local storage w neb3ato lel back f body w session price f body, w el token fel header
            localStorage.setItem("doctorUserName", doctor.username);
            navigate(`/patient/ViewMyFam/${selectedTimeslot.date}/${price}`);
        } 

      };
    //return
    //THE DISPLAY OF THAT INFO
    //JUST A LITTLE CARD IN THE MIDDLE OF THE PAGE CONTAINS ALL INFO OF THE PATIENT
    return(
        <Container>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Typography variant="h5" style={{padding: '20px', fontWeight: 'bold'}}>
                Information Of Selected Doctor
            </Typography>
            </div>
            <Paper style={{ padding: '20px'}}>
                    {doctor &&(
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Name: {doctor.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Email: {doctor.email}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Hourly Rate: {doctor.hourlyRate}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Speciality: {doctor.speciality}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography style={{fontWeight:'bold'}}>
                            available at:
                            </Typography>
                            <ul>
          {doctor.timeslots.map((timeslot, index) => (
  <li key={index} onClick={() => handleTimeslotSelect(timeslot)}>
    {new Date(timeslot.date).toLocaleDateString()} {/* Display the timeslot date */}
  </li>
))}

        </ul>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Educational Background: {doctor.educationalBackground}</Typography>
                        </Grid>
                        {/* Add more patient information fields here */}
                        </Grid>
                    )}
            </Paper>
            {selectedTimeslot && (
        <div>
          <h3>Selected Timeslot</h3>
          <p>{selectedTimeslot.date.toLocaleString()}</p>
          {/* Add other details of the selected timeslot as needed */}
        </div>
      )}
            <Button onClick={ReserveAppointmentForMe}> Reserve For Me</Button>
            <Button onClick={ReserveAppointmentForFam}> Reserve For A Fam Mem</Button>

        </Container>
    
    );

}

export default DoctorInfo;