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
import DoctorBar from "../../components/Doctor bar/doctorBar";
import El7a2niInfo from "../../components/El7a2ni-info";
import Background from '../../patient.jpeg';
import Back from "../../components/backButton";


function MyPatients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<any[]>([]);
  const [allPatients, setAllPatients] = useState<any[]>([]);
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [upcoming, setUpcoming] = useState(false);
  const [doctorUsername, setDoctor] = useState("");
  const [isHealthRecordPopupOpen, setHealthRecordPopupOpen] = useState(false);

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
      <DoctorBar />
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
          <strong>MY PATIENTS</strong>
        </h1>
      </div>
    </div>
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
  
          <TextField
            label="Search by Name"
            variant="outlined"
            value={nameSearchTerm}
            onChange={(e) => setNameSearchTerm(e.target.value)}
            style={{ marginTop: "16px", width: "55%" }}
          />
  
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
              {/* Upcoming switch */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <Typography>Upcoming:</Typography>
                <Switch
                  checked={upcoming}
                  onChange={handleUpcomingSwitch}
                  name="upcoming-switch"
                  style={{ marginLeft: "8px" }}
                />
              </div>
  
              {patients && patients.length > 0 ? (
  patients.map((patient) => (
    <div key={patient._id}>
      <Patient patient={patient} doctor={doctorUsername} />
      <Divider style={{ margin: "16px 0" }} />
    </div>
  ))
) : (
  <Typography>No patients found.</Typography>
)}
            </div>
          </Paper>
        </div>
      </Container>
      <El7a2niInfo />
      
    </>
  );
  
}

export default MyPatients;
