import { Button, Card, Container, Grid, Link, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

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
    
      
    

    return(
        <Container>
            {healthRecord && (
            <Container>
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
                           
                            <input
                                type="file"
                                accept=".pdf, .jpg, .jpeg, .png"
                                onChange={handleFileChange}
                            />
                            <Button variant="contained" onClick={handleSubmit("MedicationList", "CurrentMedications")}>
                                Submit Document
                            </Button>
                            {healthRecord.MedicationList.CurrentMedications.Prescriptions.map((item, index) => (
                                <div>
                                   <Typography>Prescription: 
                                   <a href={`/routes/patient/patientDocument/${item}`} target="_blank" rel="noopener noreferrer">
                                    {item}
                                    </a>
                                             </Typography>
                                             <Button onClick={handleRemove("MedicationList", "CurrentMedications", item)}>
                                        Remove Document
                                     </Button>
                                    
                                </div>
                            ))}
                            
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>PastMedications: </Typography>
                            <ul>
                            {healthRecord.MedicationList.PastMedications.Names.map((item, index) => (
                                <div>
                                    <li key={index}> Name: {`${item}`}</li>
                                </div>
                            ))}
                            </ul>
                                <input
                                    type="file"
                                    accept=".pdf, .jpg, .jpeg, .png"
                                    onChange={handleFileChange}
                                />
                                <Button variant="contained" onClick={handleSubmit("MedicationList", "PastMedications")}>
                                    Submit Document
                                </Button>
                                        
                            {healthRecord.MedicationList.PastMedications.Prescriptions.map((item, index) => (
                                <div>
                                   <Typography>Prescription: 
                                   <a href={`/routes/patient/patientDocument/${item}`} target="_blank" rel="noopener noreferrer">
                                    {item}
                                    </a>
                                             </Typography>
                                             <Button onClick={handleRemove("MedicationList", "PastMedications", item)}>
                                        Remove Document
                                     </Button>
                                    
                                </div>
                            ))}
                            
                        </Grid>
                        <Grid item xs={12}>
                        <div>
                            <Typography>Comments: </Typography>
                            </div>
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
                        <Grid item xs={6}>
                            <Typography>BloodTests: </Typography>
                            {healthRecord.Laboratory.BloodTests.map((item, index) => (
                                <div>
                                 <a href={`/routes/patient/patientDocument/${item}`} target="_blank" rel="noopener noreferrer">
                                 {item}
                                 </a>
                                     <Button onClick={handleRemove("Laboratory", "BloodTests", item)}>
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
                                        <Button variant="contained" onClick={handleSubmit("Laboratory", "BloodTests")}>
                                            Submit Document
                                        </Button>                           
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>XRays: </Typography>
                            {healthRecord.Laboratory.XRays.map((item, index) => (

                                <div>
                                 <a href={`/routes/patient/patientDocument/${item}`} target="_blank" rel="noopener noreferrer">
                                 {item}
                                 </a>
                                 <Button onClick={handleRemove("Laboratory", "XRays", item)}>
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
                                        <Button variant="contained" onClick={handleSubmit("Laboratory", "XRays")}>
                                            Submit Document
                                        </Button>                            
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Other: </Typography>
                            {healthRecord.Laboratory.Other.map((item, index) => (

                                <div>

                                 <a href={`/routes/patient/patientDocument/${item}`} target="_blank" rel="noopener noreferrer">
                                 {item}
                                 </a>
                                 <Button onClick={handleRemove("Laboratory", "Other", item)}>
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
                                        <Button variant="contained" onClick={handleSubmit("Laboratory", "Other")}>
                                            Submit Document
                                        </Button>                            
                        </Grid>
                        <Grid item xs={12}>
                        <div>
                            <Typography>Comments: </Typography>
                            </div>
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
                            <ul>
                            {healthRecord.GeneralComments.map((item, index) => (
                                <div>
                                    {item}
                                    
                                </div>
                            ))}
                            </ul> 
                        </Grid>
                        
                    </Grid> 
                </Card>
                <Card style={{padding:'20px', margin:'10px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography style={{ fontWeight: 'bold'}}> General Images:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                        <ul>
                            {healthRecord.GeneralImages.map((item, index) => (
                                <div>
                                     <a href={`/routes/patient/patientDocument/${item}`} target="_blank" rel="noopener noreferrer">
                                    {item}
                                    </a>
                                    <Button onClick={handleRemove("GeneralImages", "", item)}>
                                        Remove Document
                                     </Button>
                                </div>
                            ))}
                            </ul> 
                            <input
                                            type="file"
                                            accept=".pdf, .jpg, .jpeg, .png"
                                            onChange={handleFileChange}
                                        />
                                        <Button variant="contained" onClick={handleSubmit("GeneralImages", "")}>
                                            Submit Document
                                        </Button>                            
                        </Grid>
                    </Grid>
                </Card>
            </Container>
            )}
        </Container>
    );
}
export default ViewMyHealthRecord;