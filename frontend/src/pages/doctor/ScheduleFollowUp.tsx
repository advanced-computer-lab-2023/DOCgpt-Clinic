import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Container } from '@mui/material';

interface Timeslot {
  date: Date;
  // Add other properties as needed
}


const ViewMyTimeSlots: React.FC = () => {
    const selectedPatient = localStorage.getItem("selectedPatient");

    const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
    const [selectedTimeslot, setSelectedTimeslot] = useState<Timeslot>();

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
            setTimeslots(response.data.timeslots);
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
  const submitFollowUp = () => {
        createFollowUp();
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


  return (
    <Container>
        <p>Patient: {selectedPatient}</p>
      <h2>Your Timeslots</h2>
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

export default ViewMyTimeSlots;