// FamilyMemberPackageStatus.js or FamilyMemberPackageStatus.tsx
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
import PatientBar from './patientBar/patientBar';
const headerCellStyle = {
    backgroundColor: 'rgba(173, 216, 230, 0.4)', // Very light blue
  };
interface HealthPackageStatus {
    name: string;
    status: string;
    patientName?: string;
    familyMemberName?: string;
  }

const FamilyMemberPackageStatus = () => {
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
  
    // Filter out packages for the patient and family members
    const patientPackages = healthPackages.filter((pkg) => !pkg.familyMemberName);
    const familyMemberPackages = healthPackages.filter((pkg) => pkg.familyMemberName);
  


  return (
<>    
<PatientBar/>

    <Container maxWidth="lg">

    <Typography variant="h4" gutterBottom color="primary" style={{ textAlign: 'center'}} marginTop="20px" marginBottom="100px">
        Family Member Package Status
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: '24px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={headerCellStyle}>Family Member Name</TableCell>
              <TableCell style={headerCellStyle}>Health Package Name</TableCell>
              <TableCell style={headerCellStyle}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {familyMemberPackages.map((pkg, index) => (
              <TableRow key={index}>
                <TableCell>{pkg.familyMemberName}</TableCell>
                <TableCell>{pkg.name}</TableCell>
                <TableCell>{pkg.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </>
  );
};

export default FamilyMemberPackageStatus;
