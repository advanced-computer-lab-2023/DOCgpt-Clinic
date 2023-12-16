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
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Patient from "../../components/Patient";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoctorBar from "../../components/Doctor bar/doctorBar";
import El7a2niInfo from "../../components/El7a2ni-info";
import Background from '../../Appointments.jpeg';



function MyPatients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<any[]>([]);
  const [allPatients, setAllPatients] = useState<any[]>([]);
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [upcoming, setUpcoming] = useState(false);
  const [doctorUsername, setDoctor] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPatientsLoading, setIsPatientsLoading] = useState(true);
const [isDoctorDataLoading, setIsDoctorDataLoading] = useState(true);
  

  const fetchPatients = async () => {
    console.log("Fetching patients...");
    setIsPatientsLoading(true);

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
    setIsPatientsLoading(false);

  };

  async function fetchDoctorData() {
    try {
      setIsDoctorDataLoading(true);

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
    setIsDoctorDataLoading(false);

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
  const handleSearchClick = () => {
    searchPatients();
  };
  return (
    <>
      <DoctorBar />
      <div style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '50vh',
        marginBottom: '100px',
        backgroundPosition: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      }}>
        <div style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
        }}>
          <h1><strong>MY PATIENTS</strong></h1>
        </div>
      </div>

     
        <Grid container spacing={2} justifyContent="center" style={{ marginTop: '-50px', marginBottom: '20px' }}>
          <Grid item xs={12} md={3} style={{ padding: '80px' }}>
          <Stack direction="column" style={{ position: "sticky", top: 100 }}>

            <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
              Search and Filter
            </Typography>
            <TextField
              label="patient Name"
              variant="outlined"
              value={nameSearchTerm}
              onChange={(e) => setNameSearchTerm(e.target.value)  }
              style={{ width: '100%', marginBottom: '16px' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearchClick}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <Typography>Patients with upcoming appooitnments:</Typography>
              <Switch
                checked={upcoming}
                onChange={handleUpcomingSwitch}
                name="upcoming-switch"
                style={{ marginLeft: '8px' }}
              />
            </div>
            </Stack>
          </Grid>

          <Grid item xs={12} md={9}>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {isPatientsLoading || isDoctorDataLoading ? (
      <CircularProgress />
    ) : patients && patients.length > 0 ? (
      patients.map((patient) => (
        <div key={patient._id}>
          <Patient patient={patient} doctor={doctorUsername} />
          {/* <Divider style={{ margin: '16px 0' }} /> */}
        </div>
      ))
    ) : (
      <Typography>No patients found.</Typography>
    )}
  </div>
</Grid>

        </Grid>

      <El7a2niInfo />
    </>
  );
};

export default MyPatients;
