
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Container } from '@mui/material';

interface Timeslot {
  date: Date;
  // Add other properties as needed
}


const PatientReschedule: React.FC = () => {

    const selectedAppointmentId = localStorage.getItem("selectedAppointmentId");
    const selectedDoctor = localStorage.getItem("selectedDoctor");
    const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
    const [selectedTimeslot, setSelectedTimeslot] = useState<Timeslot>();

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


  return (
    <Container>
      
      <h2>Choose A Timeslot</h2>
      {timeslots.length === 0 ? (
        <p>No timeslots available</p>
      ) : (
        <Card>
          <ul>
            {timeslots.map((timeslot, index) => (
    <li key={index} onClick={() => handleTimeslotSelect(timeslot)}>
      {new Date(timeslot.date).toLocaleDateString()} {/* Display the timeslot date */}
    </li>
  ))}

          </ul>
        </Card>
      )}

      {selectedTimeslot && (
        <div>
          <h3>Selected Timeslot</h3>
          <p>{selectedTimeslot.date.toLocaleString()}</p>
          {/* Add other details of the selected timeslot as needed */}
        </div>
      )}
      <Button onClick={submitTimeSlot}> Submit</Button>
    </Container>
  );
};

export default PatientReschedule;