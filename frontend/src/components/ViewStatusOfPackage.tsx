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
import Background from '../../HealthPack.jpeg';
import Back from "./backButton";

interface HealthPackageStatus {
  name: string;
  status: string;
  startdate?: string;  // Reflecting the optional nature and naming convention from your schema
  enddate?: string; 
  patientName?: string;
  familyMemberName?: string;
}
const ViewStatusOfPackage = () => {
  const [healthPackages, setHealthPackages] = useState<HealthPackageStatus[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/routes/viewHealthPackageStatus', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHealthPackages(response.data.healthPackages);
      } catch (error) {
        console.error('Error fetching health package status:', error);
      }
    };
    fetchData();
  }, []);
  const headerCellStyle = {
    backgroundColor: 'rgba(173, 216, 230, 0.4)', // Very light blue
  };
  // Filter out packages for the patient and family members
  const patientPackages = healthPackages.filter((pkg) => !pkg.familyMemberName);
  const familyMemberPackages = healthPackages.filter((pkg) => pkg.familyMemberName);

  return (
    
    <Container maxWidth="lg">
      <TableContainer component={Paper} sx={{ marginBottom: '24px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={headerCellStyle}>Health Package Name</TableCell>
              <TableCell style={headerCellStyle}>Status</TableCell>
              <TableCell style={headerCellStyle}>Start Date</TableCell> {/* New column for start date */}
              <TableCell style={headerCellStyle}>End Date</TableCell> {/* New column for end date */}
            </TableRow>
          </TableHead>
          <TableBody>
            {patientPackages.map((pkg, index) => (
              <TableRow key={index}>
                <TableCell>{pkg.name}</TableCell>
      <TableCell>{pkg.status}</TableCell>
      <TableCell>{pkg.startdate}</TableCell> {/* Now using startdate */}
      <TableCell>{pkg.enddate}</TableCell>  
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
    </Container>
  );
};

export default ViewStatusOfPackage;
