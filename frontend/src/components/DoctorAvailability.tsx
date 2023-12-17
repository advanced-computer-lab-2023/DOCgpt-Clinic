import React, { useState } from 'react';
import { Grid, Typography, Button, TextField, Container, Avatar, useTheme, Paper, TextFieldProps } from '@mui/material';
import axios from 'axios';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { CSSProperties } from '@mui/material/styles/createMixins';
import theme from '../theme';
import { DatePicker, DesktopTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import Background from '../../Appointments.jpeg';
import Back from "./backButton";


interface DoctorAvailabilityProps {
  doctorUsername: any;
}

const DoctorAvailability: React.FC<DoctorAvailabilityProps> = ({ doctorUsername }) => {
  const theme = useTheme(); // Access the theme
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [inputDate, setInputDate] = useState<Date | null>(null);
  const [inputTime, setInputTime] = useState<Date | null>(null);


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

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      const currentDate = new Date();  
      // Check if the selected date is not in the past
      if (newDate >= currentDate) {
        setSelectedDates((prevDates) => [...prevDates, newDate]);
        setInputDate(newDate);
      } else {
        console.log('Selected date is in the past.');
      }
    }
  };
  

  const handleTimeChange = (newTime: Date | null) => {
    setInputTime(newTime);
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
      label="Select Date"
      value={inputDate}
      onChange={handleDateChange}
      disablePast
    />

            <DesktopTimePicker
              label="Select Time"
              value={inputTime}
              onChange={handleTimeChange}
            />
          </LocalizationProvider>

      </Grid>
          <div style={styles.space}></div> 
          <Grid item xs={12}>
            {/* Add CalendarMonthIcon beside the "Add Date" button */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                // Check if inputDate is valid
                if (inputDate) {
                  const newDate = new Date(inputDate);
                  // Check if the date is valid
                  if (!isNaN(newDate.getTime())) {
                    handleDateChange(newDate);
                  } else {
                    console.log('Invalid date selected.');
                    // Optionally, reset inputDate or show an error message
                  }
                } else {
                  console.log('No date selected.');
                  // Optionally, show an error message
                }
              }}
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
