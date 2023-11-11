import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Avatar,
  Button,
} from '@mui/material';
import PatientAppBar from '../../components/patientBar/patientBar';
import { Male, Female, PersonAddAlt1 } from '@mui/icons-material'; // Import MUI icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

type FamilyMember = {
  name: string;
  nationalId: string;
  age: number;
  gender: string;
  relationToPatient: string;
  healthPackageSubscription: {
    name: string;
    startdate?: string;
    enddate?: string;
    status: string;
  }[];
};

const ViewFamilyMembersPage = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/routes/patient/viewFam', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFamilyMembers(response.data.familyMembers);
      } catch (error: any) {
        console.error('Error fetching family members:', error);
        setError(`Error fetching family members. Details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddOneClick = () => {
    navigate('/patient/addMember');
  };

  return (
    <>
      <PatientAppBar />
      <Container>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddAlt1 />}
          style={{ marginBottom: '1.5rem', marginLeft: '1.5rem' }}
          onClick={handleAddOneClick}
        >
          Add One
        </Button>

        <Typography variant="h4" gutterBottom>
          Family Members
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error" variant="subtitle1">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {familyMembers.map((member) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={member.name}>
                <Card
                  style={{
                    margin: 'auto',
                    marginBottom: '1.5rem',
                    maxWidth: 300,
                    textAlign: 'center',
                  }}
                >
                  <Avatar
                    style={{
                      width: '3.5rem',
                      height: '3.5rem',
                      margin: '0 auto',
                    }}
                  >
                    {member.gender === 'Male' || member.gender === '' ? (
                      <Male />
                    ) : (
                      <Female />
                    )}
                  </Avatar>
                  <CardContent>
                  <Typography variant="h6" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography color="textSecondary">
                      National ID: {member.nationalId}
                    </Typography>
                    <Typography color="textSecondary">Age: {member.age}</Typography>
                    <Typography color="textSecondary">Gender: {member.gender}</Typography>
                    <Typography color="textSecondary">
                      Relation to Patient: {member.relationToPatient}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Health Package Subscription:
                      {member.healthPackageSubscription.map((subscription) => (
                        <div key={subscription.name}>
                          {subscription.name}: {subscription.status}
                        </div>
                      ))}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default ViewFamilyMembersPage;
