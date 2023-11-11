

import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  SnackbarContent,
} from '@mui/material';
import { AddCircleOutline, Male, Female } from '@mui/icons-material'; // Import MUI icons
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import DrawerAppBar from '../../components/patientBar/patientBar';

const AddFamilyMemberForm = () => {
  const navigate =useNavigate();
  const [familyMember, setFamilyMember] = useState({
    name: '',
    nationalId: '',
    age: '',
    gender: 'Male', // Default to Male
    relationToPatient: 'wife', // Default to 'wife'
    healthPackageSubscription: {
      name: '',
      startdate: '',
      enddate: '',
      status: '',
    },
  });

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFamilyMember((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenderChange = (e: { target: { value: any; }; }) => {
    setFamilyMember((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
  };

  const handleRelationChange = (e: { target: { value: any; }; }) => {
    setFamilyMember((prevData) => ({
      ...prevData,
      relationToPatient: e.target.value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(
        '/routes/patient/addfammember',
        familyMember,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success, e.g., show a success message or redirect
      console.log('Family member added successfully:', response.data);
      setSuccessSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding family member:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSuccessSnackbarOpen(false);
    navigate('/patient/home')
  };

  return (
    <>
    <DrawerAppBar/>
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Family Member
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={familyMember.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="National ID"
              name="nationalId"
              value={familyMember.nationalId}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={familyMember.age}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={familyMember.gender}
                onChange={handleGenderChange}
              >
                <MenuItem value="Male">
                  <Male />
                  Male
                </MenuItem>
                <MenuItem value="Female">
                  <Female />
                  Female
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Relation to Patient</InputLabel>
              <Select
                value={familyMember.relationToPatient}
                onChange={handleRelationChange}
              >
                <MenuItem value="wife">Wife</MenuItem>
                <MenuItem value="husband">Husband</MenuItem>
                <MenuItem value="child">Child</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutline />}
        >
          Add Family Member
        </Button>
      </form>

      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          message="Family member added successfully"
          style={{ backgroundColor: 'green' }}
        />
      </Snackbar>
    </Container>
    </>
  );
};

export default AddFamilyMemberForm;
