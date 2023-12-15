import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Patient from "../../components/Patient";
import SearchIcon from "@mui/icons-material/Search";
import DocDetails from "../../components/DocDetails";
import PatientAppBar from "../../components/patientBar/patientBar";
import El7a2niInfo from "../../components/El7a2ni-info";
import Background from '../../Background.jpeg';


interface Doctor {
  name: string;
  email: string;
  hourlyRate: number;
  speciality: string;
  timeslots: [{ date: Date }];
  educationalBackground: string;
}

function ViewDoctors() {
  //THE LOGIC OF VIEWING A DOCTOR'S PATIENTS
  //THE LINK TO BACK
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState();
  const [doctors, setdoctors] = useState<any[]>([]);
  const [allDoctors, setAllDoctors] = useState<any[]>([]);
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [specialitySearchTerm, setspecialitySearchTerm] = useState("");
  const [speciality, setspeciality] = useState<string[]>([]);

  const fetchDoctors = async () => {
    console.log("Fetching Doctors...");
    try {
      const response = await axios.get(`/routes/doctors/`);
      if (response) {
        console.log("Response:", response);
        const data = await response.data;
        setdoctors(data);
        setAllDoctors(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  async function searchDoctorsbyName() {
    try {
      if (!nameSearchTerm) {
        setdoctors(allDoctors);
      }
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `/routes/patient/doctors/search?name=${nameSearchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        console.log("Response:", response);
        const data = await response.data;
        setdoctors(data);
      } else {
        console.error("Failed to fetch doctor data");
      }
    } catch (error) {
      console.error("Error searching for doctors: ", error);
    }
  }
  async function searchDoctorsbySpeciality() {
    try {
      if (!specialitySearchTerm) {
        setdoctors(allDoctors);
      }
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `/routes/patient/doctors/search?speciality=${specialitySearchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        console.log("Response:", response);
        const data = await response.data;
        setdoctors(data);
      } else {
        console.error("Failed to fetch doctor data");
      }
    } catch (error) {
      console.error("Error searching for doctors: ", error);
    }
  }

  const FilterBySpec = () => {
    console.log(speciality);

    // Filter medicines based on the search value
    const filtered = doctors.filter((doctor: any) =>
      speciality.includes(doctor.speciality.toLowerCase())
    );
    setdoctors(filtered);
    if (speciality.includes("all")) {
      setdoctors(allDoctors);
    }
  };

  const choosespeciality = (event: any) => {
    speciality.push(event.target.value);
  };

  const handleDateChange = (event: any) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
  };
  

  const handleTimeChange = (event: any) => {
    console.log("time", event.target.value);
    setSelectedTime(event.target.value);
  };

  const filterDateTime = () => {
    const filteredDoctors = doctors.filter((doctor) => {
      // Convert the Mongoose date to "YYYY-MM-DD" format
      const combinedDateTimeString = `${selectedDate}T${selectedTime}:00.000Z`;

      console.log(combinedDateTimeString);

      // Check if the timeslots array contains the combined date and time
      return doctor.timeslots.some((timeslot: any) => {
        const timeslotDateTimeString = new Date(timeslot.date).toISOString();
        console.log(timeslotDateTimeString);
        
        return timeslotDateTimeString === combinedDateTimeString;
      });
    });

    setdoctors(filteredDoctors);
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
    <div
    style={{
      backgroundImage: `url(${Background})`,
      backgroundSize: 'cover',
      minHeight: '100vh',
      backgroundPosition: 'center',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Increased shadow values
    }}
  >  
    <>
      <PatientAppBar />
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
            <Typography variant="h1" style={{ fontWeight: "bold" }}>
              All Doctors
            </Typography>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Stack direction="column" style={{ position: "sticky", top: 100 }}>
                <TextField
                  label="Search by Name"
                  variant="outlined"
                  value={nameSearchTerm}
                  onChange={(e) => setNameSearchTerm(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={searchDoctorsbyName}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box sx={{ marginTop: "10px" }} />{" "}
                {/* Add space between filters */}
                <TextField
                  label="Search by Speciality"
                  variant="outlined"
                  value={specialitySearchTerm}
                  onChange={(e) => setspecialitySearchTerm(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={searchDoctorsbySpeciality}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box sx={{ marginTop: "10px" }} />{" "}
                {/* Add space between filters */}
                <FormControl fullWidth >
                  <Typography>Pick a Date:</Typography>
                  <TextField
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    variant="outlined"
                    
                  />
                </FormControl>
                <Box sx={{ marginTop: "10px" }} />{" "}
                {/* Add space between filters */}
                <FormControl fullWidth>
                  <Typography>Pick a Time:</Typography>
                  <TextField
                    type="time"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    variant="outlined"
                    
                  />
                </FormControl>
                <Button onClick={filterDateTime} style={{ marginTop: "10px" }}>
                  Filter
                </Button>
                <Box sx={{ marginTop: "10px" }} />{" "}
                {/* Add space between filters */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Filter By Speciality:
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={speciality}
                    onChange={choosespeciality}
                  >
                    <MenuItem value={"cardiologist"}>Cardiologist</MenuItem>
                    <MenuItem value={"heart"}>Heart</MenuItem>
                    <MenuItem value={"dermatologist"}>Dermatologist</MenuItem>
                    <MenuItem value={"allergist"}>Allergist</MenuItem>
                    <MenuItem value={"neurologist"}>Neurologist</MenuItem>
                    <MenuItem value={"all"}>All</MenuItem>
                  </Select>
                </FormControl>
                {speciality &&
                  speciality.map((element) => (
                    <Typography key={element} sx={{ marginTop: "10px" }}>
                      {element}
                    </Typography>
                  ))}
                <Box sx={{ marginTop: "10px" }} />{" "}
                {/* Add space between filters */}
                <Button onClick={FilterBySpec}>Filter</Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={8}>
              <Container>
                {doctors &&
                  doctors.map((doctor) => (
                    <Grid item xs={12} key={doctor.email}>
                      <DocDetails doctor={doctor}></DocDetails>
                    </Grid>
                  ))}
              </Container>
            </Grid>
          </Grid>
        </Container>
      </Container>
      <El7a2niInfo/>
    </>
    </div>
  );
}

export default ViewDoctors;
