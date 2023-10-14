import React, { useState } from 'react';
import axios from 'axios';

const RemovePatient: React.FC = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send a DELETE request to delete the doctor by username
      const response = await axios.delete('/routes/deletepatient', {
        data: { username }, // Send the username in the request body
      });

      // Handle success
      if (response.status === 200) {
        setMessage('patient deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting Patient:', error);
      setMessage('Error deleting Patient');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginLeft: '250px' }}>
      <h1>Remove Patient</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Remove Patient</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RemovePatient;