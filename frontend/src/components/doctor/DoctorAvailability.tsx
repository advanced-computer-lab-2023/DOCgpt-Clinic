import React, { useState } from 'react';
import { Grid, Typography, Button, TextField, Container, Avatar,  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, useTheme, Paper, FormControl } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import isBefore from 'date-fns/isBefore';
import startOfDay from 'date-fns/startOfDay';
import axios from 'axios';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import { CSSProperties } from '@mui/material/styles/createMixins';
import theme from '../../theme';
import El7a2niInfo from "../../components/El7a2ni-info";
import Background from '../../Background.jpeg';
import DrawerAppBar from '../Doctor bar/doctorBar';
import { isSameDay } from 'date-fns';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TimePicker from '@mui/lab/TimePicker';



const DoctorAvailability: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState();
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

  const handleDateAccept = (date: Date | null) => {
    if (date) {
      setInputDate(date.toISOString().split('T')[0]); // Format the date to yyyy-MM-dd
    }
  };
  
  const handleTimeChange = (event: any) => {
    console.log("time", event.target.value);
    setSelectedTime(event.target.value);
  };

  const handleAdd = () =>{
    console.log(selectedTime);
    const combinedDateTimeString = `${inputDate}T${selectedTime}:00.000Z`;
    const date = new Date(combinedDateTimeString);
    setSelectedDates((prevDates) => [...prevDates, date]);
    console.log("combined:", combinedDateTimeString);
    console.log("added",date);
    console.log("selected dates: ", selectedDates);
  }


  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };
  return (
    <div
        style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: "cover",
            minHeight: "100vh",
            backgroundPosition: "center",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Increased shadow values
        }}
        >
    <>
    <DrawerAppBar/>
    <Grid container justifyContent="center" alignItems="center" style={styles.container}>
      <Paper elevation={15} style={styles.paper}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5">When are you free?</Typography>  
          </Grid>
          <div style={styles.space}></div> 

          <Grid container spacing={2}>
          <Grid item xs={6}>
            <div style={styles.avatarContainer}>
              <Avatar style={styles.avatar}>
                <CalendarMonthIcon />
              </Avatar>
            </div>
            <div style={styles.space}></div> 
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormControl fullWidth>
              <DatePicker
                label="Select Date"
                value={inputDate ? new Date(inputDate) : null}
                shouldDisableDate={(date) => isBefore(date, startOfDay(new Date()))}
                onAccept={handleDateAccept}
                
              />
              </FormControl>
            </LocalizationProvider>
          </Grid>
          <div style={styles.space}></div> 
          
          <Grid item xs={6}>
          <div style={styles.avatarContainer}>
              <Avatar style={styles.avatar}>
                <AccessTimeFilledRoundedIcon />
              </Avatar>
            </div>
            <div style={styles.space}></div> 
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FormControl fullWidth>
                  <TextField
                    type="time"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    variant="outlined"
                  />
                </FormControl>
                </LocalizationProvider>

          </Grid>
          <div style={styles.space}></div> 
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAdd}>
              Add
            </Button>
          </Grid>
          </Grid>

          <Grid item xs={12}>
            {/* Display selected dates */}
            <Typography variant="subtitle1">Selected Dates:</Typography>
            {selectedDates.map((date, index) => (
              <div key={index}>
                {date.toISOString().split('T')[1].substring(0, 5)}
                {"  "}
                {`${date.toLocaleString([], {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}`}

                <IconButton color="secondary" onClick={() => handleRemoveDate(index)}>
                  <ClearIcon />
                </IconButton>
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
      <El7a2niInfo />
    </>
    </div>
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