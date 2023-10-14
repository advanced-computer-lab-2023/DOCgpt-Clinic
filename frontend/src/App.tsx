// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Doctor as DoctorModel } from './models/doctor';
import Doctor from './components/Doctor';
import { Container } from '@mui/material';
import * as DoctorApis from "./routes/doctorApis";
import { SearchBar } from './components/SearchBar';
import ViewMyPatients from './components/ViewMyPatients';
import ViewMyAppointments from './components/ViewAppointments';
import ViewHealthRecord from './components/ViewHealthRecord';
import ViewUpcomingAppointments from './components/ViewUpcomingAppointments';

const doctorId = "652aaca4e0d8c1e384bde4a8";
const doctorUsername = "amola";

function App() {
  const [doctors, setDoctors] = useState<DoctorModel[]>([]);

  
  useEffect( () => {
    async function getDoctor() {
      try {
        // here we used proxy and didn't set up CORS because we are fetching from our local backend not a public api      
        const doctors = await DoctorApis.fetchDoctor(doctorId);
        setDoctors(doctors);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    getDoctor();
  }, []);

  // empty array executes the function only one time
  // no array executes the function every render 
  
  
  return (
    <Container>

      {doctors.map(doctor => (
        <Doctor 
          doctor={doctor} 
          doctorId={doctorId}/>
      ))}

      <SearchBar/>
      <ViewUpcomingAppointments doctorUsername={doctorUsername}/>
      <ViewMyPatients  doctorUsername={doctorUsername}/>
      <ViewHealthRecord doctorUsername={doctorUsername}/>
      <ViewMyAppointments  doctorUsername={doctorUsername}/>
    </Container>
  );
}

export default App;
