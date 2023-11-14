import { Button, Card, Container, Grid, Typography,  Menu, MenuItem, CardContent, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from "axios";

import PatientAppBar from '../../components/patientBar/patientBar';
import SubscribeFamComp from "../../components/SubscribeFamComp";

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
    status: 'subscribed with renewal date' | 'unsubscribed' | 'cancelled with end date';
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
    </>
  );
}    
export default SubscribeFam;