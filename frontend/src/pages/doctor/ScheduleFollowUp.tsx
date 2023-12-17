import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, AlertTitle, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, Paper, Typography } from '@mui/material';
import EventIcon from "@mui/icons-material/Event";
import { useNavigate } from 'react-router-dom';

interface Timeslot {
  date: Date;
  // Add other properties as needed
}


const ViewMyTimeSlots: React.FC = () => {
    const selectedAppointmentId = localStorage.getItem("selectedAppointmentId");
    const selectedPatient = localStorage.getItem("selectedPatient");
    const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
    const [appointment, setAppointment] = useState<any>();
    const [selectedTimeslot, setSelectedTimeslot] = useState<Timeslot>();
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertSeverity, setAlertSeverity] = React.useState<'success'|'error'>('success'); // or 'error' for example
    const [alertMessage, setAlertMessage] = React.useState('');
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);


    useEffect(() => {
      // Fetch appointment data
      const fetchData = async () => {
        try {
          const response = await axios.get(`/routes/appointments/getAppointmentById?appointmentId=${selectedAppointmentId}`);
          console.log(response.data);
          setAppointment(response.data.appointment);
        } catch (error) {
          console.error('Error fetching appointment data:', error);
        }
      };
      fetchData();
    }, []); 

    useEffect(() => {
        // Fetch timeslots from the backend
        const fetchData = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.get('/routes/doctors/getSlots', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.data.timeslots;
            const sortedSlots = data.sort((a: any, b: any) => {
              const dateA = new Date(a.date.toLocaleString("en-US",  "Africa/Cairo" ));
              const dateB = new Date(b.date.toLocaleString("en-US",  "Africa/Cairo" ));
      
              if (dateA > dateB) return -1;
              if (dateA < dateB) return 1;
              // If dates are equal, compare times
              const timeA = dateA.getHours() * 60 + dateA.getMinutes();
              const timeB = dateB.getHours() * 60 + dateB.getMinutes();
              return timeB - timeA;
            });
            setTimeslots(sortedSlots);
        } catch (error) {
            console.error('Error fetching timeslots:', error);
        }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs only once on component mount

  const handleTimeslotSelect = (selectedTimeslot: Timeslot) => {
    // Handle the selected timeslot as needed
    setSelectedTimeslot(selectedTimeslot);
  };
  const submitFollowUp = async () => {
    try{
      await createFollowUp();
      setAlertSeverity('success');
        setAlertMessage('Follow Up scheduled successfully!');
        setAlertOpen(true);
    }catch (error) {
      setAlertSeverity('error');
      setAlertMessage('Error Scheduling the followup.');
      setAlertOpen(true);
      console.error('Error Scheduling the followup:', error);
    }
  }
    const createFollowUp = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if(selectedTimeslot){
                    const response = await axios.post('/routes/doctors/followup', {
                        patient: selectedPatient,
                        date: selectedTimeslot.date
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                }
            } catch (error) {
                console.error('Error fetching timeslots:', error);
            }
        };


        const handleClose = () => {
          setOpen(false);
          navigate("/doctor/appointments");
      };
      const handleCloseAlert = () => {
        setAlertOpen(false);
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
    <div>
    
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth sx={{  zIndex: 1000}}>
       <DialogTitle>
        <Typography
        variant="h2"
        gutterBottom
        color="primary"
        style={{ textAlign: "center", fontWeight: "bold" }}
        >
        Schedule A Follow Up with {selectedPatient}
        </Typography>
    </DialogTitle>
    <DialogContent>
      <Typography
          variant="h3"
          gutterBottom
          style={{ fontWeight: "bold" }}
          >
        For the old appointment: 

          </Typography>
          {appointment && 
          <div>
            <Typography variant="body1"><span style={{fontWeight:'bold'}}>On : </span> {` ${new Date(appointment.date).toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
            })}`} 
            {" "}
            <span style={{ fontWeight: "bold" }}>
                          {new Date(appointment.date).getHours() === 14
                            ? new Date(appointment.date).getHours() - 2
                            : new Date(appointment.date).getHours() === 13 
                            ? new Date(appointment.date).getHours() - 2
                            : new Date(appointment.date).getHours() > 12 
                            ? new Date(appointment.date).getHours() - 14
                            : new Date(appointment.date).getHours() === 0
                            ? new Date(appointment.date).getHours() + 10
                            : new Date(appointment.date).getHours() === 1
                            ? new Date(appointment.date).getHours() + 10
                            : new Date(appointment.date).getHours() === 2
                            ? new Date(appointment.date).getHours() + 10
                            : new Date(appointment.date).getHours() - 2}
                          {":"}
                          {new Date(appointment.date).getMinutes() < 10
                            ? new Date(appointment.date)
                                .getMinutes()
                                .toString()
                                .padStart(2, "0")
                            : new Date(appointment.date).getMinutes()}{" "}
                          {new Date(appointment.date).getHours() === 0? "PM"
                          :new Date(appointment.date).getHours() === 1? "PM"
                          :new Date(appointment.date).getHours() >= 14 ? "PM" : "AM"}
                        </span></Typography>
            <Typography variant="body1"gutterBottom> <span style={{fontWeight:'bold'}}>Status : </span> {appointment && appointment.status} </Typography>
          </div>


          }
            <Typography
            variant="h3"
            gutterBottom
            style={{ fontWeight: "bold" }}
            >
          Pick a new date from your available slots: 

            </Typography>

    {timeslots.length === 0 ? (
      <Typography variant="body1">You don't have any available time slots</Typography>
    ) : (
      
        <List>
          {timeslots.map((timeslot, index) => (
           <ListItem
           key={index}
           button
           onClick={() => handleTimeslotSelect(timeslot)}
           style={{ transition: "border-radius 0.3s ease-in-out" }}
           sx={{
           "&:hover": {
               borderRadius: "12px", // Set your desired border-radius value
           },
           }}
       >
           <EventIcon style={{ marginRight: "8px" }} />{" "}
           {/* Calendar Icon */}
           <Typography variant="body1">
           {` ${new Date(timeslot.date).toLocaleString("en-US", {
               weekday: "short",
               month: "short",
               day: "numeric",
               year: "numeric",
           })}`}
           {" "}
           <span style={{ fontWeight: "bold" }}>
                          {new Date(timeslot.date).getHours() === 14
                            ? new Date(timeslot.date).getHours() - 2
                            : new Date(timeslot.date).getHours() === 13 
                            ? new Date(timeslot.date).getHours() - 2
                            : new Date(timeslot.date).getHours() > 12 
                            ? new Date(timeslot.date).getHours() - 14
                            : new Date(timeslot.date).getHours() === 0
                            ? new Date(timeslot.date).getHours() + 10
                            : new Date(timeslot.date).getHours() === 1
                            ? new Date(timeslot.date).getHours() + 10
                            : new Date(timeslot.date).getHours() === 2
                            ? new Date(timeslot.date).getHours() + 10
                            : new Date(timeslot.date).getHours() - 2}
                          {":"}
                          {new Date(timeslot.date).getMinutes() < 10
                            ? new Date(timeslot.date)
                                .getMinutes()
                                .toString()
                                .padStart(2, "0")
                            : new Date(timeslot.date).getMinutes()}{" "}
                          {new Date(timeslot.date).getHours() === 0? "PM"
                          :new Date(timeslot.date).getHours() === 1? "PM"
                          :new Date(timeslot.date).getHours() >= 14 ? "PM" : "AM"}
                        </span>
           </Typography>
       </ListItem>
          ))}
        </List>
      
    )}

{selectedTimeslot && (
        <Paper
            elevation={3}
            style={{ padding: "16px", marginBottom: "16px" }}
        >
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Selected Timeslot
            </Typography>
            <Typography variant="body1">
            {` ${new Date(selectedTimeslot.date).toLocaleString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}`}
                    {" "}
                    <span style={{ fontWeight: "bold" }}>
                          {new Date(selectedTimeslot.date).getHours() === 14
                            ? new Date(selectedTimeslot.date).getHours() - 2
                            : new Date(selectedTimeslot.date).getHours() === 13 
                            ? new Date(selectedTimeslot.date).getHours() - 2
                            : new Date(selectedTimeslot.date).getHours() > 12 
                            ? new Date(selectedTimeslot.date).getHours() - 14
                            : new Date(selectedTimeslot.date).getHours() === 0
                            ? new Date(selectedTimeslot.date).getHours() + 10
                            : new Date(selectedTimeslot.date).getHours() === 1
                            ? new Date(selectedTimeslot.date).getHours() + 10
                            : new Date(selectedTimeslot.date).getHours() === 2
                            ? new Date(selectedTimeslot.date).getHours() + 10
                            : new Date(selectedTimeslot.date).getHours() - 2}
                          {":"}
                          {new Date(selectedTimeslot.date).getMinutes() < 10
                            ? new Date(selectedTimeslot.date)
                                .getMinutes()
                                .toString()
                                .padStart(2, "0")
                            : new Date(selectedTimeslot.date).getMinutes()}{" "}
                          {new Date(selectedTimeslot.date).getHours() === 0? "PM"
                          :new Date(selectedTimeslot.date).getHours() === 1? "PM"
                          :new Date(selectedTimeslot.date).getHours() >= 14 ? "PM" : "AM"}
                        </span>
            {/* Add other details of the selected timeslot as needed */}
            </Typography>
        </Paper>
        )}
  
</DialogContent>
<DialogActions style={{justifyContent:'center', paddingBottom: "20px"}}>
  <Button
    onClick={submitFollowUp}
    variant="contained"
    color="primary"
    size='large'
    style={{ borderRadius: "25px" }}
    disabled={!selectedTimeslot}
  >
    Schedule
  </Button>
</DialogActions>
 {/* Alert component */}
    </Dialog>

    <Dialog open={alertOpen}>
    {alertOpen && (
        <Alert
          severity={alertSeverity}
          onClose={handleCloseAlert}
          sx={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <AlertTitle>{alertSeverity === 'success' ? 'Success' : 'Error'}</AlertTitle>
          {alertMessage}
        </Alert>
      )}
    </Dialog>
    </div>
  );
};

export default ViewMyTimeSlots;