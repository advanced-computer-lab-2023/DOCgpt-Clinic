import { Button, Card, CardContent, Container, Grid, Paper, Snackbar, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoctorBar from "../../components/Doctor bar/doctorBar";
import Background from '../../HealthRec.jpg';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ScaleIcon from '@mui/icons-material/Scale';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import OpacityIcon from '@mui/icons-material/Opacity';
import Back from "../../components/backButton";
import MuiAlert from '@mui/material/Alert';

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
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
    const [snackbarOpenError, setSnackbarOpenError] = useState(false);  

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
    
    const handleCommentEntered = async () => {
      try {
        if (!comment) {
          // If the comment is empty, show the error Snackbar and return early
          setSnackbarOpenError(true);
          return;
        }
    
        // Your logic to handle adding the comment
        const response = await axios.patch(`/routes/doctors/HealthRecord/comments?patientUsername=${patientUsername}`, {
          section: 'GeneralComments',
          comment,
        });
    
        // Clear the comment input field
        setComment('');
    
        // Show the success Snackbar
        setSnackbarOpenSuccess(true);
        
        // You may also want to fetch the updated comments here if needed
      } catch (error) {
        console.error('Error:', error);
    
        // Show the error Snackbar
        setSnackbarOpenError(true);
      }
    };
    
        
    //return
    //THE VIEW 
    //DISPLAYING SECTIONS OF THE HEALTH RECORD IN A PROPER WAY AND DIPLAYING IMAGES AND NOTES 
    return (
      <>
       <DoctorBar/>
       <div
      
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '50vh',
        marginBottom:'100px',
        backgroundPosition: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Increased shadow values
      }}
    >   
        <Back/>
     <div
      style={{
        position: 'absolute', // Set position to absolute
        top: '50%', // Adjust top value to center vertically
        left: '50%', // Adjust left value to center horizontally
        transform: 'translate(-50%, -50%)', // Center the text
        textAlign: 'center', // Center text horizontally
        color: 'white', // Set text color
      }}
    >
      <h1> <strong>MY PATIENTS</strong></h1>
      {/* <p>Additional text content</p> */}
    </div>
  </div>
          <Container>
            {healthRecord && (
              <Container>
               
                {/* Icon centered in the Paper */}
                <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  }}
>
  <AddCircleOutlineIcon
    style={{  color: 'red', fontSize: '6rem', margin: '20px 0' }}
  />
</div>
              
          

        
      
          
                {/* Space between the icon and cards */}
                <div style={{ width: "100%", height: "2rem" }}></div>
                <Card
  style={{
    width: '97.4%', // Same width as the old Paper
    height: '100px', // Same height as the old Paper
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10px',
    marginLeft:'18px' // Add margin for space between MedicationList and Vital Signs
  }}
>
  <Paper
    style={{ backgroundColor: 'white', padding: '10px',width:'1200px'}}
    elevation={3}
  >
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Typography variant="h6" style={{ color: 'black' }}>
        Vital Signs
      </Typography>
    </div>
  </Paper>
  <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <OpacityIcon style={{ color: 'red', marginRight: '10px' }} /> {/* Add the icon here */}
      <Typography  style={{ marginRight: '120px' }}>Blood Pressure: {`${healthRecord.VitalSigns.BloodPressure}`}</Typography>
      <MonitorHeartIcon style={{ color: 'red', marginLeft: '10px' }} />
      <Typography style={{ marginRight: '190px' }}>Heart Rate: {`${healthRecord.VitalSigns.HeartRate}`}</Typography>
      {/* Add the icon here */}
      <AccessibilityNewIcon style={{ marginRight: '8px' ,color: 'red'}} /> {/* Add this line */}
<Typography style={{ marginRight: '80px' }}>Height: {`${healthRecord.VitalSigns.Height}`}</Typography>
<ScaleIcon style={{ color: 'red' }} /> {/* Add this line */}
  <Typography style={{ marginLeft: '20px' }}>Weight: {`${healthRecord.VitalSigns.Weight}`}</Typography>
    </div>
  </CardContent>
</Card>


   {/* Success Snackbar */}
   <Snackbar
      open={snackbarOpenSuccess}
      autoHideDuration={2000}
      onClose={() => setSnackbarOpenSuccess(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <MuiAlert severity="success" sx={{ width: '100%', fontSize: '1.5rem' }}>
        Comment Added Successfully
      </MuiAlert>
    </Snackbar>

    {/* Error Snackbar */}
    <Snackbar
      open={snackbarOpenError}
      autoHideDuration={2000}
      onClose={() => setSnackbarOpenError(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <MuiAlert severity="error" sx={{ width: '100%', fontSize: '1.5rem' }}>
        Failed to Add Comment
      </MuiAlert>
    </Snackbar>
  

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
                      style={{ backgroundColor: "white", padding: "10px" }}
                      elevation={3}
                    >
                       {/* Add the patient's name as a title or heading */}
           

                      <Typography variant="h6" style={{ color: "black" }}>
                        Medical History
                      </Typography>
                    </Paper>
                    <CardContent style={{ flex: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography>Allergies:</Typography>
                          {healthRecord.MedicalHistory.Allergies.length > 0 ? (
    <ul>
      {healthRecord.MedicalHistory.Allergies.map(
                              (item, index) => (
                                <li key={index}>{item.trim() !== '' ? item : 'No Allergies For This Patient'}</li>
                              )
                            )}
                          </ul>
                            ) : (
                              <Typography>No data provided</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
  <Typography>Past Medical Conditions:</Typography>
  {healthRecord.MedicalHistory.PastMedicalConditions.length > 0 ? (
    <ul>
      {healthRecord.MedicalHistory.PastMedicalConditions.map((item, index) => (
        <li key={index}>{item.trim() !== '' ? item : 'No Past Medical Conditions '}</li>
      ))}
    </ul>
  ) : (
    <Typography>No Past Medical Conditins</Typography>
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
                      style={{ backgroundColor: "white", padding: "10px" }}
                      elevation={3}
                    >
                      <Typography variant="h6" style={{ color: "black" }}>
                        Medication List
                      </Typography>
                    </Paper>
                    <CardContent style={{ flex: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography>Current Medications:</Typography>
                      
                          {healthRecord.MedicationList.CurrentMedications.Names.length > 0 ? (
                                <ul>
                            {healthRecord.MedicationList.CurrentMedications.Names.map(
                              (item, index) => (
                              
                                  <li key={index}>{item.trim() !== '' ? item : 'No Current Medications'}</li>
                                )
                              )}
                            </ul>
                              ) : (
                                <Typography>No Current Medications</Typography>
                              )}
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>Past Medications:</Typography>
                         
                          {healthRecord.MedicationList.PastMedications.Names.length > 0 ? (
                              <ul>
                           { healthRecord.MedicationList.PastMedications.Names.map(

                              (item, index) => (
                               
                                <li key={index}>{item.trim() !== '' ? item : 'No Past Medications'}</li>
                                ))}
                                </ul>
                              ) : (
                                <Typography>No Past Medications</Typography>
                              )}
                            </Grid>
                            
                      </Grid>
                    </CardContent>
                  </Card>
                </div>
      
               
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  {/* Vital Signs section
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
                  </Card> */}
      
                  {/* Laboratory section */}
                  <Card
                    style={{
                      marginLeft: '10px',
                      height: '250px',
                      width: "48.5%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Paper
                      style={{ backgroundColor: "white", padding: "10px" }}
                      elevation={3}
                    >
                      <Typography variant="h6" style={{ color: "black" }}>
                        Laboratory
                      </Typography>
                    </Paper>
                    <CardContent style={{ flex: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography style={{ marginBottom: '30px' }}>BloodTests:</Typography>
                          {healthRecord.Laboratory.BloodTests.length > 0 ? (
                          healthRecord.Laboratory.BloodTests.map((item, index) => (
                            <div key={index}>
                              <a
                                href={`/routes/patient/patientDocument/${item}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {item}
                              </a>
                            </div>
                          ))
                          ) : (
                            <Typography>No Blood Tests Available</Typography>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <Typography style={{ marginBottom: '30px' }}>XRays:</Typography>
                          {healthRecord.Laboratory.XRays.length > 0 ? (
                          healthRecord.Laboratory.XRays.map((item, index) => (
                            <div key={index}>
                              <a
                                href={`/routes/patient/patientDocument/${item}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {item}
                              </a>
                            </div>
                          ))
                          ) : (
                            <Typography>No XRays Available</Typography>
                          )}
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </div>
      
                {/* General images section (newly added) */}
                <Card
                  style={{
                    height: '250px',
                    width: "48.5%",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "-250px",
                    marginLeft: "605px", // Add margin-right to create space beside the Laboratory Card
                  }}
                >
                    

  <Paper
    style={{ backgroundColor: "white", padding: "10px" }}
    elevation={3}
  >
    <Typography variant="h6" style={{ color: "black" }}>
      General Images
    </Typography>
  </Paper>
  <CardContent style={{ flex: 1 }}>
    <div>
      <Typography style={{ fontWeight: "bold" }}>
        General Images:
      </Typography>
      {healthRecord.GeneralImages.length > 0 ? (
        healthRecord.GeneralImages.map((item, index) => (
          <div key={index}>
            <a
              href={`/routes/patient/patientDocument/${item}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item}
            </a>
          </div>
        ))
      ) : (
        <Typography>No image uploaded</Typography>
      )}
    </div>
  </CardContent>
</Card>

      
                {/* General Images section (newly added) */}
              
                {/* Rest of your code for other sections goes here */}


                <Card
  style={{
    height: `${100 + healthRecord.GeneralComments.length * 40}px`, // Adjust the height as needed
    overflowY: 'auto', // Add scrollbar if needed
    width: '99%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
    marginLeft: '10px',
  }}
>
  <Paper
    style={{ backgroundColor: 'white', padding: '10px' }}
    elevation={3}
  >
    <Typography
      variant="h6"
      style={{ color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      General Comments
    </Typography>
  </Paper>
  <CardContent style={{ flex: 1 }}>
    <div>
      <Typography style={{ fontWeight: 'bold' }}></Typography>
    </div>
    <TextField
      fullWidth
      multiline
      value={comment}
      onChange={handleInputChange}
      placeholder="Add A General Comment"
    />
    <Button variant="contained" onClick={handleCommentEntered}>
      Add Comment
    </Button> {/* Button to add a comment */}
    <ul>
      {healthRecord.GeneralComments.map((item, index) => (
        <div key={index}>
          <li key={index}>{`${item}`}</li>
        </div>
      ))}
    </ul>
  </CardContent>
</Card>


              </Container>
            )}
          </Container>
</>
      );
      
      
      
     
      
      
      
      
    }
    

export default HealthRecord