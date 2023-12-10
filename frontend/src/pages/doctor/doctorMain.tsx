import React, { useEffect, useState } from "react";
import { Doctor as DoctorModel } from "../../models/doctor";
import Doctor from "../../components/Doctor";
import {
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";

function DoctorMain() {
  const [doctor, setDoctor] = useState<DoctorModel | null>(null);
  const [todaysAppointments, setTodaysAppointments] = useState<any[]>([]);
  const doctorUsername = doctor?.username;

  useEffect(() => {
    async function fetchDoctorData() {
      try {
        const token = localStorage.getItem("authToken");

        // Fetch doctor data
        const doctorResponse = await fetch(`/routes/doctors/getDoctor`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (doctorResponse.ok) {
          const doctorData: DoctorModel = await doctorResponse.json();
          setDoctor(doctorData);

          // Fetch today's appointments for the doctor
          const appointmentsResponse = await axios.get(
            "/routes/doctors/todayapp",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setTodaysAppointments(appointmentsResponse.data);
        } else {
          console.error("Failed to fetch doctor data");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while fetching data");
      }
    }

    fetchDoctorData();
  }, []); // An empty dependency array means this effect runs once on component mount.
  const handleStartMeeting = () => {
    window.open("https://zoom.us/s/83812339297#success", "_blank");
  };
  return (
    <Container>
      {doctor ? (
        <>
          <Doctor doctor={doctor} doctorUsername={doctorUsername} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default DoctorMain;
