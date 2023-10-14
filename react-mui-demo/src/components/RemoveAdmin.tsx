import React, { useState } from 'react';
import axios from 'axios';

const RemoveAdmin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send a DELETE request to delete the doctor by username
      const response = await axios.delete('/routes/delete', {
        data: { username }, // Send the username in the request body
      });

      // Handle success
      if (response.status === 200) {
        setMessage(' deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
      setMessage('Error deleting doctor');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginLeft: '250px' }}>
      <h1>Remove Admin </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Remove Admin</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RemoveAdmin;
