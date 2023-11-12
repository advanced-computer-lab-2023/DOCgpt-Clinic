// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Doctor as DoctorModel } from '../../models/doctor';
import Doctor from '../../components/Doctor';
import { Button, Container, Grid, Typography } from '@mui/material';
import * as DoctorApis from "../../routes/doctorApis";
import { SearchBar } from '../../components/SearchBar';
import ViewMyPatients from '../../components/ViewMyPatients';
import ViewHealthRecord from '../../components/ViewHealthRecord';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DoctorAvailability from '../../components/DoctorAvailability';

function DoctorMain() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const doctorUsername = queryParams.get('doctorUsername');
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState<DoctorModel | null>(null);
  
  useEffect(() => {
    async function fetchDoctorData() {
      try {
        const response = await fetch(`/routes/doctors/getDoctor?doctorUsername=${doctorUsername}`);
        if (response.ok) {
          const doctorData: DoctorModel = await response.json();
          setDoctor(doctorData);
        } else {
          console.error('Failed to fetch doctor data');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while fetching doctor data');
      }
    }

    fetchDoctorData();
  }, []); // An empty dependency array means this effect runs once on component mount.

  // empty array executes the function only one time
  // no array executes the function every render 
  
  const appointmentsClicked = () => {
    if(doctorUsername){
      const params = new URLSearchParams();
      params.append('doctorUsername', doctorUsername);
      navigate(`/doctor/appointments?${params.toString()}`);
    }
  };
  const patientsClicked = () => {
    if(doctorUsername){
      const params = new URLSearchParams();
      params.append('doctorUsername', doctorUsername);
      navigate(`/doctor/patients?${params.toString()}`);
    }
};

  return (
    <Container>
      <Grid container style={{ padding: '50px'}}>
        <Grid item xs={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
          <Button variant='contained' onClick={appointmentsClicked}>
            <Typography>MY APPOINTMENTS</Typography>
          </Button>
        </Grid>
        <Grid item xs={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
          <Button variant='contained' onClick={patientsClicked}>
            <Typography>MY PATIENTS</Typography>
          </Button>
        </Grid>
       
      </Grid>
      <div>
      {doctor ? (
        <Doctor 
          doctor={doctor} 
          doctorUsername={doctorUsername}/>
      ) : (
        <p>Loading...</p>
      )}
    </div>
      {/* <SearchBar doctorUsername={doctorUsername}/>
      <ViewMyPatients  doctorUsername={doctorUsername}/>
      <ViewHealthRecord doctorUsername={doctorUsername}/> */}
   
    </Container>
  );
}

export default DoctorMain;
