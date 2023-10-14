import React, { useState, useEffect } from 'react';

interface Patient {
  _id: string;
  username: string;
  name: string;
  email:string;
  password:string;
  dateofbirth:string;
  mobilenumber:number;
  emergencyContact:string;
  familyMembers:string;
  nationalId:string;
  age:number;
  gender:string;
  relationToPatient:string;
}

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<string | null>();

  const handleViewPatients = async () => {
    try {
      const response = await fetch('/routes/getpati');
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error retrieving Patients');
      }
      const data = await response.json();
      setPatients(data.patients);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Internal server error');
    }
  };

  useEffect(() => {
    // You can fetch data initially when the component mounts if needed
  }, []);

  return (
    <div>
      <h2>Patient List</h2>
      <button onClick={handleViewPatients}>View Patients</button>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <ul>
          {patients.map((patient) => (
            <li key={patient._id}>{patient.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientList;
