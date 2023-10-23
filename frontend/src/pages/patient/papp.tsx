import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Appointment {
  doctor: string;
  date: string;
  status: string;
  // Add other appointment properties
}

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterDate, setFilterDate] = useState<string>('');

  const { username } = useParams(); // Get username from URL params

  useEffect(() => {
    // Fetch the patient's appointments using the 'username' variable
    // Replace this with your actual API call
    fetch(`/routes/getPP?username=${username}`)
      .then((response) => response.json())
      .then((data: Appointment[]) => {
        setAppointments(data);
        setFilteredAppointments(data);
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  }, [username]); // Include 'username' in the dependency array

  useEffect(() => {
    // Filter appointments based on the selected status
    const filtered = appointments.filter((appointment) => {
      return appointment.status.toLowerCase().includes(filterStatus.toLowerCase());
    });
    setFilteredAppointments(filtered);
  }, [filterStatus, appointments]);

  useEffect(() => {
    // Filter appointments based on the selected date
    const filtered = appointments.filter((appointment) => {
      return filterDate === '' || appointment.date.includes(filterDate);
    });
    setFilteredAppointments(filtered);
  }, [filterDate, appointments]);

  return (
    <div>
      <h1>My Appointments</h1>
      <div>
        <label>Status:</label>
        <input
          type="text"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="text"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Doctor Username</th>
            {/* Add other table headers for appointment properties */}
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.date}</td>
              <td>{appointment.status}</td>
              <td>{appointment.doctor}</td>
              {/* Add other table cells for appointment properties */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;