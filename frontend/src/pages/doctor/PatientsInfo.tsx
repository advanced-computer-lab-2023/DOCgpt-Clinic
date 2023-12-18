import { Card, CardContent, Container, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Patient {
    username: string;
    name: string;
    email: string;
    dateofbirth: Date;
    mobilenumber: number;
    emergencyContact: {
        fullName: string,
        mobileNumber: string,
        relation: string
    };
    healthPackageSubscription: [
    {
        name:{
        type:String ,
        },
        startdate: {
        type: String,
        },
        enddate: {
        type: String,
        },     
        status: {
        type: String,
        enum: ['subscribed with renewal date', 'unsubscribed', 'cancelled with end date'],
        
        },
    },
    ];
    familyMembers: [{ name: {
        type: String
    },
    nationalId: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    relationToPatient: {
        type: String,
        enum: ['wife', 'husband', 'child']
    },
    healthPackageSubscription: string;
    }];
}

function PatientsInfo(){
    //THE LOGIC OF GETTING A CERTAIN PATIENTS INFO UPON CLICK
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const patientUsername = queryParams.get('patient');
    const [patient, setpatient] = useState<Patient | null>(null);

    const fetchPatient = async () => {
        console.log('Fetching patients...');
        try {
        const response = await axios.get(`/routes/doctors/selectPatient?patient=${patientUsername}`);
        console.log('Response:', response);
        setpatient(response.data);
        } catch (error) {
        console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchPatient();
    }, []);

    //return
    //THE DISPLAY OF THAT INFO
    //JUST A LITTLE CARD IN THE MIDDLE OF THE PAGE CONTAINS ALL INFO OF THE PATIENT
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
    return(
        <Container>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Typography variant="h5" style={{padding: '20px', fontWeight: 'bold'}}>
                Information Of Your Patient
            </Typography>
            </div>
            <Paper style={{ padding: '20px'}}>
                    {patient &&(
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Name: {patient.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Email: {patient.email}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Date of Birth: {new Date(patient.dateofbirth).toLocaleDateString()}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Mobile Number: {patient.mobilenumber}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography style={{fontWeight: 'bold'}}>Emergency Contact:</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Name: {patient.emergencyContact.fullName}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Mobile Number: {patient.emergencyContact.mobileNumber}</Typography>
                        </Grid><Grid item xs={12}>
                            <Typography>Relation: {patient.emergencyContact.relation}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {patient.healthPackageSubscription && (
                                patient.healthPackageSubscription.map((healthpackage) => (
                                    <Typography>Subscriped To: {`${healthpackage.name}`} </Typography>
                                )
                            ))}
                        </Grid>
                        {/* Add more patient information fields here */}
                        </Grid>
                    )}
            </Paper>
        </Container>
    
    );

}

export default PatientsInfo