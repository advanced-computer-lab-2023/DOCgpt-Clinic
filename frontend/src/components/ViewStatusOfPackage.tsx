import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { table } from 'console';

interface HealthPackageStatus {
  name: string;
  status: 'subscribed with renewal date' | 'unsubscribed' | 'cancelled with end date' | 'Not subscribed';
  familyMemberName?: string;
}

const columns: { field: keyof HealthPackageStatus; headerName: string }[] = [
  { field: 'name', headerName: 'Health Package Name' },
  { field: 'status', headerName: 'Status' },
  { field: 'familyMemberName', headerName: 'Family Member Name' },
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

        setHealthPackageStatus(response.data.healthPackages);
      } catch (error) {
        console.error('Error fetching health package status:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: "800px",
        margin: "auto",
        marginTop: "16px",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.field as string}
                sx={{
                  color: "blue", // Set the text color to white
                  fontWeight: "bold", // Make the text bold
                }}
              >
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {healthPackageStatus.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.field as string}>
                  {row[column.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewStatusOfPackage;
