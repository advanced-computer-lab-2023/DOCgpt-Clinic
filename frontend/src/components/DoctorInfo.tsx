import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
  SelectChangeEvent,
} from '@mui/material';
import AdminBar from '../components/admin Bar/adminBar';
import El7a2niAdminInfo from "./El7a2niAdmin-info";
import Background from '../doctorss.jpeg';
import Back from "./backButton";

interface Doctor {
  _id: string;
  username: string;
  name: string;
  email: string;
  dateofbirth: string;
  hourlyrate: number;
  affiliation: string;
  educationalBackground: string;
  speciality: string;
  // Add other properties as needed
}

const DoctorInfoDropdown: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [doctorInfo, setDoctorInfo] = useState<Doctor | null>(null);

  useEffect(() => {
    // Fetch the list of doctors when the component mounts
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/routes/admins/getdoc');

      if (response.status === 200) {
        setDoctors(response.data.doctors);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };
const customTypographyStyles = {
  fontWeight: 'bold', // makes the font weight bold
  color: '#333', // dark grey for better contrast
  fontSize: '1rem', // 1rem font size
  lineHeight: '1.5', // 1.5 line height for readability
  marginBottom: '0.5rem', // adds some space below each item
};

  const handleDoctorSelect = async (event: SelectChangeEvent<string>) => {
    const selectedUsername = event.target.value;
    setSelectedDoctor(selectedUsername);
  
    // Fetch the doctor's information when a doctor is selected
    if (selectedUsername) {
      fetchDoctorInfo(selectedUsername);
    }
  };
  

  const fetchDoctorInfo = async (username: string) => {
    try {
      const response = await axios.get(`/routes/admins/doctor?username=${username}`);

      if (response.status === 200) {
        setDoctorInfo(response.data.doctor);
      }
    } catch (error) {
      console.error('Error fetching doctor information:', error);
    }
  };
  const token = localStorage.getItem("authToken");
  if (!token) {
    return (
      <div>
        <Typography component="h1" variant="h5">
          access denied
        </Typography>
      </div>
    );
  }
  return (
    <>
      <AdminBar />
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
          <strong>DOCTORS INFO</strong>
        </h1>
      </div>
    </div>
      <Container maxWidth="md" sx={{ mt: 10 }}> {/* Increased mt value for more space */}
      <Paper 
  elevation={2} 
  sx={{ 
    p: 2, 
    backgroundColor: 'rgba(173, 216, 230, 0.29)', // Very light blue
  }}
>
          <Typography variant="h4" align="center" gutterBottom>
            Doctor Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select a Doctor</InputLabel>
                <Select
                  value={selectedDoctor}
                  onChange={handleDoctorSelect}
                  label="Select a Doctor"
                >
                  <MenuItem value="">Select a doctor</MenuItem>
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor._id} value={doctor.username}>
                      {doctor.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {doctorInfo && (
              <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="body1" style={customTypographyStyles}>
  Username: {doctorInfo.username}
</Typography>
<Typography variant="body1" style={customTypographyStyles}>
  Name: {doctorInfo.name}
</Typography>
<Typography variant="body1" style={customTypographyStyles}>
  Email: {doctorInfo.email}
</Typography>
<Typography variant="body1" style={customTypographyStyles}>
  Date of Birth: {doctorInfo.dateofbirth}
</Typography>
<Typography variant="body1" style={customTypographyStyles}>
  Hourly Rate: {doctorInfo.hourlyrate ? `$${doctorInfo.hourlyrate.toFixed(2)}` : 'Not available'}
</Typography>
<Typography variant="body1" style={customTypographyStyles}>
  Affiliation: {doctorInfo.affiliation}
</Typography>
<Typography variant="body1" style={customTypographyStyles}>
  Educational Background: {doctorInfo.educationalBackground}
</Typography>
<Typography variant="body1" style={customTypographyStyles}>
  Speciality: {doctorInfo.speciality}
</Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
      <El7a2niAdminInfo/>
    </>
  );
};

export default DoctorInfoDropdown;
