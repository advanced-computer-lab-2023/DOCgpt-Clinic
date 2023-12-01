import {
  Container,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Patient from "../../components/Patient";
import SearchIcon from "@mui/icons-material/Search";

interface Patient {
  _id: string;
  username: string;
  name: string;
  email: string;
  //   password: string;
  //   dateOfBirth: string;
  mobilenumber: number;
  emergencyContact: {
    fullName: string;
    mobileNumber: string;
    relation: string;
  };
  familyMembers: [
    {
      name: {
        type: String;
      };
      nationalId: {
        type: String;
      };
      age: {
        type: Number;
      };
      gender: {
        type: String;
      };
      relationToPatient: {
        type: String;
        enum: ["wife", "husband", "child"];
      };
    }
  ];
}

function MyPatients() {
  //THE LOGIC OF VIEWING A DOCTOR'S PATIENTS
  //THE LINK TO BACK
  const [patients, setpatients] = useState<any[]>([]);
  const [allPatients, setAllPatients] = useState<any[]>([]);
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [upcoming, setupcoming] = useState(false);
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
        setpatients(data);
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
        setpatients(allPatients);
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
        setpatients(data);
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
        setpatients(data);
      } else {
        console.error("Failed to fetch doctor data");
      }
    } catch (error) {
      console.error("Error searching for doctors: ", error);
    }
  }

  useEffect(() => {
    if (upcoming) {
      //fetch upcomming patients from the backendd
      //set filtered patients to the response
      getUpcomingPatients();
    } else {
      setpatients(allPatients);
    }
  }, [upcoming]);

  const handleUpcomingSwitch = () => {
    setupcoming((prevSwitchState) => !prevSwitchState);
  };

  //return
  //THE VIEW (THE COMPONENTS)
  //1- UPCOMING SWITCH
  //2- SEARCH BAR TO SEARCH BY NAME
  //3- LIST OF PATIENTS

  // A PATIENT COMPONENT ITSELF SHOULD CONTAIN:
  //1- A BUTTON TO THE HEALTH RECORDS PAGE/ EMPTY PAGE
  //2- THE PATIENT ITSELF ON CLICK SHOULD NAVIGATE TO ANOTHER PAGE TO SHOW ITS INFO
  return (
    <Container>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Typography variant="h3" style={{ fontWeight: "bold" }}>
            Your Current Registered Patients
          </Typography>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            label="Search by Name"
            variant="outlined"
            value={nameSearchTerm}
            onChange={(e) => setNameSearchTerm(e.target.value)}
          />

          <IconButton onClick={searchPatients}>
            <SearchIcon />
          </IconButton>
        </div>
        <Stack>
          <Typography>Upcoming:</Typography>
          <div>
            <Switch
              checked={upcoming}
              onChange={handleUpcomingSwitch}
              name="upcoming-switch"
            />
            <span>{upcoming ? "Upcoming" : "All"}</span>
          </div>
        </Stack>
        <Container>
          {patients &&
            patients.map((patient) => (
              <Patient patient={patient} doctor={doctorUsername} />
            ))}
          {/* {filteredPatients && filteredPatients.map((patient) => (
                <Patient patient={patient}/>
            ))} */}
        </Container>
      </Container>
    </Container>
  );
}

export default MyPatients;
