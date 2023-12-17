import React, { useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

const RemovePackages: React.FC = () => {
  const [name, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send a DELETE request to delete the doctor by username
      const response = await axios.delete('/routes/deletePa', {
        data: { name }, // Send the username in the request body
      });

      // Handle success
      if (response.status === 200) {
        setMessage('Package Removed successfully');
      }
    } catch (error) {
      console.error('Error deleting package:', error);
      setMessage('Error deleting package');
    }
  };
  const token = localStorage.getItem("authToken");
  if (!token) {
    return (
      <div>
        <Typography component="h1" variant="h5">
          access denied
        </Typography>
      </div>
    );
  }
  return (
    <div style={{ textAlign: 'center', marginLeft: '250px' }}>
      <h1>Remove Package</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={name} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Remove Package</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RemovePackages;