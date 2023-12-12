import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, AlertTitle, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, Paper, Typography } from '@mui/material';
import EventIcon from "@mui/icons-material/Event";
import { useNavigate } from 'react-router-dom';
interface Timeslot {
  date: Date;
  // Add other properties as needed
}




const RequestFollowUp: React.FC = () => {
    const selectedAppointmentId = localStorage.getItem("selectedAppointmentId");
    const selectedDoctor = localStorage.getItem("selectedDoctor");
    const [appointment, setAppointment] = useState<any>();
    const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
    const [selectedTimeslot, setSelectedTimeslot] = useState<Timeslot>();
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertSeverity, setAlertSeverity] = React.useState<'success'|'error'>('success'); // or 'error' for example
    const [alertMessage, setAlertMessage] = React.useState('');

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
    }, []); // Empty dependency array ensures that this effect runs only once on component mount
    
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
  const submitFollowUp = async () => {
    try{
      await requestFollowUp();
      setAlertSeverity('success');
        setAlertMessage('Request Sent Successfully!');
        setAlertOpen(true);
    }catch (error) {
      setAlertSeverity('error');
      setAlertMessage('Error Submitting The Request.');
      setAlertOpen(true);
      console.error('Error Submitting The Request:', error);
    }
  }
    const requestFollowUp = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if(selectedTimeslot && appointment){
                    // edit this with the logic of requesting a follow up for myself
                    const response = await axios.post('/routes/patient/requestFollowUp', {
                        // what it takes?
                        followUpDate: selectedTimeslot.date,
                        scheduledBy: appointment.scheduledBy,
                        paid: appointment.paid,
                        price: appointment.price,
                        type: appointment.type,
                        AppointmentDate: appointment.date,
                        patient: appointment.patient, 
                        doctor: appointment.doctor, 
                        Appointmentstatus: appointment.status,
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
        When would you like the follow up?
        </Typography>
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
    onClick={submitFollowUp}
    variant="contained"
    color="primary"
    size='large'
    style={{ borderRadius: "25px" }}
    disabled={!selectedTimeslot}
  >
    Send Request
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

export default RequestFollowUp;