

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Prescription {
  _id: string;
  doctorUsername: string;
  patientUsername: string;
  date: string;
  filled: string;
}

const PatientPrescriptions = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [filter, setFilter] = useState<Prescription>({
    _id:'',
    doctorUsername:'',
    patientUsername:'',
    date:'',
    filled:'',
  });
  
  const [selectedPrescription, setSelectedPrescription] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    queryParams.set('username', username || '');
    if (filter.doctorUsername) queryParams.set('doctorUsername', filter.doctorUsername);
       queryParams.set('date', filter.date);
       console.log(filter.date)
    if (filter.filled !== 'all') queryParams.set('filled', filter.filled);
      console.log(filter);
    fetch(`/routes/getPatientprescriptions?${queryParams}`)
      .then((response) => response.json())
      .then((data) => setPrescriptions(data))
      .catch((error) => console.error(error));
  }, [username, filter]);

  const handleFilterChange = (newFilter: Partial<typeof filter>) => {
    setFilter({
      ...filter,
      ...newFilter,
    });
  };

  const handlePrescriptionSelect = (prescriptionId: string) => {
    setSelectedPrescription(prescriptionId);
  };

  const buttonStyle: React.CSSProperties = {
    display: 'block',
    width: '200px',
    padding: '10px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    margin: '10px auto',
    textAlign: 'center',
    textDecoration: 'none',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Welcome, {username}!</h2>

      <input
        type="text"
        placeholder="Filter by Doctor's Username"
        value={filter.doctorUsername}
        onChange={(e) => handleFilterChange({ doctorUsername: e.target.value })}
        style={buttonStyle}
      />

      <input
         type="string"
        value={filter.date}
        onChange={(e) => handleFilterChange({ date: e.target.value })}
        style={buttonStyle}
      />

      <select
        value={filter.filled}
        onChange={(e) => handleFilterChange({ filled: e.target.value })}
        style={buttonStyle}
      >
        <option value="all">All Prescriptions</option>
        <option value="true">Filled Prescriptions</option>
        <option value="false">Unfilled Prescriptions</option>
      </select>

      <div>
        {prescriptions.map((prescription) => (
          <div
            key={prescription._id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              margin: '10px',
              backgroundColor: selectedPrescription === prescription._id ? 'lightgray' : 'white',
            }}
            onClick={() => handlePrescriptionSelect(prescription._id)}
          >
            <h3>Prescription</h3>
            <p>Date: {prescription.date}</p>
            <p>Doctor: {prescription.doctorUsername}</p>
            <p>  filled:
            {prescription.filled.toString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientPrescriptions;
