import React, { useState, useEffect } from "react";
import axios from "axios";
import DoctorBar from "../../components/Doctor bar/doctorBar";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from "@mui/material";

// Define a type for the appointment object
interface Appointment {
  _id: string;
  patient: string;
  date: string; // You can replace this with the actual date type
}

const formatDate = (dateString: string) => {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" } as Intl.DateTimeFormatOptions;
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const TodayAppointmentsComponent: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/routes/doctors/todayapp", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching today appointments:", error);
      }
    };

    fetchData();
  }, []);

  const handleStartMeeting = () => {
    window.open("https://zoom.us/s/83812339297#success", "_blank");
  };

  return (
    <div>
      <DoctorBar />
      <Typography variant="h5" gutterBottom style={{ textAlign: "center" }}>
        Today's Appointments - {formatDate(new Date().toString())}
      </Typography>
      
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "800px",
          margin: "auto", // Center the table horizontally
          marginTop: "16px", // Add some space between the title and the table
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment: Appointment) => (
              <TableRow key={appointment._id}>
                <TableCell>{appointment.patient}</TableCell>
                <TableCell>
                  {new Date(appointment.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleStartMeeting()}>Start Meeting</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TodayAppointmentsComponent;
