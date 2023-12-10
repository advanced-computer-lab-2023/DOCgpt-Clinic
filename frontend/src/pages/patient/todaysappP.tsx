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

import PatientBar from "../../components/patientBar/patientBar";
import { useNavigate } from "react-router-dom";

// Define a type for the appointment object
interface Appointment {
  doctor: string;
  _id: string;
  patient: string;
  date: string; // You can replace this with the actual date type
}

const formatDate = (dateString: string) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  } as Intl.DateTimeFormatOptions;
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const TodayAppointmentsPatient: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [showReservePrompt, setShowReservePrompt] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/routes/patient/getTodApp", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Fetch specialities for each doctor
        const appointmentsWithSpeciality = await Promise.all(
          response.data.map(async (appointment: Appointment) => {
            const doctorResponse = await axios.post("/routes/doctors/docspec", {
              doctorname: appointment.doctor,
            });

            return {
              ...appointment,
              speciality: doctorResponse.data,
            };
          })
        );

        setAppointments(appointmentsWithSpeciality);

        // If there are no appointments, show the reserve prompt
        if (appointmentsWithSpeciality.length === 0) {
          setShowReservePrompt(true);
        }
      } catch (error) {
        console.error("Error fetching today appointments:", error);
      }
    };

    fetchData();
  }, []);

  const handleStartMeeting = () => {
    window.open("https://zoom.us/s/83812339297#success", "_blank");
  };

  const handleReserveAppointment = () => {
    navigate(`/patient/viewDoctors`);
    console.log("Reserve appointment logic");
  };
  return (
    <div>
      <PatientBar />
      <Typography variant="h5" gutterBottom style={{ textAlign: "center" }}>
        Today's Appointments - {formatDate(new Date().toString())}
      </Typography>

      {showReservePrompt ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          <Typography variant="subtitle1">
            No appointments for today. Would you like to reserve an appointment?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleReserveAppointment()}
            style={{ marginTop: "8px" }}
          >
            Reserve Appointment
          </Button>
        </Box>
      ) : (
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
                <TableCell>Doctor</TableCell>
                <TableCell>Speciality</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment: any) => (
                <TableRow key={appointment._id}>
                  <TableCell>{appointment.doctor}</TableCell>
                  <TableCell>{appointment.speciality}</TableCell>

                  <TableCell>
                    <Button onClick={() => handleStartMeeting()}>
                      Start Meeting
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TodayAppointmentsPatient;
