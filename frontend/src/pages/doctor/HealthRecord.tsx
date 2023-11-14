import { Card, CardContent, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface HealthRecord{
    patient: string,
    MedicalHistory:{
        Allergies: [String],
        PastMedicalConditions: [String],
        Comments: [String]
    },
        MedicationList: {
            CurrentMedications: {
                Names: [String],
                 //IMAGE URL
                Prescriptions: [String],
            },
            PastMedications: {
                Names: [String],
                //IMAGE URL
                Prescriptions:[String],
            },
            Comments: [String]
        },
        VitalSigns:{
            BloodPressure: {
                type: Number,
            },
            HeartRate: {
                type: Number,
            }, 
            Height:{
                type: Number,
            },
            Weight: {
                type: Number,
            },
            Comments: [String]
        },
        Laboratory: {
            //IMAGES URI
            BloodTests: [String],
            XRays: [String],
            Other:[String],
            Comments: [String]
        },
        GeneralComments: [String],
        GeneralImages: [String]
}

function HealthRecord(){

    //THE LOGIC OF VIEWING THE HEALTH RECORD OF A SPECIFIC PATIENT IF HAS ONE
    //HANDELING THE MANY UPDATES BUTTON THAT A DOCTOR COULD ADD SOME NEW COMMENTS AND UPLOAD NEW IMAGES, EDIT INFO
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const patientUsername = queryParams.get('patient');
    const [healthRecord, setHealthRecord] = useState<HealthRecord | null>(null);
    const [comment, setComment] = useState<string>('');


    const fetchHealthRecord = async () => {
        console.log('Fetching Health Record of this Patient...');
        try {
        const response = await axios.get(`/routes/doctors/HealthRecord?patientUsername=${patientUsername}`);
        console.log('Response:', response);
        setHealthRecord(response.data);
        } catch (error) {
        console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchHealthRecord();
    }, []);

    

    const handleInputChange = (e : any) => {
        setComment(e.target.value);
    };
    
    const handleCommentEntered = (section: string) => async (event: React.KeyboardEvent<HTMLDivElement>) => {
        try {
            if (event.key === 'Enter') {
                // Your logic to handle Enter key press
                const response = await axios.patch(`/routes/doctors/HealthRecord/comments?patientUsername=${patientUsername}`, {
                section,
                comment,
                });
            }
            } catch (error) {
            console.error('Error:', error);
            }
        };
        
    //return
    //THE VIEW 
    //DISPLAYING SECTIONS OF THE HEALTH RECORD IN A PROPER WAY AND DIPLAYING IMAGES AND NOTES 
    return(
        <Container>
            {healthRecord && (
            <Container>
                <Container style={{ display: 'flex', justifyContent:'center'}}>
                <Typography variant="h4" style={{fontWeight:'bold'}}>
                    Health Record Of Your Patient: {healthRecord.patient}
                </Typography>
                </Container>
                <Card style={{padding:'20px', margin:'10px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography style={{ fontWeight: 'bold'}}> Medical History:</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Allergies: </Typography>
                            <ul>
                            {healthRecord.MedicalHistory.Allergies.map((item, index) => (
                                <div>
                                    <li key={index}>{`${item}`}</li>
                                </div>
                            ))}
                        </ul>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Past Medical Conditions: </Typography>
                            <ul>
                            {healthRecord.MedicalHistory.PastMedicalConditions.map((item, index) => (
                                <div>
                                    <li key={index}>{`${item}`}</li>
                                </div>
                            ))}
                        </ul>
                        </Grid> 
                        <Grid item xs={12}>
                            <div>
                            <Typography>Comments: </Typography>
                            </div>
                            <TextField 
                                fullWidth
                                multiline
                                value={comment}
                                onChange={handleInputChange}
                                onKeyDown={handleCommentEntered("MedicalHistory")}
                                placeholder="Add A Comment on Past Medical Conditions"
                            >
                            </TextField>
                            <ul>
                            {healthRecord.MedicalHistory.Comments.map((item, index) => (
                                <div>
                                    <li key={index}>{`${item}`}</li>
                                </div>
                            ))}
                            </ul>
                            
                        </Grid>
                    </Grid>
                </Card>
                <Card style={{padding:'20px', margin:'10px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography style={{ fontWeight: 'bold'}}> Medication List:</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>CurrentMedications: </Typography>
                            <ul>
                            {healthRecord.MedicationList.CurrentMedications.Names.map((item, index) => (
                                <div>
                                    <li key={index}> Name: {`${item}`}</li>
                                </div>
                            ))}
                            </ul>
                            {healthRecord.MedicationList.CurrentMedications.Prescriptions.map((item, index) => (
                                <div>
                                   <Typography>Prescription: 
                                   <a href={`/routes/patient/patientDocument/${item}`} target="_blank" rel="noopener noreferrer">
                                    {item}
                                    </a>
                                    </Typography>
                                    
                                </div>
                            ))}
                            
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Past Medications: </Typography>
                            <ul>
                            {healthRecord.MedicationList.PastMedications.Names.map((item, index) => (
                                <div>
                                    <li key={index}> Name: {`${item}`}</li>
                                </div>
                            ))}
                        </ul>

                        {healthRecord.MedicationList.PastMedications.Prescriptions.map((item, index) => (
                                <div>
                                   <Typography>Prescription: 
                                   <a href={`/routes/patient/patientDocument/${item}`} target="_blank" rel="noopener noreferrer">
                                    {item}
                                    </a>
                                             </Typography>
                                           
                                    
                                </div>
                            ))}
                        </Grid> 
                        <Grid item xs={12}>
                        <div>
                            <Typography>Comments: </Typography>
                            </div>
                            <TextField 
                                fullWidth
                                multiline
                                value={comment}
                                onChange={handleInputChange}
                                onKeyDown={handleCommentEntered("MedicationList")}
                                placeholder="Add A Comment on Medication List"
                            >
                            </TextField>
                            <ul>
                            {healthRecord.MedicationList.Comments.map((item, index) => (
                                <div>
                                    <li key={index}>{`${item}`}</li>
                                </div>
                            ))}
                            </ul>
                        </Grid>
                    </Grid>
                </Card>
                <Card style={{padding:'20px', margin:'10px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography style={{ fontWeight: 'bold'}}> Vital Signs:</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Blood Pressure: {`${healthRecord.VitalSigns.BloodPressure}`} </Typography>
                            <Typography>Heart Rate: {`${healthRecord.VitalSigns.HeartRate}`} </Typography>
                            <Typography>Height: {`${healthRecord.VitalSigns.Height}`}</Typography>
                            <Typography>Weight: {`${healthRecord.VitalSigns.Weight}`} </Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <div>
                            <Typography>Comments: </Typography>
                            </div>
                            <TextField 
                                fullWidth
                                multiline
                                value={comment}
                                onChange={handleInputChange}
                                onKeyDown={handleCommentEntered("VitalSigns")}
                                placeholder="Add A Comment on The Vital Signs"
                            >
                            </TextField>
                            <ul>
                            {healthRecord.VitalSigns.Comments.map((item, index) => (
                                <div>
                                    <li key={index}>{`${item}`}</li>
                                </div>
                            ))}
                            </ul>                        
                            </Grid>
                    </Grid>
                </Card>
                <Card style={{padding:'20px', margin:'10px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography style={{ fontWeight: 'bold'}}> Laboratory:</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>BloodTests: </Typography>
                            {healthRecord.Laboratory.BloodTests.map((item, index) => (
                                <div>
                                 <a href={`/routes/patient/patientDocument/${item}`} target="_blank" rel="noopener noreferrer">
                                 {item}
                                 </a>
                                    
                                </div>
                            ))}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>XRays: </Typography>
                            {healthRecord.Laboratory.XRays.map((item, index) => (

                            <div>
                            <a href={`/routes/patient/patientDocument/${item}`} target="_blank" rel="noopener noreferrer">
                            {item}
                            </a>

                            </div>
                            ))}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Other: </Typography>
                            {healthRecord.Laboratory.Other.map((item, index) => (
                               <div>
                               <a href={`/routes/patient/patientDocument/${item}`} target="_blank" rel="noopener noreferrer">
                               {item}
                               </a>
   
                               </div>
                            ))}
                        </Grid>
                        <Grid item xs={12}>
                        <div>
                            <Typography>Comments: </Typography>
                            </div>
                            <TextField 
                                fullWidth
                                multiline
                                value={comment}
                                onChange={handleInputChange}
                                onKeyDown={handleCommentEntered("Laboratory")}
                                placeholder="Add A Comment on The Laboratory Results"
                            >
                            </TextField>
                            <ul>
                            {healthRecord.Laboratory.Comments.map((item, index) => (
                                <div>
                                    <li key={index}>{`${item}`}</li>
                                </div>
                            ))}
                            </ul>                        
                            </Grid>
                    </Grid>
                </Card>
                <Card style={{padding:'20px', margin:'10px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div>
                            <Typography style={{ fontWeight: 'bold'}}> General Comments:</Typography>
                            </div>
                            <TextField 
                                fullWidth
                                multiline
                                value={comment}
                                onChange={handleInputChange}
                                onKeyDown={handleCommentEntered("GeneralComments")}
                                placeholder="Add A General Comments"
                            >
                            </TextField>
                            <ul>
                            {healthRecord.GeneralComments.map((item, index) => (
                                <div>
                                    <li key={index}>{`${item}`}</li>
                                </div>
                            ))}
                            </ul> 
                        </Grid>
                        
                    </Grid> 
                </Card>
                <Card style={{padding:'20px', margin:'10px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography style={{ fontWeight: 'bold'}}> General Images:</Typography>
                            {healthRecord.GeneralImages.map((item, index) => (
                                 <div>
                                    <a href={`/routes/patient/patientDocument/${item}`} target="_blank" rel="noopener noreferrer">
                                    {item}
                                    </a>
                                 </div>
                            ))}
                        </Grid>
                    </Grid>
                </Card>
            </Container>
            )}
        </Container>
    
    );
}

export default HealthRecord