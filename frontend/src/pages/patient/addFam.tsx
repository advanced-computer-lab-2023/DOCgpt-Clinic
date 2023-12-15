import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  IconButton,
  MenuItem,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { AddCircleOutline, Male, Female, Close } from '@mui/icons-material';
import axios from 'axios';

interface AddFamilyMemberFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddFamilyMemberForm: React.FC<AddFamilyMemberFormProps> = ({ open, setOpen }) => {
  const [familyMember, setFamilyMember] = useState({
    name: '',
    nationalId: '',
    age: '',
    gender: 'Male', // Default to Male
    relationToPatient: '',
  });
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFamilyMember({ ...familyMember, [name]: value });
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyMember({ ...familyMember, gender: e.target.value });
  };

  const handleRelationChange = (event: SelectChangeEvent) => {
    setFamilyMember({ ...familyMember, relationToPatient: event.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here, implement the API call to submit the data
    // For now, just logging the data and showing a success message

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
      console.log('Family member added successfully:', response.data);
      setSuccessSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding family member:', error);
    }
    console.log(familyMember);
    setSuccessSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSuccessSnackbarOpen(false);
    setOpen(false); // Close the dialog after submission
    window.location.reload();
    };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
      <DialogTitle>
        Add Family Member
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          style={{ position: 'absolute', right: 8, top: 8 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={familyMember.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="National ID"
                name="nationalId"
                value={familyMember.nationalId}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset">
                <RadioGroup row name="gender" value={familyMember.gender} onChange={handleGenderChange}>
                  <FormControlLabel value="Male" control={<Radio />} label={<Male />} />
                  <FormControlLabel value="Female" control={<Radio />} label={<Female />} />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Relation to Patient</InputLabel>
                <Select
                  name="relationToPatient"
                  value={familyMember.relationToPatient}
                  onChange={handleRelationChange}
                  required
                  >
                  <MenuItem value="wife">wife</MenuItem>
                  <MenuItem value="husband">husband</MenuItem>
                  <MenuItem value="child">child</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutline />}
            style={{ marginTop: '20px' }}>
            Add Family Member
          </Button>
        </form>
      </DialogContent>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}>
        <Button onClick={handleCloseSnackbar}>Family member added successfully</Button>
      </Snackbar>
    </Dialog>
  );
};

export default AddFamilyMemberForm;
