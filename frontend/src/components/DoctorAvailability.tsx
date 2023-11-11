import React, { useState } from 'react';
import { Grid, Typography, Button, TextField, Container } from '@mui/material';
import axios from 'axios';

interface DoctorAvailabilityProps {
  doctorUsername: any;
}

const DoctorAvailability: React.FC<DoctorAvailabilityProps> = ({ doctorUsername }) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [inputDate, setInputDate] = useState<string>(''); // For input validation

  // Function to handle adding time slots to the database
  const addTimeSlotsToDatabase = async () => {
    try {
      // Make an API call to your backend
      await axios.patch(`/routes/doctors/addtimeslot?doctorUsername=${doctorUsername}`, {
        dates: selectedDates,
      });

      // After successful API call, you can perform any additional actions or update the UI
    } catch (error) {
      console.error('Error adding time slots:', error);
    }
  };

  const handleDateChange = (date: Date | null) => {
    // You can add custom validation or formatting here
    if (date) {
      setSelectedDates((prevDates) => [...prevDates, date]);
      setInputDate(''); // Clear input field after selecting a date
    }
  };

  const handleRemoveDate = (index: number) => {
    setSelectedDates((prevDates) => {
      const updatedDates = [...prevDates];
      updatedDates.splice(index, 1);
      return updatedDates;
    });
  };

  const handleSubmit = () => {
    // Add time slots to the database
    addTimeSlotsToDatabase();
  };

  return (
    <Container>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5">Doctor Availability</Typography>
      </Grid>
      <Grid item xs={12}>
        {/* Use a date picker library (e.g., MUI's DatePicker) */}
        <TextField
          id="date"
          label="Select Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={() => handleDateChange(new Date(inputDate))}>
          Add Date
        </Button>
      </Grid>
      <Grid item xs={12}>
        {/* Display selected dates */}
        <Typography variant="subtitle1">Selected Dates:</Typography>
        {selectedDates.map((date, index) => (
          <div key={index}>
            {date.toLocaleDateString()}{' '}
            <Button variant="text" color="secondary" onClick={() => handleRemoveDate(index)}>
              Remove
            </Button>
          </div>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  </Container>
  );
};

export default DoctorAvailability;