import React, { useState, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Define the Patient interface to match the Mongoose schema
interface Patient {
  username: string;
  name: string;
  email: string;
  password: string;
  dateofbirth: string;
  mobilenumber: string;
  emergencyContact: {
    fullName: string;
    mobileNumber: string;
    relation: string;
  };
  familyMembers: Array<{
    name: string;
    nationalId: string;
    age: string;
    gender: string;
    relationToPatient: string;
  }>;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient>({
    username: '',
    name: '',
    email: '',
    password: '',
    dateofbirth: '',
    mobilenumber: '',
    emergencyContact: {
      fullName: '',
      mobileNumber: '',
      relation: '',
    },
    familyMembers: [],
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setPatient((prevPatient) => ({
      ...prevPatient,
      [field]: value,
    }));
  };

  const handleEmergencyContactChange = (field: string, value: string) => {
    setPatient((prevPatient) => ({
      ...prevPatient,
      emergencyContact: {
        ...prevPatient.emergencyContact,
        [field]: value,
      },
    }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!patient.username) {
      errors.username = 'Username is required';
    }
    if (!patient.name) {
      errors.name = 'Name is required';
    }
    if (!patient.email) {
      errors.email = 'Email is required';
    }
    if (!patient.password) {
      errors.password = 'Password is required';
    }
    if (!patient.dateofbirth) {
      errors.dateofbirth = 'Date of birth is required';
    }
    if (!patient.mobilenumber) {
      errors.mobilenumber = 'Mobile number is required';
    }
    if (!patient.emergencyContact.fullName) {
      errors.emergencyContactFullName = 'Full name of the emergency contact is required';
    }
    if (!patient.emergencyContact.mobileNumber) {
      errors.emergencyContactMobileNumber = 'Mobile number of the emergency contact is required';
    }
    if (!patient.emergencyContact.relation) {
      errors.emergencyContactRelation = 'Relation of the emergency contact is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Send the patient data to the server for signup
      fetch('/routes/postP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigate(`/patient/home/${data.username}`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={styles.container}>
      <Paper elevation={20} style={styles.paper}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Avatar style={styles.avatar}>
              <AddCircleOutlineIcon />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h5" style={styles.header}>Patient Signup</Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">Please fill this form to create an account!</Typography>
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            placeholder="Enter your Username"
            value={patient.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
          />
          {formErrors.username && <div style={{ color: 'red' }}>{formErrors.username}</div>}

          <TextField
            fullWidth
            label="Name"
            placeholder="Enter your Name"
            value={patient.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          {formErrors.name && <div style={{ color: 'red' }}>{formErrors.name}</div>}

          <TextField
            fullWidth
            label="Password"
            placeholder="Enter your password"
            value={patient.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
          {formErrors.password && <div style={{ color: 'red' }}>{formErrors.password}</div>}

          <TextField
            fullWidth
            label="Email"
            placeholder="Enter your email"
            value={patient.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          {formErrors.email && <div style={{ color: 'red' }}>{formErrors.email}</div>}

          <TextField
            fullWidth
            
            type="date"
            value={patient.dateofbirth}
            onChange={(e) => handleInputChange('dateofbirth', e.target.value)}
          />
          {formErrors.dateofbirth && <div style={{ color: 'red' }}>{formErrors.dateofbirth}</div>}

          <TextField
            fullWidth
            label="Mobile Number"
            type="number"
            value={patient.mobilenumber}
            onChange={(e) => handleInputChange('mobilenumber', e.target.value)}
          />
          {formErrors.mobilenumber && <div style={{ color: 'red' }}>{formErrors.mobilenumber}</div>}

          <TextField
            fullWidth
            label="Emergency Contact - Full Name"
            placeholder="Enter full name of the emergency contact"
            value={patient.emergencyContact.fullName}
            onChange={(e) => handleEmergencyContactChange('fullName', e.target.value)}
          />
          {formErrors.emergencyContactFullName && (
            <div style={{ color: 'red' }}>{formErrors.emergencyContactFullName}</div>
          )}

          <TextField
            fullWidth
            label="Emergency Contact - Mobile Number"
            placeholder="Enter mobile number of the emergency contact"
            value={patient.emergencyContact.mobileNumber}
            onChange={(e) => handleEmergencyContactChange('mobileNumber', e.target.value)}
          />
          {formErrors.emergencyContactMobileNumber && (
            <div style={{ color: 'red' }}>{formErrors.emergencyContactMobileNumber}</div>
          )}

          <TextField
            fullWidth
            label="Emergency Contact - Relation"
            placeholder="Enter relation of the emergency contact"
            value={patient.emergencyContact.relation}
            onChange={(e) => handleEmergencyContactChange('relation', e.target.value)}
          />
          {formErrors.emergencyContactRelation && (
            <div style={{ color: 'red' }}>{formErrors.emergencyContactRelation}</div>
          )}

          <div style={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" color="primary">
              Signup
            </Button>
          </div>
        </form>
      </Paper>
    </Grid>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: '100vh',
  },
  paper: {
    padding: '30px 20px',
    width: 500,
    margin: "20px auto",
  },
  avatar: {
    backgroundColor: "blue",
  },
  header: {
    margin: 0,
  },
};

export default Signup;