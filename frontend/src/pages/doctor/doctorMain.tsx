import React, { useEffect, useState } from 'react';
import { Doctor as DoctorModel } from '../../models/doctor';
import Doctor from '../../components/Doctor';
import { Button, Container, Grid, Typography } from '@mui/material';

function DoctorMain() {
  const [doctor, setDoctor] = useState<DoctorModel | null>(null);
  const doctorUsername = doctor?.username;
  
  useEffect(() => {
    async function fetchDoctorData() {
      try {
        const token=localStorage.getItem("authToken")
        const response = await fetch(`/routes/doctors/getDoctor`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
        );
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
      {doctor ? (
        <Doctor 
          doctor={doctor} 
          doctorUsername={doctorUsername}/>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default DoctorMain;