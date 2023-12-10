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
} from "@mui/material";

import { useNavigate } from "react-router-dom";

// Define a type for the appointment object
interface Appointment {
  _id: string;
  patient: string;
  date: string;
  age: number;
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

const TodayAppointmentsComponent: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctorHasAppointments, setDoctorHasAppointments] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/routes/doctors/todayapp", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.length === 0) {
          // If no appointments, set doctorHasAppointments to false
          setDoctorHasAppointments(false);
        } else {
          // Fetch patient age for each appointment
          const appointmentsWithAge = await Promise.all(
            response.data.map(async (appointment: Appointment) => {
              const ageResponse = await axios.post(
                "/routes/patient/calcpatientage",
                {
                  username: appointment.patient,
                }
              );

              return {
                ...appointment,
                age: ageResponse.data.age,
              };
            })
          );

          setAppointments(appointmentsWithAge);
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

  const handleAddTimeSlots = () => {
    // Add logic to navigate to the page where the doctor can add timeslots
    navigate("/doctor/time");
  };
  const handleViewHealthRecord = (patient: string) => {
    // Navigate to patientHealthRecord page with the patient's username as a query parameter
    const params = new URLSearchParams();
    params.append("patient", patient);
    navigate(`/doctor/patientHealthRecord?${params.toString()}`);
  };
  return (
    <div>
      <DoctorBar />
      <Typography variant="h5" gutterBottom style={{ textAlign: "center" }}>
        Today's Appointments - {formatDate(new Date().toString())}
      </Typography>

      {doctorHasAppointments ? (
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: "800px",
            margin: "auto",
            marginTop: "16px",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Patient's Age</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Health Record</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment: Appointment) => (
                <TableRow key={appointment._id}>
                  <TableCell>{appointment.patient}</TableCell>
                  <TableCell>{appointment.age}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleStartMeeting()}>
                      Start Meeting
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        handleViewHealthRecord(appointment.patient)
                      }
                    >
                      View {appointment.patient}'s Health Record
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Typography variant="body1" style={{ marginBottom: "8px" }}>
            You have no appointments today. Do you want to add timeslots?
          </Typography>

          <Button variant="contained" onClick={handleAddTimeSlots}>
            Add Time Slots
          </Button>
        </div>
      )}
    </div>
  );
};

export default TodayAppointmentsComponent;
