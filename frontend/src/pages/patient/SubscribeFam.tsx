import { Button, Card, Container, Grid, Typography, CircularProgress, Snackbar, Alert , CardContent, Paper, Avatar} from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import LinkIcon from '@mui/icons-material/Link';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import left from '../../left1.jpeg'
import right from '../../right.jpeg'
import El7a2niInfo from '../../components/El7a2ni-info';
import AddFamilyMember from './addFam'
import Background from '../../HealthPack.jpeg';
import Back from "../../components/backButton";

import PatientAppBar from '../../components/patientBar/patientBar';

interface FamilyMember {
  gender: string;
  name: string;
  relationToPatient: string;
}

interface FamilyMemberPackage {
  familyMemberName: string;
  subscriptionPackage: {
    name: string;
    startdate?: string;
    enddate?: string;
    status: 'subscribed' | 'unsubscribed' | 'cancelled with end date';
  };
}

function SubscribeFam() {
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pack = queryParams.get('packageName');

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
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
      } catch (error : any) {
        console.error('Error fetching family members:', error);
        setError(`Error fetching family members. Details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSubscribe = async (memberName: string) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`/routes/getSubscribedPackagesForMember?familyMemberName=${memberName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const subscribedPackages = response.data.subscribedPackages;

      if (subscribedPackages.some((subscriptionPackage: { name: string | null; }) => subscriptionPackage.name === pack)) {
        alert('Package Already Subscribed');
      } else {
        localStorage.setItem('fam', memberName);
        navigate(`/subFam/${pack}`);
      }
    } catch (error : any) {
      console.error('Error:', error);
      setSnackbarMessage(` ${error.message}`);
      setSnackbarOpen(true);
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
          <strong>SUBSCRIBE FOR FAMILY MEMBER</strong>
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
                        <Button onClick={() => handleSubscribe(member.name)} variant="contained" color="primary">
                      Subscribe
                    </Button>
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
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </>
  );
}

export default SubscribeFam;