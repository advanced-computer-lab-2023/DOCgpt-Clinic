import React, { useState } from 'react';
import { Grid, Typography, Button, TextField, Container, Avatar, useTheme, Paper } from '@mui/material';
import axios from 'axios';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { CSSProperties } from '@mui/material/styles/createMixins';
import theme from '../theme';

interface DoctorAvailabilityProps {
  doctorUsername: any;
}

const DoctorAvailability: React.FC<DoctorAvailabilityProps> = ({ doctorUsername }) => {
  const theme = useTheme(); // Access the theme
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [inputDate, setInputDate] = useState<string>(''); // For input validation

  // Function to handle adding time slots to the database
  const addTimeSlotsToDatabase = async () => {
    try {
      // Make an API call to your backend
      const token=localStorage.getItem("authToken");
      await axios.patch(`/routes/doctors/addtimeslot?doctorUsername=${doctorUsername}`, {
        dates: selectedDates,
        Headers :{
          Authorization:`Bearer ${token}`
        },
      });

      // After a successful API call, you can perform any additional actions or update the UI
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
    <Grid container justifyContent="center" alignItems="center" style={styles.container}>
      <Paper elevation={20} style={styles.paper}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5">Add Time Slots</Typography>  
          </Grid>
          <div style={styles.space}></div> 
          <Grid item xs={12}>
            {/* Add CalendarMonthIcon inside the Grid container */}
            <div style={styles.avatarContainer}>
              <Avatar style={styles.avatar}>
                <CalendarMonthIcon />
              </Avatar>
            </div>
          </Grid>
          <div style={styles.space}></div> 
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
          </Grid>
          <div style={styles.space}></div> 
          <Grid item xs={12}>
            {/* Add CalendarMonthIcon beside the "Add Date" button */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDateChange(new Date(inputDate))}
            >
              Add Date
            </Button>
          </Grid>
          <div style={styles.space}></div> 
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
          <div style={styles.space}></div> 
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
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
    width: 800,
    height: 500,
    margin: '20px auto',
    textAlign: 'center', // Center the text
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.blue.main,
  },
  space: {
    height: 20,
  },
};

export default DoctorAvailability;
