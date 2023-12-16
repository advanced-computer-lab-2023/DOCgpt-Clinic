import { Alert, Button, Container, Grid, Paper, Snackbar, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle'; 
import Background from '../../Background.jpeg';
import DoctorBar from "../../components/Doctor bar/doctorBar";
import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
interface FormValues {
    MedicalHistory: {
        Allergies: string[];
        PastMedicalConditions: string[];
        Comments: string[];
    };
    MedicationList: {
        CurrentMedications: {
            Names: string[],
            Prescriptions: string[],
        },
        PastMedications: {
            Names: string[],
            Prescriptions: string[],
        },
        Comments: string[],
    };
    VitalSigns: {
        BloodPressure: null,
        HeartRate: null,
        Height: null,
        Weight: null,
        Comments: string[],
    };
    Laboratory: {
        BloodTests: string[],
        XRays: string[],
        Other: string[],
        Comments: string[],
    };
    GeneralComments: string[];
    GeneralImages: string[];
}

function HealthRecordForm(){
    //THE LOGIC OF DISPLAYING A FORM TO TAKE UP ALL THE INFORMATION NEEDED TO ADD A NEW HEALTH RECORD OF A SPECIFIC PATIENT UPON CLICK ON THAT BUTTON(+) IN THE (EMPTY HEALTH RECORD)PAGE
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('patient');
    const [openSnackbar, setOpenSnackbar] = useState(false);
 const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState("");
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
      };
    //1- TAKE THE VALUES FROM THE FORM
    const [formValues, setFormValues] = useState<FormValues>({
        MedicalHistory: {
            Allergies: [],
            PastMedicalConditions: [],
            Comments: [],
        },
        MedicationList: {
            CurrentMedications: {
                Names: [],
                Prescriptions: [],
            },
            PastMedications: {
                Names: [],
                Prescriptions: [],
            },
            Comments: [],
        },
        VitalSigns: {
            BloodPressure: null,
            HeartRate: null,
            Height: null,
            Weight: null,
            Comments: [],
        },
        Laboratory: {
            BloodTests: [],
            XRays: [],
            Other: [],
            Comments: [],
        },
        GeneralComments: [],
        GeneralImages: [],
    });
    const [allergy, setAllergy] = useState<string>('');
    const [medicalCondition, setmedicalCondition] = useState<string>('');
    const [currentMed, setcurrentMed] = useState<string>('');
    const [pastMed, setpastMed] = useState<string>('');
    const [bloodPressure, setbloodPressure] = useState<string>('');
    const [heartRate, setHeartRate] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [weight, setweight] = useState<string>('');
    const navigate = useNavigate();


    const inputAllergy = (e: any) => {
        setAllergy(e.target.value);
    };
    const inputMedCond = (e: any) => {
        setmedicalCondition(e.target.value);
    }
    const inputCurrMed = (e: any) => {
        setcurrentMed(e.target.value);
    };
    const inputPastMed = (e: any) => {
        setpastMed(e.target.value);
    };
    const inputBloodPress = (e: any) => {
        setbloodPressure(e.target.value);
    };
    const inputHeartRate = (e: any) => {
        setHeartRate(e.target.value);
    };
    const inputHeight = (e: any) => {
        setHeight(e.target.value);
    };
    const inputWeight = (e: any) => {
        setweight(e.target.value);
    };

    //2- MAKE A POST REQUEST WITH THESE VALUES AS THE BODY USING AXIOS AND THE ROUTE AND ADDING THE PATIENT USERNAME TO THE BODY
    const handleSubmit = async (event : React.FormEvent) => {
        formValues.MedicalHistory.Allergies.push(allergy);
        formValues.MedicalHistory.PastMedicalConditions.push(medicalCondition);
        formValues.MedicationList.CurrentMedications.Names.push(currentMed);
        formValues.MedicationList.PastMedications.Names.push(pastMed);

        event.preventDefault();

        console.log("Form submitted"); 
        if (
            !allergy &&
            !medicalCondition &&
            !currentMed &&
            !pastMed &&
            !bloodPressure &&
            !heartRate &&
            !height &&
            !weight
          ) {
            setOpenErrorSnackbar(true);
          }
          else {
            // At least one field is filled, show success snackbar
            setOpenSuccessSnackbar(true);
        
            // Handle form submission, e.g., send formValues to the server
            await createHealthRequest();
            navigate(`/doctor/patients`);
          }
        };

    const createHealthRequest = async () => {
        try {
            const response = await axios.post('/routes/healthRecord/', {
                patient: username,
                MedicalHistory: {
                    Allergies: formValues.MedicalHistory.Allergies,
                    PastMedicalConditions: formValues.MedicalHistory.PastMedicalConditions
                },
                MedicationList: {
                    CurrentMedications: {
                        Names: formValues.MedicationList.CurrentMedications.Names,
                    },
                    PastMedications: {
                        Names: formValues.MedicationList.PastMedications.Names,
                    },
                },
                VitalSigns: {
                    BloodPressure: bloodPressure,
                    HeartRate: heartRate,
                    Height: height,
                    Weight: weight,
                },
                // Add other key-value pairs as needed
            });
         
            console.log('Response:', response.data);
            } catch (error) {
            console.error('Error:', error);
            }
        };
    //ALSO HANDLING SUBMIT OF THAT BUTTON
    //SHOULD REDIRECT TO THE (HEALTH RECORD) PAGE OF THAT PATIENT AND DISPLAY IT THERE OR REDIRECT TO THE (MY PATIENTS) PAGE WITH JUST A NOTIFICATION THAT HEALTH RECORD IS ADDED SUCCESSFULLY AND THE DOCTOR COULD CLICK ON THE HEALTH RECORD BUTTON AGAIN TO VIEW (STILL THINKING)

    //return
    //THE DISPLAY OF THE FORM
    //SIMPLE FORM, MAKE SURE IT INCLUDES ALL  THE QUESTIONS NEEDED TO GATHER THE INFO FOR CREATE HEALTH RECORD, GIVE SPACE FOR (NO ANSWER), INCLUDE BUTTONS TO UPLOAD IMAGES WHEN NEEDED, INCLUDE A GENERAL COMMENTS(NOTES) SECTION 
   
    return( 
        

         <div
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
          minHeight: '100vh',
          backgroundPosition: 'center',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Increased shadow values
        }}
      >    
         <DoctorBar/>
     
    <Container component="main" maxWidth="md">
       <Paper elevation={3} style={{ padding: 20, marginTop: 60 }}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <AddCircleIcon style={{ color: 'red', fontSize: 48 }} />
    </div>
    <Typography component="h1" variant="h5" align="center">
        Medical History Form
    </Typography>
    <Snackbar
  open={openSuccessSnackbar}
  autoHideDuration={3000}
  onClose={() => setOpenSuccessSnackbar(false)}
>
  <Alert
    onClose={() => setOpenSuccessSnackbar(false)}
    severity="success"
    sx={{ width: '100%' }}
  >
    Health Record Submitted Successfully
  </Alert>
</Snackbar>

<Snackbar
  open={openErrorSnackbar}
  autoHideDuration={3000}
  onClose={() => setOpenErrorSnackbar(false)}
>
  <Alert
    onClose={() => setOpenErrorSnackbar(false)}
    severity="error"
    sx={{ width: '100%' }}
  >
    Fail to Submit
  </Alert>
</Snackbar>

            <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {/* Medical History Section */}
                <Grid item xs={12}>
                <Typography variant="h6" style={{fontSize: "16px" }}>Medical History</Typography>
                <TextField
                    label="Allergies"
                    fullWidth
                    value={allergy}
                    onChange={inputAllergy}
                />
                {/* <div>{allergy}</div> */}
                <TextField
                    label="Past Medical Conditions"
                    fullWidth
                    value={medicalCondition}
                    onChange={inputMedCond}
                />
                </Grid>
                {/* Medication List Section */}
                <Grid item xs={12}>
                <Typography variant="h6" style={{fontSize: "16px" }}>Medication List</Typography>
                <TextField
                    label="Current Medications"
                    fullWidth
                    value={currentMed}
                    onChange={inputCurrMed}
                    
                />
                <TextField
                    label="Past Medications"
                    fullWidth
                    value={pastMed}
                    onChange={inputPastMed}
                   
                />
                </Grid>
                {/* Vital Signs Section */}
                <Grid item xs={12}>
                <Typography variant="h6" style={{fontSize: "16px" }}>Vital Signs</Typography>
                <TextField
                    label="Blood Pressure"
                    fullWidth
                    value={bloodPressure}
                    onChange={inputBloodPress}
                    style={{ width: '50%' }}
                />
                <TextField
                    label="Heart Rate"
                    fullWidth
                    value={heartRate}
                    onChange={inputHeartRate}
                    style={{ width: '50%' }}
                />
                <TextField
                    label="Height"
                    fullWidth
                    value={height}
                    onChange={inputHeight}
                    style={{ width: '50%' }}
                />
                <TextField
                    label="Weight"
                    fullWidth
                    value={weight}
                    onChange={inputWeight}
                    style={{ width: '50%' }}
                />
                
                </Grid>
            </Grid>

      
            <Button
  type="submit"
  variant="contained"
  style={{
    backgroundColor: "#ccc", // Grey background color
    color: "#fff", // Text color
    transition: "background-color 0.3s ease", // Smooth transition on hover
    marginTop: "20px", // Adjust the margin-top here
  }}
  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4285f4")} // Hover style
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ccc")} // Revert to grey on mouse out
>
  Submit
</Button>

            </form>
        </Paper>
    </Container>    
    
  
    </div>
  
    );
}

export default HealthRecordForm;