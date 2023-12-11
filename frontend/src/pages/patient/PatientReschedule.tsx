
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Timeslot {
  date: Date;
  // Add other properties as needed
}


const PatientReschedule: React.FC = () => {
  const [open, setOpen] = useState(true);
    const selectedAppointmentId = localStorage.getItem("selectedAppointmentId");
    const selectedDoctor = localStorage.getItem("selectedDoctor");
    const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
    const [selectedTimeslot, setSelectedTimeslot] = useState<Timeslot>();
    const navigate = useNavigate();
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
  const submitTimeSlot = () => {
        doReschedule();
  }
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
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
       <DialogTitle>
        <Typography
        variant="h4"
        gutterBottom
        color="primary"
        style={{ textAlign: "center" }}
        >
        When would you like to reschedule?
        </Typography>
    </DialogTitle>
    <DialogContent>
  <Container>
    {timeslots.length === 0 ? (
      <Typography variant="body1">No timeslots available</Typography>
    ) : (
      <Card>
        <List>
          {timeslots.map((timeslot, index) => (
            <ListItem
              key={index}
              button
              onClick={() => handleTimeslotSelect(timeslot)}
            >
              {new Date(timeslot.date).toLocaleDateString()}
            </ListItem>
          ))}
        </List>
      </Card>
    )}

    {selectedTimeslot && (
      <Container>
        <Typography variant="h5" gutterBottom>
          Selected Timeslot
        </Typography>
        <Typography variant="body1">
          {selectedTimeslot.date.toLocaleString()}
        </Typography>
        {/* Add other details of the selected timeslot as needed */}
      </Container>
    )}
  </Container>
</DialogContent>
<DialogActions>
  <Button
    onClick={submitTimeSlot}
    variant="contained"
    size="large"
    color="primary"
  >
    Submit
  </Button>
</DialogActions>
    </Dialog>

  );
};

export default PatientReschedule;