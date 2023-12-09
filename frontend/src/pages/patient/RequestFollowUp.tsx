import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Container } from '@mui/material';

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
  const submitFollowUp = () => {
        requestFollowUp();
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


  return (
    <Container>
        <h2>Doctor {selectedDoctor} 's Time Slots</h2>
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
      <Button onClick={submitFollowUp}> Submit</Button>
    </Container>
  );
};

export default RequestFollowUp;