import React, { useState } from 'react';
import { Grid, Typography, Button, TextField, Container, Avatar,  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, useTheme, Paper } from '@mui/material';
import axios from 'axios';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { CSSProperties } from '@mui/material/styles/createMixins';
import theme from '../../theme';
import DrawerAppBar from '../Doctor bar/doctorBar';

const DoctorAvailability: React.FC = () => {
  const theme = useTheme(); // Access the theme
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [inputDate, setInputDate] = useState<string>('');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const addTimeSlotsToDatabase = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.patch(
        '/routes/doctors/addtimeslot',
        {
          dates: selectedDates,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Time slots added successfully:', response.data);
      setSuccessDialogOpen(true);
    } catch (error) {
      console.error('Error adding time slots:', error);
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDates((prevDates) => [...prevDates, date]);
      setInputDate('');
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
    addTimeSlotsToDatabase();
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };
  return (
    <>
    <DrawerAppBar/>
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
    <Dialog open={successDialogOpen} onClose={handleCloseSuccessDialog}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            The selected date is added successfully.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
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

export default DoctorAvailability