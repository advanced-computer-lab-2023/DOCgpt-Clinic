//EDIT THIS FOR FAMILY MEMBERS
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import PatientAppointment from "../../components/PatientAppointment";
import PatientAppBar from "../../components/patientBar/patientBar";
import El7a2niInfo from "../../components/El7a2ni-info";
import Background from '../../FamilyMembers.jpg';
import Back from "../../components/backButton";

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FamMemAppointment from "../../components/FamMemAppointment";
function ViewFamMemAppointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const navigate = useNavigate();
  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([]);
  const [status, setstatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [upcoming, setupcoming] = useState(false);
  const [past, setPast] = useState(false);

  const [response, setResponse] = useState<any>(null);
  const chooseStatus = (event: SelectChangeEvent) => {
    setstatus(event.target.value);
  };
  const handleDateChange = (event: any) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
  };
  const handleUpcomingSwitch = () => {
    setupcoming((prevSwitchState) => !prevSwitchState);
  };
  const handlePastSwitch = () => {
    setPast((prevSwitchState) => !prevSwitchState);
  };
  const handleStartChat = async (name: string) => {
    try {
      console.log(name);
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "/routes/conversation/startConv",
        {
          secondusername: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("recieverusername", name);
      setResponse(response.data);
      console.log(response.data._id);
      navigate(`/chat/${response.data._id}`);
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };
  useEffect(() => {
    const fetchAppointments = async () => {
      console.log("Fetching appointments...");

      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`/routes/patient/viewFamAppointments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setAppointments(data.appointments);
        } else {
          console.error("Failed to fetch doctor data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    // Filter medicines based on the search value
    const filtered = appointments.filter((appointment: any) =>
      appointment.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredAppointments(filtered);
    if (status.toLowerCase() === "all") {
      setFilteredAppointments(appointments);
    }
  }, [status, appointments]);

  useEffect(() => {
    // Filter medicines based on the search value
    const filtered = appointments.filter((appointment) => {
      // Convert the Mongoose date to "YYYY-MM-DD" format
      const appointmentDate = new Date(appointment.date)
        .toISOString()
        .split("T")[0];
      // Compare the dates
      return appointmentDate === selectedDate;
    });
    setFilteredAppointments(filtered);
  }, [selectedDate]);

  useEffect(() => {
    if (upcoming) {
      const filtered = appointments.filter(
        (appointment: any) => appointment.status.toLowerCase() === "upcoming"
      );
      setFilteredAppointments(filtered);
    } else {
      setFilteredAppointments(appointments);
    }
  }, [upcoming]);

  useEffect(() => {
    if (past) {
      const filtered = appointments.filter(
        (appointment: any) => appointment.status.toLowerCase() !== "upcoming"
      );
      setFilteredAppointments(filtered);
    } else {
      setFilteredAppointments(appointments);
    }
  }, [past]);

  return (
    <>
      <PatientAppBar />
      <div
      style={{
        position: 'relative',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '50vh',
        marginBottom: '100px',
        backgroundPosition: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Transparent overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      ></div>

      <Back />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h1>
          <strong>FAMILY MEMBERS APPOINTMENTS</strong>
        </h1>
      </div>
    </div>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Stack direction="column" style={{ position: "sticky", top: 100 }}>
              <Stack>
                <Typography>Past Appointments:</Typography>
                <div>
                  <Switch
                    checked={past}
                    onChange={handlePastSwitch}
                    name="past-switch"
                  />
                  <span>{past ? "Past" : "All"}</span>
                </div>
              </Stack>
              <Box sx={{ marginTop: "10px" }} />{" "}
              <Stack>
                <Typography>Upcoming Appointments:</Typography>
                <div>
                  <Switch
                    checked={upcoming}
                    onChange={handleUpcomingSwitch}
                    name="upcoming-switch"
                  />
                  <span>{upcoming ? "Upcoming" : "All"}</span>
                </div>
              </Stack>
              <Box sx={{ marginTop: "10px" }} />{" "}
              <FormControl fullWidth>
                <Typography>Pick a Date:</Typography>
                <TextField
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  variant="outlined"
                />
              </FormControl>
              <Box sx={{ marginTop: "10px" }} />{" "}
              <Stack>
                <Typography>Choose Appointment Status:</Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={chooseStatus}
                  >
                    <MenuItem value={"upcoming"}>UpComing</MenuItem>
                    <MenuItem value={"completed"}>Completed</MenuItem>
                    <MenuItem value={"cancelled"}>Cancelled</MenuItem>
                    <MenuItem value={"rescheduled"}>Rescheduled</MenuItem>
                    <MenuItem value={"all"}>All</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Box sx={{ marginTop: "10px" }} />{" "}
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}>
            <Container>
              {appointments &&
                !filteredAppointments &&
                appointments.map((appointment) => (
                  <FamMemAppointment
                    appointment={appointment}
                    onStartChat={() => handleStartChat(appointment.patient)}
                  />
                ))}
              {filteredAppointments &&
                filteredAppointments.map((appointment: any, index: number) => (
                  <FamMemAppointment
                    appointment={appointment}
                    onStartChat={() => handleStartChat(appointment.doctor)}
                  />
                ))}
            </Container>
          </Grid>
        </Grid>
      </Container>
      <El7a2niInfo />
    </>
  );
}

export default ViewFamMemAppointments;
