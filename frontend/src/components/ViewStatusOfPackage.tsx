import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface HealthPackageStatus {
  name: string;
  status: 'subscribed with renewal date' | 'unsubscribed' | 'cancelled with end date' | 'Not subscribed';
  familyMemberName?: string; // Added familyMemberName property
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Health Package Name', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
  { field: 'familyMemberName', headerName: 'Family Member Name', flex: 1 }, // New column for family member name
];

const ViewStatusOfPackage = () => {
    const [healthPackageStatus, setHealthPackageStatus] = useState<HealthPackageStatus[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('authToken');
          const response = await axios.get('/routes/viewHealthPackageStatus', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          // Ensure each row has a unique identifier
          const uniqueRows = response.data.healthPackages.map((row: HealthPackageStatus, index: number) => ({
            ...row,
            id: index.toString(), // You can customize this based on your requirements
          }));
  
          setHealthPackageStatus(uniqueRows);
        } catch (error) {
          console.error('Error fetching health package status:', error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      {/* <h2>Health Package Status</h2> */}
      <DataGrid
       rows={healthPackageStatus}
       columns={columns}
       disableRowSelectionOnClick
       disableColumnSelector
       disableColumnMenu
       autoPageSize
       
        
      />
    </div>
  );
};

export default ViewStatusOfPackage 