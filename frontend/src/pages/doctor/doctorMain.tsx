import React, { useEffect, useState } from "react";
import { Doctor as DoctorModel } from "../../models/doctor";
import { Button, Container, Typography } from "@mui/material";
import Doctor from "../../components/Doctor"; // Import the Doctor component
import axios from "axios";
import DoctorBar from "../../components/Doctor bar/doctorBar";
import El7a2niDocInfo from "../../components/El7a2niDoc-info";

function DoctorMain() {
  const [doctor, setDoctor] = useState<DoctorModel | null>(null);
  const [todaysAppointments, setTodaysAppointments] = useState<any[]>([]);
  const doctorUsername = doctor?.username;

  useEffect(() => {
    async function fetchDoctorData() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`/routes/doctors/getDoctor`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const doctorData: DoctorModel = await response.json();
          setDoctor(doctorData);

          // Fetch today's appointments for the doctor
        

       
        } else {
          console.error("Failed to fetch doctor data");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while fetching data");
      }
    }

    fetchDoctorData();
  }, []);

  return (
    <>
    <Container>
      <DoctorBar />
      {doctor ? (
        <Doctor doctor={doctor} doctorUsername={doctorUsername} />
      ) : (
        <p>Loading...</p>
      )}
   
    </Container>
    <El7a2niDocInfo/>
    </>
  );
}

export default DoctorMain;
