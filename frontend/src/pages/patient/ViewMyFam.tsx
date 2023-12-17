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
  Paper,
} from '@mui/material';
import { Male, Female, PersonAddAlt1 } from '@mui/icons-material'; // Import MUI icons
import { useLocation, useNavigate, useParams } from 'react-router-dom'; // Import useNavigate
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PatientAppBar from '../../components/patientBar/patientBar'
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import left from '../../left1.jpeg'
import right from '../../right.jpeg'
import El7a2niInfo from '../../components/El7a2ni-info';
import AddFamilyMember from './addFam'
import Background from '../../FamilyMembers.jpg';
import Back from "../../components/backButton";


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
    localStorage.setItem("FamMemUserName", famMem);
    navigate(`/makeAppforFam/${date}/${price}`);
  }

  const PayForApp = () =>{
    localStorage.setItem("FamMemUserName", famMem);
    navigate(`/makeAppforFam/${date}/${price}`);
  }


  return (
    <>
      <PatientAppBar />
      <div
      style={{
        position: 'relative',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '50vh',
        marginBottom: '100px',
        backgroundPosition: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Transparent overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      ></div>

      <Back />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h1>
          <strong>MY FAMILY MEMBERS</strong>
        </h1>
      </div>
    </div>
      <div style={{  maxWidth: '100%', overflowX: 'hidden' }}>
        <Grid container style={{ marginTop: '10px', alignItems: 'stretch' }}>
          {/* First Column */}
          <Grid item xs={12} md={3}  style={{ padding: 0 }}>
            <div style={{  minHeight:'500px' , width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center'  , right:'50px'}} />
          </Grid>
  
          {/* Middle Column */}
          <Grid item xs={12} md={6} style={{minHeight:'500px' }}>
            <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f3f3f3' , minHeight:'500px' }}>
              {/* Buttons at the top */}
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              </div>
  
              {/* Loading and Error Handling */}
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : (
                <Grid container spacing={2}>
                  {familyMembers.map((member, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Paper style={{ padding: '15px', backgroundColor: '#fff', textAlign: 'center', height: '100%' }}>
                        <Avatar
                          style={{ backgroundColor: member.gender === 'Male' ? '#1976d2' : '#1976d2', margin: '10px auto', width: '60px', height: '60px' }}
                        >
                          {member.gender === 'Male' ? <MaleIcon style={{ fontSize: '1.5rem' }} /> : <FemaleIcon style={{ fontSize: '1.5rem' }} />}
                        </Avatar>
                        <Typography variant="h6" style={{ margin: '10px 0' }}>
                          {member.name}
                        </Typography>
                        <Typography variant="h6" style={{ margin: '10px 0' }}>
                          {member.relationToPatient}
                        </Typography>
                        <Typography variant="body2">ID: {member.nationalId}</Typography>
                        <Typography variant="body2">Age: {member.age}</Typography>
                        <Button onClick={() => clickFamMember(member.username)}>Choose</Button>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          </Grid>
  
          {/* Last Column */}
          <Grid item xs={12} md={3}  style={{ padding: 0 }}>
            <div style={{minHeight:'500px' ,  width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: '0px' }} />
          </Grid>
  
        </Grid>

      </div>
      <El7a2niInfo/>

    </>
  );
};

export default ViewMyFam;