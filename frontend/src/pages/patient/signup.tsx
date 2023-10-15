

import React, { useState, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the Patient interface to match the Mongoose schema
interface Patient {
  username: string;
  name: string;
  email: string;
  password: string;
  dateofbirth: string; // Adjust the type if it's not a string
  mobilenumber: string; // Adjust the type if it's not a string
  emergencyContact: {
    fullName: string;
    mobileNumber: string;
    relation: string;
  };
  familyMembers: Array<{
    name: string;
    nationalId: string;
    age: string; // Adjust the type if it's not a string
    gender: string;
    relationToPatient: string;
  }>;
}

const Signup = () => {
  const navigate = useNavigate(); // Use useNavigate within the component

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
    // Add validation logic here, e.g., checking if fields are not empty, etc.
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

    // Add more validations for other fields as needed

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
          // Handle the response from the server
          console.log(data);
          navigate(`/patient/home/${data.username}`); // Redirect to the patientHome page after successful signup
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  };

  const styles: { [key: string]: CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    formGroup: {
      marginBottom: 10,
    },
    input: {
      width: '100%',
      padding: '5px',
    },
    submitButton: {
      marginTop: 10,
    },
    button: {
      padding: '10px',
      background: 'blue',
      color: 'white',
      border: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Patient Signup</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label>Username:</label>
          <input
            type="text"
            value={patient.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            style={styles.input}
          />
          {formErrors.username && <div style={{ color: 'red' }}>{formErrors.username}</div>}
        </div>
        <div style={styles.formGroup}>
          <label>Name:</label>
          <input
            type="text"
            value={patient.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            style={styles.input}
          />
          {formErrors.name && <div style={{ color: 'red' }}>{formErrors.name}</div>}
        </div>
        <div style={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={patient.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            style={styles.input}
          />
          {formErrors.email && <div style={{ color: 'red' }}>{formErrors.email}</div>}
        </div>
        <div style={styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={patient.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            style={styles.input}
          />
          {formErrors.password && <div style={{ color: 'red' }}>{formErrors.password}</div>}
        </div>
        <div style={styles.formGroup}>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={patient.dateofbirth}
            onChange={(e) => handleInputChange('dateofbirth', e.target.value)}
            style={styles.input}
          />
          {formErrors.dateofbirth && <div style={{ color: 'red' }}>{formErrors.dateofbirth}</div>}
        </div>
        <div style={styles.formGroup}>
          <label>Mobile Number:</label>
          <input
            type="number"
            value={patient.mobilenumber}
            onChange={(e) => handleInputChange('mobilenumber', e.target.value)}
            style={styles.input}
          />
          {formErrors.mobilenumber && <div style={{ color: 'red' }}>{formErrors.mobilenumber}</div>}
        </div>
        <div style={styles.formGroup}>
          <label>Emergency Contact:</label>
          <input
            type="text"
            placeholder="Full Name"
            value={patient.emergencyContact.fullName}
            onChange={(e) => handleEmergencyContactChange('fullName', e.target.value)}
            style={styles.input}
          />
          {formErrors.emergencyContactFullName && (
            <div style={{ color: 'red' }}>{formErrors.emergencyContactFullName}</div>
          )}
          <input
            type="text"
            placeholder="Mobile Number"
            value={patient.emergencyContact.mobileNumber}
            onChange={(e) => handleEmergencyContactChange('mobileNumber', e.target.value)}
            style={styles.input}
          />
          {formErrors.emergencyContactMobileNumber && (
            <div style={{ color: 'red' }}>{formErrors.emergencyContactMobileNumber}</div>
          )}
          <input
            type="text"
            placeholder="Relation"
            value={patient.emergencyContact.relation}
            onChange={(e) => handleEmergencyContactChange('relation', e.target.value)}
            style={styles.input}
          />
          {formErrors.emergencyContactRelation && (
            <div style={{ color: 'red' }}>{formErrors.emergencyContactRelation}</div>
          )}
        </div>
        <div style={styles.submitButton}>
          <button type="submit" style={styles.button}>
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
