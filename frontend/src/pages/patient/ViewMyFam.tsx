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
import { useLocation, useNavigate, useParams } from 'react-router-dom'; // Import useNavigate
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

type FamilyMember = {
  username: string;
    userName: string;
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

const ViewMyFam = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const { date,price } = useParams<{ date: any , price : string }>(); // Get packageName from URL params

    console.log(date);
    console.log(price);

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [famMem, setFamMem] = useState<string>('');
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

  const clickFamMember =(username:string)=>{
    //hateb2a username badal name lama n fetch mn el model el sah inshaallahh
    setFamMem(username);
  }

  const PayForApp = () =>{
    localStorage.setItem("FamMemUserName", famMem);
    navigate(`/makeAppforFam/${date}/${price}`);
  }


  return (
    <>
      <PatientAppBar />
      <Container>
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
                    height: 500,
                    textAlign: 'center',
                    height :'500px',
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
                    <Typography color="textSecondary">username: {member.username}</Typography>

                    <Typography color="textSecondary">
                      Relation to Patient: {member.relationToPatient}
                    </Typography>
                    <Button onClick={() => clickFamMember(member.username)}>Choose</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Typography>Chosen Fam Member: {famMem}</Typography>
            <Button onClick={PayForApp}>Pay For Appointment</Button>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default ViewMyFam;