import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, TextField, Container, Avatar,  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, useTheme, Paper, FormControl, List, ListItem, Alert, Snackbar } from '@mui/material';
  import CircularProgress from '@mui/material/CircularProgress';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import isBefore from 'date-fns/isBefore';
import startOfDay from 'date-fns/startOfDay';
import axios from 'axios';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import { CSSProperties } from '@mui/material/styles/createMixins';
import theme from '../../theme';
import El7a2niDocInfo from '../El7a2niDoc-info';
import DrawerAppBar from '../Doctor bar/doctorBar';
import { isSameDay } from 'date-fns';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TimePicker from '@mui/lab/TimePicker';
import MuiAlert from '@mui/material/Alert';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import DoctorTimeSlot from './DoctorTimeSlot';
import Background from '../../Appointments.jpeg';
import Back from "../../components/backButton";

interface Timeslot {
  date: Date;
  // Add other properties as needed
}


const DoctorAvailability: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState();
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
  const theme = useTheme(); // Access the theme
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [inputDate, setInputDate] = useState<string>('');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [disableAdd, setDisableAdd] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);


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
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding time slots:', error);
    }
  };

  useEffect(() => {
    setIsLoading(true); // Start loading
  
    // Fetch timeslots from the backend
    const fetchData = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get('/routes/doctors/getSlots', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setTimeslots(response.data.timeslots);
    } catch (error) {
        console.error('Error fetching timeslots:', error);
    }
    finally {
      setIsLoading(false); // Finish loading (whether successful or not)
    }
};

fetchData();
}, []); // Empty dependency array ensures that this effect runs only once on component mount


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
    if(selectedTime && disableAdd){
      setDisableAdd(false);
    }
  };
  
  const handleTimeChange = (event: any) => {
    console.log("time", event.target.value);
    setSelectedTime(event.target.value);
    if(inputDate){
      setDisableAdd(false);
    }
  };

  const handleAdd = () =>{
    console.log(selectedTime);
    const combinedDateTimeString = `${inputDate}T${selectedTime}:00.000Z`;
    const date = new Date(combinedDateTimeString);
    setSelectedDates((prevDates) => [...prevDates, date]);
    console.log("combined:", combinedDateTimeString);
    console.log("added",date);
    console.log("selected dates: ", selectedDates);
    setDisableAdd(true);
    setDisableSubmit(false);
  }

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
    window.location.reload();

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
    <>
    <DrawerAppBar/>
   <div
      style={{
        position: 'relative',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '50vh',
        marginBottom: '100px',
        backgroundPosition: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Transparent overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      ></div>

      <Back />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h1>
          <strong>ADD TIME SLOTS</strong>
        </h1>
      </div>
    </div>

       
          
    <Snackbar
  open={snackbarOpen}
  autoHideDuration={2000}
  onClose={() => setSnackbarOpen(false)}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
>
  <MuiAlert severity="success" sx={{ width: '100%', fontSize: '1.5rem' }}>
    Time Slots Added Successfully
  </MuiAlert>
</Snackbar>


        <Grid container alignItems="center" >
          <Grid item xs={6} >
          <Grid container justifyContent="center" alignItems="center" style={styles.container} >
              <Paper elevation={5} style={styles.paper}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                  <Grid item xs={7}>
                    <Typography variant="h1" style={{marginBottom : '50px'}}>When are you free?</Typography>  
                  </Grid>          

                  <Grid container spacing={2} justifyContent="center" >
                  <Grid item xs={7}>
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
                  
                  <Grid item xs={7}>
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
                  <Grid item xs={7}>
                    <Button variant="contained" color="primary" disabled={disableAdd} onClick={handleAdd}>
                      Add
                    </Button>
                  </Grid>
                  <Grid item xs={7}>
                    {/* Display selected dates */}
                    <Typography variant="subtitle1">Selected Dates:</Typography>
                    {selectedDates.map((date, index) => (
                      <div key={index}>
                          <span style={{marginRight: "10px"}}>
                    {` ${new Date(date).toLocaleString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        })}`}
            {" "}

                    </span>
                    <span style={{fontWeight:'bold'}}>
            {(new Date(date).getHours() > 12)? new Date(date).getHours() - 14
            : (new Date(date).getHours() === 2 )? new Date(date).getHours() + 10
            : new Date(date).getHours() - 2
            } 
          {":"}
          {(new Date(date).getMinutes()<10)? new Date(date).getMinutes().toString().padStart(2, '0') : new Date(date).getMinutes()}
          {" "}
          {new Date(date).getHours() >= 12 ? "PM" : "AM"}

                    </span>

                        <IconButton style={{color:"red"}} onClick={() => handleRemoveDate(index)}>
                          <ClearIcon />
                        </IconButton>
                      </div>
                    ))}
                  </Grid>
                  <div style={styles.space}></div> 
                  <Grid item xs={7}>
                    <Button variant="contained" color="primary" onClick={handleSubmit} disabled={disableSubmit}>
                      Submit
                    </Button>
                  </Grid>
                  
                  </Grid>

                </Grid>
              </Paper>
          </Grid>

          </Grid>
          <Grid item>
          <Grid container justifyContent="center" alignItems="center" style={styles.container2}>
            <Paper elevation={5} style={styles.paper2}>
            <Typography variant="h1" style={{marginBottom : '30px'}}>Your available time slots</Typography>  
            {timeslots.length === 0 ? (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography variant="h3">
      {isLoading ? "" : " "}
    </Typography>
    {isLoading ? (
      <CircularProgress style={{ marginTop: '16px' }} color="primary" size={48} />
    ) : (
      <Typography variant="h3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ReplyRoundedIcon style={{ marginRight: "8px" }} />{" "}
        Add some!
      </Typography>
    )}
  </div>
) : (
  <List>
    {timeslots.map((timeslot, index) => (
      <ListItem key={index}>
        <DoctorTimeSlot timeslot={timeslot}></DoctorTimeSlot>
      </ListItem>
    ))}
  </List>
)}

           
            </Paper>
          </Grid>
          </Grid>

        </Grid>



      

    <Dialog open={successDialogOpen} onClose={handleCloseSuccessDialog}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            The selected dates are added successfully.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <El7a2niDocInfo />
    </>

  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: '100vh',
    height: 'auto',

  },
  container2: {
    minHeight: '100vh',
    height: 'auto',
   
  },
  paper: {
    padding: '30px 0px',
    width: 600,
    textAlign: 'center', // Center the text
    borderRadius: '25px',
    minHeight: 600
  },
  paper2: {
    padding: '30px 30px',
    width: 600,
    textAlign: 'center', // Center the text
    borderRadius: '25px',
    minHeight: 600
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