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
import El7a2niInfo from './El7a2ni-info';

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

  return (
    <>
      <AdminBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
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
                  <Typography variant="h6" gutterBottom>
                    Doctor Information
                  </Typography>
                  <Typography variant="body1">Username: {doctorInfo.username}</Typography>
                  <Typography variant="body1">Name: {doctorInfo.name}</Typography>
                  <Typography variant="body1">Email: {doctorInfo.email}</Typography>
                  <Typography variant="body1">Date of Birth: {doctorInfo.dateofbirth}</Typography>
                  <Typography variant="body1">Hourly Rate: {doctorInfo.hourlyrate}</Typography>
                  <Typography variant="body1">Affiliation: {doctorInfo.affiliation}</Typography>
                  <Typography variant="body1">Educational Background: {doctorInfo.educationalBackground}</Typography>
                  <Typography variant="body1">Speciality: {doctorInfo.speciality}</Typography>
                  {/* Include other doctor fields here */}
                </Paper>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
      <El7a2niInfo/>
    </>
  );
};

export default DoctorInfoDropdown;
