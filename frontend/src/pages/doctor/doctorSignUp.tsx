import React, { useState, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the Doctor interface to match the Mongoose schema
interface Doctor {
  username: string;
  name: string;
  email: string;
  password: string;
  dateOfBirth: string; // Adjust the type if it's not a string
  hourlyRate: string; // Adjust the type if it's not a string
  affiliation: string;
  speciality: string;
  educationalBackground: string;
}

const SignupDoctor = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor>({
    username: '',
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    hourlyRate: '',
    affiliation: '',
    speciality: '',
    educationalBackground: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    // Add validation logic here, e.g., checking if fields are not empty, etc.
    if (!doctor.username) {
      errors.username = 'Username is required';
    }
    if (!doctor.name) {
      errors.name = 'Name is required';
    }
    if (!doctor.email) {
      errors.email = 'Email is required';
    }
    if (!doctor.password) {
      errors.password = 'Password is required';
    }
    if (!doctor.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    }
    if (!doctor.hourlyRate) {
      errors.hourlyRate = 'Hourly rate is required';
    }
    if (!doctor.affiliation) {
      errors.affiliation = 'Affiliation is required';
    }
    if (!doctor.speciality) {
      errors.speciality = 'Speciality is required';
    }
    if (!doctor.educationalBackground) {
      errors.educationalBackground = 'Educational background is required';
    }

    // Add more validations for other fields as needed

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Send the doctor data to the server for signup
      fetch('/routes/doctors/postDoctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctor),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server
          console.log("object posted is" + data);
            navigate(`/doctor/login`);
          
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  };

  return (
    <div style={styles.container}>
      <h2>Doctor Signup</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label>Username:</label>
          <input
            type="text"
            value={doctor.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            style={styles.input}
          />
          {formErrors.username && <div style={{ color: 'red' }}>{formErrors.username}</div>}
        </div>
        <div style={styles.formGroup}>
          <label>Name:</label>
          <input
            type="text"
            value={doctor.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            style={styles.input}
          />
          {formErrors.name && <div style={{ color: 'red' }}>{formErrors.name}</div>}
        </div>
        <div style={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={doctor.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            style={styles.input}
          />
          {formErrors.email && <div style={{ color: 'red' }}>{formErrors.email}</div>}
        </div>
        <div style={styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={doctor.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            style={styles.input}
          />
          {formErrors.password && <div style={{ color: 'red' }}>{formErrors.password}</div>}
        </div>
        <div style={styles.formGroup}>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={doctor.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            style={styles.input}
          />
          {formErrors.dateOfBirth && <div style={{ color: 'red' }}>{formErrors.dateOfBirth}</div>}
        </div>
        <div style={styles.formGroup}>
          <label>Hourly Rate:</label>
          <input
            type="number"
            value={doctor.hourlyRate}
            onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
            style={styles.input}
          />
          {formErrors.hourlyRate && <div style={{ color: 'red' }}>{formErrors.hourlyRate}</div>}
        </div>
        <div style={styles.formGroup}>
          <label>Affiliation:</label>
          <input
            type="text"
            value={doctor.affiliation}
            onChange={(e) => handleInputChange('affiliation', e.target.value)}
            style={styles.input}
          />
          {formErrors.affiliation && <div style={{ color: 'red' }}>{formErrors.affiliation}</div>}
        </div>
        <div style={styles.formGroup}>
          <label>Speciality:</label>
          <input
            type="text"
            value={doctor.speciality}
            onChange={(e) => handleInputChange('speciality', e.target.value)}
            style={styles.input}
          />
          {formErrors.speciality && <div style={{ color: 'red' }}>{formErrors.speciality}</div>}
        </div>
        <div style={styles.formGroup}>
          <label>Educational Background:</label>
          <input
            type="text"
            value={doctor.educationalBackground}
            onChange={(e) => handleInputChange('educationalBackground', e.target.value)}
            style={styles.input}
          />
          {formErrors.educationalBackground && (
            <div style={{ color: 'red' }}>{formErrors.educationalBackground}</div>
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

export default SignupDoctor;
