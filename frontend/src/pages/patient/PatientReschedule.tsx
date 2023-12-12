
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EventIcon from "@mui/icons-material/Event";
import { Alert, AlertTitle } from '@mui/material';
interface Timeslot {
  date: Date;
  // Add other properties as needed
}


const PatientReschedule: React.FC = () => {
  const [open, setOpen] = useState(true);
    const selectedAppointmentId = localStorage.getItem("selectedAppointmentId");
    const oldDate = localStorage.getItem("oldDate");
    const selectedDoctor = localStorage.getItem("selectedDoctor");
    const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
    const [selectedTimeslot, setSelectedTimeslot] = useState<Timeslot>();
    const navigate = useNavigate();
    const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState<'success'|'error'>('success'); // or 'error' for example
  const [alertMessage, setAlertMessage] = React.useState('');

    useEffect(() => {
      // Fetch doctor data only if selectedDoctor is defined
        const fetchDoctorData = async () => {
          try {
            const response = await axios.get(`/routes/doctors/getDoctorByUsername?doctorUsername=${selectedDoctor}`);
            console.log(response.data.doctor[0]);
            setTimeslots(response.data.doctor[0].timeslots);
            console.log(response.data.doctor[0].timeslots);
            
          } catch (error) {
            console.error('Error fetching doctor data:', error);
          }
        };
        fetchDoctorData();
    }, []);


  const handleTimeslotSelect = (selectedTimeslot: Timeslot) => {
    // Handle the selected timeslot as needed
    setSelectedTimeslot(selectedTimeslot);
  };
  const handleCloseAlert = () => {
    setAlertOpen(false);
    window.location.reload();
  };

  const submitTimeSlot = async () => {
    try {
      await doReschedule();
      setAlertSeverity('success');
      setAlertMessage('Rescheduling successful!');
      setAlertOpen(true);
      // window.location.reload();
    } catch (error) {
      setAlertSeverity('error');
      setAlertMessage('Error rescheduling appointment.');
      setAlertOpen(true);
      console.error('Error rescheduling appointment:', error);
    }
  };
    const doReschedule = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if(selectedTimeslot){
                    const response = await axios.patch('/routes/patient/rescheduleAppointments', {
                        appointmentId: selectedAppointmentId,
                        date: selectedTimeslot.date
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    console.log(response.data);
                    
                }
            } catch (error) {
                console.error('Error fetching timeslots:', error);
            }
        };

        const handleClose = () => {
          setOpen(false);
          navigate("/patient/viewMyappointments");
      };
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
        When would you like to reschedule?
        </Typography>
        {oldDate &&
        <Typography variant="body1" style={{ textAlign: "center", fontWeight: "bold" }}>
          Your old appointment was on{' '} 
            {` ${new Date(oldDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}, ${new Date(oldDate).toLocaleString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}`}
            {/* Add other details of the selected timeslot as needed */}
            </Typography> 
        }
    </DialogTitle>
    <DialogContent>
      <Typography
          variant="h3"
          gutterBottom
          style={{ textAlign: "center", fontWeight: "bold" }}
          >
         Dr. {selectedDoctor} Is Available at 
          </Typography>
    {timeslots.length === 0 ? (
      <Typography variant="body1">No timeslots available</Typography>
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
           {` ${new Date(timeslot.date).toLocaleTimeString([], {
               hour: "2-digit",
               minute: "2-digit",
           })}, ${new Date(timeslot.date).toLocaleString("en-US", {
               weekday: "short",
               month: "short",
               day: "numeric",
               year: "numeric",
           })}`}
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
            {` ${new Date(selectedTimeslot.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}, ${new Date(selectedTimeslot.date).toLocaleString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}`}
            {/* Add other details of the selected timeslot as needed */}
            </Typography>
        </Paper>
        )}
  
</DialogContent>
<DialogActions style={{justifyContent:'center', paddingBottom: "20px"}}>
  <Button
    onClick={submitTimeSlot}
    variant="contained"
    color="primary"
    size='large'
    style={{ borderRadius: "25px" }}
    disabled={!selectedTimeslot}
  >
    Submit
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

export default PatientReschedule;