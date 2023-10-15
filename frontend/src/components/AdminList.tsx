import React, { useState, useEffect } from 'react';

interface Admin {
  _id: string;
  username: string;
}

const AdminList: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [error, setError] = useState<string | null>();

  const handleViewAdmins = async () => {
    try {
      const response = await fetch('/routes/viewAdmin');
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error retrieving admins');
      }
      const data = await response.json();
      setAdmins(data.admins);
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
      <h2>Admin List</h2>
      <button onClick={handleViewAdmins}>View Admins</button>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <ul>
          {admins.map((admin) => (
            <li key={admin._id}>{admin.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminList;
