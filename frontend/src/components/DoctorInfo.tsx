import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Doctor {
  _id: string;
  username: string;
  name: string;
  email: string;
  dateofbirth: string; // This assumes 'dateofbirth' is a string, adjust the type as needed
  hourlyrate: number;
  affiliation: string;
  educationalBackground: string;
  speciality: string; // New property
  // Add other properties as needed
}

const DoctorInfoDropdown: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [doctorInfo, setDoctorInfo] = useState<Doctor | null>(null);

  useEffect(() => {
    // Fetch the list of doctors when the component mounts
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/routes/getdoc'); // Adjust the URL

      if (response.status === 200) {
        setDoctors(response.data.doctors);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleDoctorSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUsername = event.target.value;
    setSelectedDoctor(selectedUsername);
  
    // Fetch the doctor's information when a doctor is selected
    if (selectedUsername) {
      fetchDoctorInfo(selectedUsername);
    }
  };
  
  const fetchDoctorInfo = async (username: string) => {
    try {
      const response = await axios.get(`/routes/doctor?username=${username}`); // Use GET request for doctor info
  
      if (response.status === 200) {
        setDoctorInfo(response.data.doctor);
      }
    } catch (error) {
      console.error('Error fetching doctor information:', error);
    }
  };

  return (
    <div>
      <h1>Doctor Information</h1>
      <div>
        <label>Select a Doctor:</label>
        <select value={selectedDoctor} onChange={handleDoctorSelect}>
          <option value="">Select a doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor.username}>
              {doctor.username}
            </option>
          ))}
        </select>
      </div>
      {doctorInfo && (
        <div>
          <h2>Doctor Information</h2>
          <p>Username: {doctorInfo.username}</p>
          <p>Name: {doctorInfo.name}</p>
          <p>Email: {doctorInfo.email}</p>
          <p>Date of Birth: {doctorInfo.dateofbirth}</p>
          <p>Hourly Rate: {doctorInfo.hourlyrate}</p>
          <p>Affiliation: {doctorInfo.affiliation}</p>
          <p>Educational Background: {doctorInfo.educationalBackground}</p>
          <p>Speciality: {doctorInfo.speciality}</p>
          {/* Include other doctor fields here */}
        </div>
      )}
    </div>
  );
};

export default DoctorInfoDropdown;
