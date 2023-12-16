import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, Container, Grid, IconButton, Link, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import PatientBar from "../../components/patientBar/patientBar";
import Background from '../../HealthRec.jpg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import OpacityIcon from '@mui/icons-material/Opacity';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ScaleIcon from '@mui/icons-material/Scale';
import Back from "../../components/backButton";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface HealthRecord{
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
function ViewMyHealthRecord(){

    const [healthRecord, setHealthRecord] = useState<HealthRecord>();
    const [documentName, setDocumentName] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [submittedDocuments, setSubmittedDocuments] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
  const [showNoHealthRecordMessage, setShowNoHealthRecordMessage] = useState<boolean>(false);

    useEffect(() => {
        async function fetchHealthRecord() {
            try {
                const token=localStorage.getItem("authToken")
                const response = await fetch(`/routes/patient/healthRecord`,{
                headers:{
                    Authorization:`Bearer ${token}`
            }
        });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setHealthRecord(data.healthRecord);
            } else {
            console.error('Failed to fetch doctor data');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while fetching doctor data');
        }
        }
        fetchHealthRecord();
      }, []); // An empty dependency array means this effect runs once on component mount.

      useEffect(() => {
        if (!healthRecord) {
          setShowNoHealthRecordMessage(true);
        } else {
          setShowNoHealthRecordMessage(false);
        }
      }, [healthRecord]);
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
          setSelectedFiles(files);
        }
      };
    
     
      const handleSubmit = (section: string, subsection: string) => async () => {
        try {
            if (!selectedFiles) {
                setErrorMessage('Please fill in all the required fields.');
                return;
              }
      
          const formData = new FormData();
        //   const fileName = `${documentName.replace(/\s+/g, '')}_${selectedFiles[0].name}`;
          formData.append('documents', selectedFiles[0]);
          const token=localStorage.getItem("authToken")
          const response = await axios.patch(`/routes/patient/uploadDocs?section=${section}&subsection=${subsection}`, formData, {
            headers:{
                Authorization:`Bearer ${token}`
            }
          });
      
          if (response.status === 200) {
            alert("Submitted Successfully!")
            console.log(response);
            setErrorMessage(null);
          } else {
            console.error('Error submitting document:', response.statusText);
            setErrorMessage('Error submitting document. Please try again.');
          }
        } catch (error:any) {
          console.error('Error submitting document:', error.message);
          setErrorMessage('Error submitting document. Please try again.');
        }
      };

      const handleRemove = (section: string, subsection: string, path: String) => async () => {
        try {
              const token=localStorage.getItem("authToken")
             const response = await axios.patch(`/routes/patient/deleteDocs?section=${section}&subsection=${subsection}`, {
               path : path
             }, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
             });

             if (response.status === 200) {
                alert("Removed Successfully!")
                console.log(response);
                setErrorMessage(null);
              } else {
                console.error('Error removing document:', response.statusText);
                setErrorMessage('Error removing document. Please try again.');
              }

        } catch (error:any) {
          console.error('Error removing document:', error.message);
          setErrorMessage('Error removing document. Please try again.');
        }
      };
    
     
      return (
        <>
          <PatientBar />
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
          <strong>MY HEALTH RECORD</strong>
        </h1>
      </div>
    </div>
          {healthRecord ? (
            <Container>
              {/* Vital Signs Section */}
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

                  <div style={{ width: "100%", height: "2rem" }}></div>
              <Card
  style={{
    width: '97.4%', // Same width as the old Paper
    height: '100px', // Same height as the old Paper
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10px',
    marginLeft:'28px' // Add margin for space between MedicationList and Vital Signs
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
    <Typography style={{ marginRight: '120px' }}>
      Blood Pressure: {`${healthRecord.VitalSigns.BloodPressure || 'None'}`}
    </Typography>
    <MonitorHeartIcon style={{ color: 'red', marginLeft: '10px' }} />
    <Typography style={{ marginRight: '190px' }}>
      Heart Rate: {`${healthRecord.VitalSigns.HeartRate || 'None'}`}
    </Typography>
    {/* Add the icon here */}
    <AccessibilityNewIcon style={{ marginRight: '8px', color: 'red' }} /> {/* Add this line */}
    <Typography style={{ marginRight: '80px' }}>
      Height: {`${healthRecord.VitalSigns.Height || 'None'}`}
    </Typography>
    <ScaleIcon style={{ color: 'red' }} /> {/* Add this line */}
    <Typography style={{ marginLeft: '20px' }}>
      Weight: {`${healthRecord.VitalSigns.Weight || 'None'}`}
    </Typography>
  </div>
</CardContent>

</Card>

              {/* Medical History Section */}
             
        <Container>
          <Card
            style={{
              height: '250px',
              width: "50%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Paper
              style={{ backgroundColor: "white", padding: "10px" }}
              elevation={3}
            >
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
                    {healthRecord.MedicalHistory.Allergies.map((item, index) => (
                    <li key={index}>{item.trim() !== '' ? item : 'No Allergies For This Patient'}</li>
                    ))}
                  </ul>
                   ) : (
                    <Typography>No data provided</Typography>
                  )}
              </Grid>
                <Grid item xs={12}>
                  <Typography>Past Medical Conditions:</Typography>
                  {healthRecord.MedicalHistory.PastMedicalConditions.length > 0 ? (
                    <ul>
                      {healthRecord.MedicalHistory.PastMedicalConditions.map(
                        (item, index) => (
                          <li key={index}>{item.trim() !== '' ? item : 'No Past Medical Conditions '}</li>
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
        </Container>

        {/* Medication List Section */}
        <Card
          style={{
            height: '250px',
            width: "48%",
            display: "flex",
            flexDirection: "column",
            marginLeft: '20px', // Add margin to create space
            marginTop: '10px',
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
                  {healthRecord.MedicationList.PastMedications.Names.map(
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
          {/* Upload Documents Section */}
          <Card
  style={{
    height: '510px',
    width: "48%",
    display: "flex",
    flexDirection: "column",
    marginLeft: '635px', // Add margin to create space
    marginTop: '-510px',
  }}
>
  <Paper
    style={{ backgroundColor: "white", padding: "10px" }}
    elevation={3}
  >
    <Typography variant="h6" style={{ color: "black" }}>
      Upload Documents
    </Typography>
  </Paper>
  <CardContent style={{ flex: 1 }}>
    {/* BloodTests Upload Section */}
    <Grid item xs={6}>
      <Typography>BloodTests: </Typography>
      {healthRecord.Laboratory.BloodTests.map((item, index) => (
        <div key={index}>
          <a href={`/routes/patient/patientDocument/${item}`} target="_blank" rel="noopener noreferrer">
            {item}
          </a>
          <Button
            onClick={handleRemove("Laboratory", "BloodTests", item)}
            style={{
              backgroundColor: "grey", // Grey background color
              color: "#fff", // Text color
              transition: "background-color 0.3s ease", // Smooth transition on hover
              marginTop: "10px", // Adjust the margin-top here
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f44336")} // Hover style
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ccc")} // Revert to grey on mouse out
          >
            Remove Document
          </Button>
        </div>
      ))}
    </Grid>
    <div style={{ marginTop: '30px' }}></div> 
    <Grid item xs={6}>
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png"
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        onClick={handleSubmit("Laboratory", "BloodTests")}
        style={{
          backgroundColor: "grey", // Grey background color
          color: "#fff", // Text color
          transition: "background-color 0.3s ease", // Smooth transition on hover
          marginTop: "10px", // Adjust the margin-top here
          marginLeft:"56px"
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4285f4")} // Hover style
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "grey")} // Revert to grey on mouse out
      >
        Submit Document
      </Button>
    </Grid>

    {/* XRays Upload Section */}
    <Grid item xs={6}>
      <Typography>XRays: </Typography>
      {healthRecord.Laboratory.XRays.map((item, index) => (
        <div key={index}>
          <a href={`/routes/patient/patientDocument/${item}`} target="_blank" rel="noopener noreferrer">
            {item}
          </a>
          <Button
            onClick={handleRemove("Laboratory", "XRays", item)}
            style={{
              backgroundColor: "grey", // Grey background color
              color: "#fff", // Text color
              transition: "background-color 0.3s ease", // Smooth transition on hover
              marginTop: "10px", // Adjust the margin-top here
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f44336")} // Hover style
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "grey")} // Revert to grey on mouse out
          >
            Remove Document
          </Button>
        </div>
      ))}
    </Grid>
    <div style={{ marginTop: '30px' }}></div> 
    <Grid item xs={6}>
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png"
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        onClick={handleSubmit("Laboratory", "XRays")}
        style={{
          backgroundColor: "grey", // Grey background color
          color: "#fff", // Text color
          transition: "background-color 0.3s ease", // Smooth transition on hover
          marginTop: "10px", // Adjust the margin-top here
          marginLeft:"56px"
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4285f4")} // Hover style
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "grey")} // Revert to grey on mouse out
      >
        Submit Document
      </Button>
    </Grid>

    {/* Medication List Documents Upload Section */}
    <Grid item xs={6}>
      <Typography>Current Medications: </Typography>
     
      {healthRecord.MedicationList.CurrentMedications.Prescriptions.map((item, index) => (
        <div key={index}>
          <Typography>
            Prescription:{" "}
            <a href={`/routes/patient/patientDocument/${item}`} target="_blank" rel="noopener noreferrer">
              {item}
            </a>
          </Typography>
          <Button
            onClick={handleRemove("MedicationList", "CurrentMedications", item)}
            style={{
              backgroundColor: "grey", // Grey background color
              color: "#fff", // Text color
              transition: "background-color 0.3s ease", // Smooth transition on hover
              marginTop: "10px", // Adjust the margin-top here
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f44336")} // Hover style
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "grey")} // Revert to grey on mouse out
          >
            Remove Document
          </Button>
        </div>
      ))}
    </Grid>
 <div style={{ marginTop: '30px' }}></div> 
    <Grid item xs={6}>
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png"
        onChange={handleFileChange}
      />
     
      <Button
        variant="contained"
        onClick={handleSubmit("MedicationList", "CurrentMedications")}
        style={{
          backgroundColor: "grey", // Grey background color
          color: "#fff", // Text color
          transition: "background-color 0.3s ease", // Smooth transition on hover
          marginTop: "10px", // Adjust the margin-top here
          marginLeft:"56px"

        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4285f4")} // Hover style
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "grey")} // Revert to grey on mouse out
      >
        Submit Document
      </Button>
    </Grid>
  
    <Grid item xs={6}>
      <Typography>Past Medications: </Typography>
      
      <div style={{ marginTop: '30px' }}></div> 

      {healthRecord.MedicationList.PastMedications.Prescriptions.map((item, index) => (
        <div key={index}>
          <Typography>
            Prescription:{" "}
            <a href={`/routes/patient/patientDocument/${item}`} target="_blank" rel="noopener noreferrer">
              {item}
            </a>
          </Typography>
          <Button
            onClick={handleRemove("MedicationList", "PastMedications", item)}
            style={{
              backgroundColor: "grey", // Grey background color
              color: "#fff", // Text color
              transition: "background-color 0.3s ease", // Smooth transition on hover
              marginTop: "10px", // Adjust the margin-top here
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f44336")} // Hover style
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "grey")} // Revert to grey on mouse out
          >
            Remove Document
          </Button>
        </div>
      ))}
    </Grid>
    <Grid item xs={6}>
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png"
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        onClick={handleSubmit("MedicationList", "PastMedications")}
        style={{
          backgroundColor: "grey", // Grey background color
          color: "#fff", // Text color
          transition: "background-color 0.3s ease", // Smooth transition on hover
          marginTop: "10px", // Adjust the margin-top here
          marginLeft:"56px"

        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4285f4")} // Hover style
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "grey")} // Revert to grey on mouse out
      >
        Submit Document
      </Button>
    </Grid>
  </CardContent>
</Card>
   {/* General Comments Section */}
 


<Accordion style={{ width: '98%', margin: '0 auto', marginTop: "20px", marginBottom: "40px", marginLeft: '20px' }}>
  <AccordionSummary
    aria-controls="general-comments-content"
    id="general-comments-header"
    expandIcon={<ExpandMoreIcon />}
  >
    <Typography variant="h6" style={{ fontWeight: 'bold', margin: 'auto' }}>General Comments</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Card style={{ width: '98%', height: '120px' }}>
      <CardContent>
        <Typography style={{ fontWeight: 'bold' }}></Typography>
        {healthRecord.GeneralComments.length > 0 ? (
                              <ul>
          {healthRecord.GeneralComments.map((item, index) => (
           <li key={index}>{item.trim() !== '' ? item : 'No Comments Entered'}</li>
           ))}
           </ul>
         ) : (
           <Typography>No Comments Entered</Typography>
         )}
      </CardContent>
    </Card>
  </AccordionDetails>
</Accordion>


              </Container>
         ) : (




          <Container>
          {/* Vital Signs Section with all values set to null */}
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

                  <div style={{ width: "100%", height: "2rem" }}></div>
<Card
  style={{
    width: '97.4%',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10px',
    marginLeft: '28px'
  }}
>
  <Paper
    style={{ backgroundColor: 'white', padding: '10px', width: '1200px' }}
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
      <OpacityIcon style={{ color: 'red', marginRight: '10px' }} />
      <Typography style={{ marginRight: '120px' }}>
        Blood Pressure: None
      </Typography>
      <MonitorHeartIcon style={{ color: 'red', marginLeft: '10px' }} />
      <Typography style={{ marginRight: '190px' }}>
        Heart Rate: None
      </Typography>
      <AccessibilityNewIcon style={{ marginRight: '8px', color: 'red' }} />
      <Typography style={{ marginRight: '80px' }}>
        Height: None
      </Typography>
      <ScaleIcon style={{ color: 'red' }} />
      <Typography style={{ marginLeft: '20px' }}>
        Weight: None
      </Typography>
    </div>
  </CardContent>
</Card>

            {/* Medical History Section with all values set to null */}
<Card
    style={{
      height: '250px',
      width: "48%",
      display: "flex",
      flexDirection: "column",
      marginLeft: '20px'
    }}
  >
    <Paper
      style={{ backgroundColor: "white", padding: "10px" }}
      elevation={3}
    >
      <Typography variant="h6" style={{ color: "black" }}>
        Medical History
      </Typography>
    </Paper>
    <CardContent style={{ flex: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>Allergies:</Typography>
          <Typography>No data provided</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Past Medical Conditions:</Typography>
          <Typography>No data provided</Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>


            
           {/* Medication List Section with all values set to null */}
<Card
  style={{
    height: '250px',
    width: "48%",
    display: "flex",
    flexDirection: "column",
    marginLeft: '20px', // Add margin to create space
    marginTop: '10px',
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
        <Typography>No data provided</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>Past Medications:</Typography>
        <Typography>No data provided</Typography>
      </Grid>
    </Grid>
  </CardContent>
</Card>

    
            {/* Upload Documents Section with all values set to null */}
               {/* Upload Documents Section */}
          <Card
  style={{
    height: '510px',
    width: "48%",
    display: "flex",
    flexDirection: "column",
    marginLeft: '635px', // Add margin to create space
    marginTop: '-510px',
  }}
>
  <Paper
    style={{ backgroundColor: "white", padding: "10px" }}
    elevation={3}
  >
    <Typography variant="h6" style={{ color: "black" }}>
      Upload Documents
    </Typography>
  </Paper>
  <CardContent style={{ flex: 1 }}>
    {/* BloodTests Upload Section */}
    <Grid item xs={6}>
      <Typography>BloodTests: </Typography>
     
    </Grid>
    <div style={{ marginTop: '30px' }}></div> 
    <Grid item xs={6}>
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png"
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        onClick={handleSubmit("Laboratory", "BloodTests")}
        style={{
          backgroundColor: "grey", // Grey background color
          color: "#fff", // Text color
          transition: "background-color 0.3s ease", // Smooth transition on hover
          marginTop: "10px", // Adjust the margin-top here
          marginLeft:"56px"
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4285f4")} // Hover style
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "grey")} // Revert to grey on mouse out
      >
        Submit Document
      </Button>
    </Grid>

    {/* XRays Upload Section */}
    <Grid item xs={6}>
      <Typography>XRays: </Typography>
    
    </Grid>
    <div style={{ marginTop: '30px' }}></div> 
    <Grid item xs={6}>
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png"
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        onClick={handleSubmit("Laboratory", "XRays")}
        style={{
          backgroundColor: "grey", // Grey background color
          color: "#fff", // Text color
          transition: "background-color 0.3s ease", // Smooth transition on hover
          marginTop: "10px", // Adjust the margin-top here
          marginLeft:"56px"
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4285f4")} // Hover style
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "grey")} // Revert to grey on mouse out
      >
        Submit Document
      </Button>
    </Grid>

    {/* Medication List Documents Upload Section */}
    <Grid item xs={6}>
      <Typography>Current Medications: </Typography>
     
    
    </Grid>
 <div style={{ marginTop: '30px' }}></div> 
    <Grid item xs={6}>
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png"
        onChange={handleFileChange}
      />
     
      <Button
        variant="contained"
        onClick={handleSubmit("MedicationList", "CurrentMedications")}
        style={{
          backgroundColor: "grey", // Grey background color
          color: "#fff", // Text color
          transition: "background-color 0.3s ease", // Smooth transition on hover
          marginTop: "10px", // Adjust the margin-top here
          marginLeft:"56px"
        
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4285f4")} // Hover style
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "grey")} // Revert to grey on mouse out
      >
        Submit Document
      </Button>
    </Grid>
  
    <Grid item xs={6}>
      <Typography>Past Medications: </Typography>
      
      <div style={{ marginTop: '30px' }}></div> 

     
    </Grid>
    <Grid item xs={6}>
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png"
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        onClick={handleSubmit("MedicationList", "PastMedications")}
        style={{
          backgroundColor: "grey", // Grey background color
          color: "#fff", // Text color
          transition: "background-color 0.3s ease", // Smooth transition on hover
          marginTop: "10px", // Adjust the margin-top here
          marginLeft:"56px"
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4285f4")} // Hover style
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "grey")} // Revert to grey on mouse out
      >
        Submit Document
      </Button>
    </Grid>
  </CardContent>
</Card>
    
            {/* General Comments Section with all values set to null */}
            <Accordion style={{ width: '98%', margin: '0 auto', marginTop: '20px', marginBottom: '40px', marginLeft: '20px' }}>
              <AccordionSummary
                aria-controls="general-comments-content"
                id="general-comments-header"
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="h6" style={{ fontWeight: 'bold', margin: 'auto' }}>General Comments</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Card style={{ width: '98%', height: '120px' }}>
                  <CardContent>
                  <Typography >No General Comments Yet</Typography>
                  </CardContent>
                </Card>
              </AccordionDetails>
            </Accordion>
          </Container>
        )}
        </>
      );
      
      
      
      

      
      
    

}
export default ViewMyHealthRecord;