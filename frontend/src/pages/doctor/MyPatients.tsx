import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  IconButton,
  Stack,
  Switch,
  TextField,
  Grid,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Patient from "../../components/Patient";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PatientBar from "../../components/patientBar/patientBar";

function MyPatients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<any[]>([]);
  const [allPatients, setAllPatients] = useState<any[]>([]);
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [upcoming, setUpcoming] = useState(false);
  const [doctorUsername, setDoctor] = useState("");

  const fetchPatients = async () => {
    console.log("Fetching patients...");
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`/routes/doctors/viewMyPatients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        console.log("Response:", response);
        const data = await response.data;
        setPatients(data);
        setAllPatients(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function fetchDoctorData() {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`/routes/doctors/getDoctor`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const doctorData = await response.json();
        setDoctor(doctorData.username);
      } else {
        console.error("Failed to fetch doctor data");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching doctor data");
    }
  }

  useEffect(() => {
    fetchPatients();
    fetchDoctorData();
  }, []);

  async function searchPatients() {
    try {
      if (!nameSearchTerm) {
        setPatients(allPatients);
      }
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `/routes/doctors/searchPatient?patientName=${nameSearchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        console.log("Response:", response);
        const data = await response.data;
        setPatients(data);
      } else {
        console.error("Failed to fetch doctor data");
      }
    } catch (error) {
      console.error("Error searching for doctors: ", error);
    }
  }

  async function getUpcomingPatients() {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`/routes/doctors/viewPatientsUpcoming`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        console.log("Response:", response);
        const data = await response.data;
        setPatients(data);
      } else {
        console.error("Failed to fetch doctor data");
      }
    } catch (error) {
      console.error("Error searching for doctors: ", error);
    }
  }

  useEffect(() => {
    if (upcoming) {
      getUpcomingPatients();
    } else {
      setPatients(allPatients);
    }
  }, [upcoming]);

  const handleUpcomingSwitch = () => {
    setUpcoming((prevSwitchState) => !prevSwitchState);
  };

  return (
    <>
      <PatientBar />
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            padding: "20px",
          }}
        >
          <Typography variant="h3" style={{ fontWeight: "bold" }}>
            Current Registered Patients
          </Typography>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            <TextField
              label="Search by Name"
              variant="outlined"
              value={nameSearchTerm}
              onChange={(e) => setNameSearchTerm(e.target.value)}
              style={{ marginRight: "8px" }}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={searchPatients}>
                <SearchIcon />
              </IconButton>
              <Typography>Upcoming:</Typography>
              <Switch
                checked={upcoming}
                onChange={handleUpcomingSwitch}
                name="upcoming-switch"
                style={{ marginLeft: "8px" }}
              />
            </div>
          </div>

          <Paper
            elevation={3}
            style={{
              width: "55%",
              marginTop: "16px",
              padding: "16px",
              maxHeight: "calc(100vh - 200px)",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {patients &&
                patients.map((patient) => (
                  <div key={patient._id}>
                    <Patient
                      patient={patient}
                      doctor={doctorUsername}
                    />
                    <Divider style={{ margin: "16px 0" }} />
                  </div>
                ))}
            </div>
          </Paper>
        </div>
      </Container>
    </>
  );
}

export default MyPatients;
