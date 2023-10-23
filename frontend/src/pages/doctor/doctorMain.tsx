// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Doctor as DoctorModel } from '../../models/doctor';
import Doctor from '../../components/Doctor';
import { Container } from '@mui/material';
import * as DoctorApis from "../../routes/doctorApis";
import { SearchBar } from '../../components/SearchBar';
import ViewMyPatients from '../../components/ViewMyPatients';
import ViewMyAppointments from '../../components/ViewAppointments';
import ViewHealthRecord from '../../components/ViewHealthRecord';
import ViewUpcomingAppointments from '../../components/ViewUpcomingAppointments';
import { useLocation, useParams } from 'react-router-dom';

// const doctorId = "652aaca4e0d8c1e384bde4a8";
// const doctorUsername = "amola";


// function DoctorMain() {
  //   const [doctor, setDoctors] = useState<DoctorModel[]>([]);
  //   const { doctorUsername } = useParams();

  //   useEffect(() => {
    //     async function getDoctor() {
      //       try {
        //         const response = await fetch(`/routes/doctors/getDoctor?doctorUsername=${doctorUsername}`, {
          //           method: 'GET',
//         });
//         if (response.ok) {
  //           const doctorData = await response.json();
//           setDoctors([doctorData]);
//         } else {
//           console.error(`Failed to fetch doctor data for ${doctorUsername}`);
//         }
//       } catch (error) {
  //         console.error(error);
  //         alert(error);
  //       }
  //     }
  
  //     getDoctor();
//   }, [doctorUsername]); // This ensures the effect runs when `doctorUsername` changes.

function DoctorMain() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const doctorUsername = queryParams.get('doctorUsername');

  //const { doctorUsername } = useParams();
  console.log("username"+ doctorUsername);
  
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
  
  
  return (
    <Container>

      <div>
      {doctor ? (
        // <div>
        //   <h1>Welcome, {doctor.name}!</h1>
        //   <h1>username: {doctor.username}</h1>
        //   <h1>hospital: {doctor.affiliation}</h1>
        //   <h1>speciality: {doctor.speciality}</h1>
        //   <h1>educational Background: {doctor.educationalBackground}</h1>
        //   <h1>hourly Rate: {doctor.hourlyRate}</h1>
        //   <h1>date of birth: {doctor.dateOfBirth}</h1>
        // </div>
        <Doctor 
          doctor={doctor} 
          doctorUsername={doctorUsername}/>
      ) : (
        <p>Loading...</p>
      )}
    </div>

      <SearchBar/>
      <ViewUpcomingAppointments doctorUsername={doctorUsername}/>
      <ViewMyPatients  doctorUsername={doctorUsername}/>
      <ViewHealthRecord doctorUsername={doctorUsername}/>
      <ViewMyAppointments  doctorUsername={doctorUsername}/>
    </Container>
  );
}

export default DoctorMain;
