import React, { useState, useEffect } from 'react';

interface Patient {
  _id: string;
  username: string;
  name: string;
  email: string;
  dateofbirth: string;
  mobilenumber: number;
  emergencyContact: {
    fullName: string;
    mobileNumber: string;
    relation: string;
  };
  familyMembers: Array<{
    name: string;
    nationalId: string;
    age: number;
    gender: string;
    relationToPatient: string;
  }>;
  // Add other patient properties as needed
}

const PatientsList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    // Fetch the list of patients from your API endpoint
    fetch('/routes/getP')
      .then((response) => response.json())
      .then((data: Patient[]) => {
        setPatients(data);
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  return (
    <div>
      <h1>List of Patients</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Mobile Number</th>
            {/* Add other table headers for patient properties */}
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient.username}</td>
              <td>{patient.name}</td>
              <td>{patient.email}</td>
              <td>{patient.dateofbirth}</td>
              <td>{patient.mobilenumber}</td>
              {/* Add other table cells for patient properties */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsList;
