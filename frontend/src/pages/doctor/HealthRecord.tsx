import { Card, CardContent, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoctorBar from "../../components/Doctor bar/doctorBar";
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
    return (
        <>
          <DoctorBar />
          <Container>
            {healthRecord && (
              <Paper
                style={{
                  padding: "20px",
                  marginTop: "20px",
                  marginLeft:'130px',
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width:'1000px'
                 
                }}
                elevation={3}
              >
                {/* Icon centered in the Paper */}
                <AddCircleIcon
                  style={{ color: "red", fontSize: "6rem", margin: "20px 0" }}
                />
      
                {/* Space between the icon and cards */}
                <div style={{ width: "100%", height: "2rem" }}></div>
      
                {/* Cards container for Medical History and Medication List */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Medical History section */}
                  <Card
                    style={{
                      height: '250px',
                      width: "48%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Paper
                      style={{ backgroundColor: "grey", padding: "10px" }}
                      elevation={3}
                    >
                      <Typography variant="h6" style={{ color: "white" }}>
                        Medical History
                      </Typography>
                    </Paper>
                    <CardContent style={{ flex: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography>Allergies:</Typography>
                          <ul>
                            {healthRecord.MedicalHistory.Allergies.map(
                              (item, index) => (
                                <li key={index}>{item}</li>
                              )
                            )}
                          </ul>
                        </Grid>
                        <Grid item xs={12}>
  <Typography>Past Medical Conditions:</Typography>
  {healthRecord.MedicalHistory.PastMedicalConditions.length > 0 ? (
    <ul>
      {healthRecord.MedicalHistory.PastMedicalConditions.map(
        (item, index) => (
          <li key={index}>{item}</li>
        )
      )}
    </ul>
  ) : (
    <Typography>No data provided</Typography>
  )}
</Grid>

                      </Grid>
                    </CardContent>
                  </Card>
      
                  {/* Medication List section */}
                  <Card
                    style={{
                      height: '250px',
                      width: "48%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Paper
                      style={{ backgroundColor: "grey", padding: "10px" }}
                      elevation={3}
                    >
                      <Typography variant="h6" style={{ color: "white" }}>
                        Medication List
                      </Typography>
                    </Paper>
                    <CardContent style={{ flex: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography>Current Medications:</Typography>
                          <ul>
                            {healthRecord.MedicationList.CurrentMedications.Names.map(
                              (item, index) => (
                                <li key={index}>{item}</li>
                              )
                            )}
                          </ul>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>Past Medications:</Typography>
                          <ul>
                            {healthRecord.MedicationList.PastMedications.Names.map(
                              (item, index) => (
                                <li key={index}>{item}</li>
                              )
                            )}
                          </ul>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </div>
      
                {/* Container for Vital Signs and Laboratory (side by side) */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  {/* Vital Signs section */}
                  <Card
                    style={{
                      height: '250px',
                      width: "48.5%",
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "10px",
                    }}
                  >
                    <Paper
                      style={{ backgroundColor: "grey", padding: "10px" }}
                      elevation={3}
                    >
                      <Typography variant="h6" style={{ color: "white" }}>
                        Vital Signs
                      </Typography>
                    </Paper>
                    <CardContent style={{ flex: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography style={{ marginBottom: '10px' }}>
                            Blood Pressure: {`${healthRecord.VitalSigns.BloodPressure}`}
                          </Typography>
                          <Typography style={{ marginBottom: '10px' }}>
                            Heart Rate: {`${healthRecord.VitalSigns.HeartRate}`}
                          </Typography >
                          <Typography style={{ marginBottom: '10px' }}>
                            Height: {`${healthRecord.VitalSigns.Height}`}
                          </Typography>
                          <Typography style={{ marginBottom: '10px' }}>
                            Weight: {`${healthRecord.VitalSigns.Weight}`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
      
                  {/* Laboratory section */}
                  <Card
                    style={{
                      marginRight: '8px',
                      height: '250px',
                      width: "48.5%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Paper
                      style={{ backgroundColor: "grey", padding: "10px" }}
                      elevation={3}
                    >
                      <Typography variant="h6" style={{ color: "white" }}>
                        Laboratory
                      </Typography>
                    </Paper>
                    <CardContent style={{ flex: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography style={{ marginBottom: '40px' }}>BloodTests:</Typography>
                          {healthRecord.Laboratory.BloodTests.map((item, index) => (
                            <div key={index}>
                              <a
                                href={`/routes/patient/patientDocument/${item}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {item}
                              </a>
                            </div>
                          ))}
                        </Grid>
                        <Grid item xs={12}>
                          <Typography style={{ marginBottom: '40px' }}>XRays:</Typography>
                          {healthRecord.Laboratory.XRays.map((item, index) => (
                            <div key={index}>
                              <a
                                href={`/routes/patient/patientDocument/${item}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {item}
                              </a>
                            </div>
                          ))}
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </div>
      
                {/* General Comments section (newly added) */}
                <Card
                  style={{
                    height: '250px',
                    width: "48.5%",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "10px",
                    marginRight: "480px", // Add margin-right to create space beside the Laboratory Card
                  }}
                >
                    
                    <Paper
                    style={{ backgroundColor: "grey", padding: "10px" }}
                    elevation={3}
                  >
                    <Typography variant="h6" style={{ color: "white" }}>
                      General Images
                    </Typography>
                  </Paper>
                  <CardContent style={{ flex: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <div>
                          <Typography style={{ fontWeight: "bold" }}>
                            General Images:
                          </Typography>
                          {healthRecord.GeneralImages.map((item, index) => (
                            <div key={index}>
                              <a
                                href={`/routes/patient/patientDocument/${item}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {item}
                              </a>
                            </div>
                          ))}
                        </div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
      
      
                {/* General Images section (newly added) */}
                <Card
                  style={{
                    height: '250px',
                    width: "48.5%",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "-250px",
                    marginLeft:"480px",
                   
                  }}
                >
                     <Paper
                    style={{ backgroundColor: "grey", padding: "10px" }}
                    elevation={3}
                  >
                    <Typography variant="h6" style={{ color: "white" }}>
                      General Comments
                    </Typography>
                  </Paper>
                  <CardContent style={{ flex: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <div>
                          <Typography style={{ fontWeight: "bold" }}>
                            General Comments:
                          </Typography>
                        </div>
                        <TextField
                          fullWidth
                          multiline
                          value={comment}
                          onChange={handleInputChange}
                          onKeyDown={handleCommentEntered("GeneralComments")}
                          placeholder="Add A General Comment"
                        />
                        <ul>
                          {healthRecord.GeneralComments.map((item, index) => (
                            <div key={index}>
                              <li key={index}>{`${item}`}</li>
                            </div>
                          ))}
                        </ul>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
      
                {/* Rest of your code for other sections goes here */}
              </Paper>
            )}
          </Container>
        </>
      );
      
      
      
     
      
      
      
      
    }
    

export default HealthRecord