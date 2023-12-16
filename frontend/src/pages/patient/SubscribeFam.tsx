import { Button, Card, Container, Grid, Typography,  Menu, MenuItem, CardContent, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from "axios";
import Background from '../../FamilyMembers.jpg';
import Back from "../../components/backButton";
import PatientAppBar from '../../components/patientBar/patientBar';
import SubscribeFamComp from "../../components/SubscribeFamComp";
import El7a2niInfo from "../../components/El7a2ni-info";

interface FamilyMember {
  name: string;
  relationToPatient: string;
}
interface HealthPackage {
  name: string,
  feesPerYear: number,
  doctorDiscount: number,
  medicineDiscount: number,
  familysubscribtionDiscount: number
}
interface FamilyMemberPackage {
  familyMemberName: string;
  package: {
    name: string;
    startdate?: string ;
    enddate?: string ;
    status: 'subscribed' | 'unsubscribed' | 'cancelled with end date';
  };
}

function SubscribeFam() {
  const { username } = useParams();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [subscribed, setSubscribed] = useState<FamilyMemberPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pack = queryParams.get('packageName');

  const fetchData = async () =>
  {
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
  
  useEffect(() => {
    fetchData();
    fetchFamMembersSubscribed();
}, []);

const fetchFamMembersSubscribed = async () =>{
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get('/routes/viewFamMemberPackages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setSubscribed(response.data.familyMembersAndPackages);
    console.log(subscribed);
    
  } catch (error : any) {
    console.error('Error fetching family members:', error);
    setError(`Error fetching family members. Details: ${error.message}`);
  } finally {
    setLoading(false);
  }
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
    <div></div>
      <Container>
        <Typography variant="h4" gutterBottom color="primary" style={{ textAlign: 'center'}}>
          Family Members
        </Typography>
  
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error" variant="subtitle1">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {familyMembers.map((member) => (

             <SubscribeFamComp member={member} packageName={pack} subscribedPackages={subscribed} ></SubscribeFamComp>
            ))}
          </Grid>
        )}
      </Container>
      <El7a2niInfo/>
    </>
  );
}    
export default SubscribeFam;