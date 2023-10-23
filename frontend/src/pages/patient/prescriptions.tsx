import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Prescription {
  date: string;
  filled: boolean;
  doctorUsername: string;
  // Add other prescription properties
}

const Prescriptions: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>([]);
  const [filterFilled, setFilterFilled] = useState<boolean | null>(null);
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterDoctorUsername, setFilterDoctorUsername] = useState<string>('');

  const { username } = useParams(); // Get username from URL params

  useEffect(() => {
    // Fetch the patient's prescriptions using the 'username' variable
    // Replace this with your actual API call
    fetch(`/routes/getPatientprescriptions?username=${username}`)
      .then((response) => response.json())
      .then((data: Prescription[]) => {
        setPrescriptions(data);
        setFilteredPrescriptions(data);
      })
      .catch((error) => {
        console.error('Error fetching prescriptions:', error);
      });
  }, [username]); // Include 'username' in the dependency array

  useEffect(() => {
    const filtered = prescriptions.filter((prescription) => {
      return (
        (filterFilled === null || prescription.filled === filterFilled) &&
        (filterDate === '' || prescription.date.includes(filterDate)) &&
        (filterDoctorUsername === '' || prescription.doctorUsername.includes(filterDoctorUsername))
      );
    });
    setFilteredPrescriptions(filtered);
  }, [filterFilled, filterDate, filterDoctorUsername, prescriptions]);

  return (
    <div>
      <h1>My Prescriptions</h1>
      <div>
        <label>Filled:</label>
        <select
          value={filterFilled === null ? '' : filterFilled.toString()}
          onChange={(e) =>
            setFilterFilled(e.target.value === '' ? null : e.target.value === 'true')
          }
        >
          <option value="">All</option>
          <option value="true">Filled</option>
          <option value="false">Unfilled</option>
        </select>
      </div>
      <div>
        <label>Date:</label>
        <input
          type="text"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>
      <div>
        <label>Doctor Username:</label>
        <input
          type="text"
          value={filterDoctorUsername}
          onChange={(e) => setFilterDoctorUsername(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Filled</th>
            <th>Doctor Username</th>
            {/* Add other table headers for prescription properties */}
          </tr>
        </thead>
        <tbody>
          {filteredPrescriptions.map((prescription, index) => (
            <tr key={index}>
              <td>{prescription.date}</td>
              <td>{prescription.filled ? 'Yes' : 'No'}</td>
              <td>{prescription.doctorUsername}</td>
              {/* Add other table cells for prescription properties */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Prescriptions;