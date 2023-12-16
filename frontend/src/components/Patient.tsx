import { Button, Card, Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
interface HealthRecord {
  patient: string;
  MedicalHistory: {
    Allergies: [String];
    PastMedicalConditions: [String];
    Comments: [String];
  };
  MedicationList: {
    CurrentMedications: {
      Names: [String];
      //IMAGE URL
      Prescriptions: [String];
    };
    PastMedications: {
      Names: [String];
      //IMAGE URL
      Prescriptions: [String];
    };
    Comments: [String];
  };
  VitalSigns: {
    BloodPressure: {
      type: Number;
    };
    HeartRate: {
      type: Number;
    };
    Height: {
      type: Number;
    };
    Weight: {
      type: Number;
    };
    Comments: [String];
  };
  Laboratory: {
    //IMAGES URI
    BloodTests: [String];
    XRays: [String];
    Other: [String];
    Comments: [String];
  };
  GeneralComments: [String];
  GeneralImages: [String];
}

interface PatientProps {
  patient: any;
  doctor: any;
}



const Patient = ({ patient, doctor }: PatientProps) => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState(false); // State to track button hover
  const [healthRecord, setHealthRecord] = useState<HealthRecord | null>(null);
  const [response, setResponse] = useState<any>(null);
  const fetchHealthRecord = async () => {
    console.log("Fetching Health Record of this Patient...");
    try {
      const response = await axios.get(
        `/routes/doctors/HealthRecord?patientUsername=${username}`
      );
      console.log("Response:", response);
      setHealthRecord(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchHealthRecord();
  }, []);

  if (!patient) {
    return null;
  }
  const { name, username } = patient;

  const handleClick = () => {
    // Add your click event handling logic here
    if (username) {
      const params = new URLSearchParams();
      params.append("patient", username);
      navigate(`/doctor/patientInfo?${params.toString()}`);
    }
  };
  const handleMouseEnter = () => {
    setHoveredButton(true);
  };

  const handleMouseLeave = () => {
    setHoveredButton(false);
  };
  const buttonStyle = {
    margin: "8px",
    width: "250px",
    height: "50px",
    borderColor: "grey", // Blue border color
    color: "black", // Set text color to black
  };

  const healthRecordClick = () => {
    if (username && !healthRecord) {
      const params = new URLSearchParams();
      params.append("patient", username);
      navigate(`/doctor/healthRecordEmpty?${params.toString()}`);
    } else if (username && healthRecord) {
      const params = new URLSearchParams();
      params.append("patient", username);
      navigate(`/doctor/patientHealthRecord?${params.toString()}`);
    }
  };

  const addPresc = async (name: any) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "/routes/prescriptions",
        {
          patientUsername: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Extract prescriptionId from the response
      const prescriptionId = response.data._id;
  
      if (prescriptionId) {
        window.location.href = `http://localhost:3001/doctormed/${prescriptionId}`;
      } else {
        console.error("Prescription ID is undefined or null.");
      }
    } catch (error) {
      console.error("Error in addPresc:", error);
    }
  };
  
  const cardStyle = {
    padding: "20px",
    margin: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
     // Light blue border color
  };
  const iconStyle = {
    fontSize: "95px", // Adjust the icon size as needed
    color: "#777777", // Grey icon color
    marginLeft:'22px',
    marginBottom: '5px',
    
  };

  const nameStyle = {
    fontSize: "16px",
    fontWeight: "bold", // Make the name bold
    textAlign: "center", // Center the text
  };
  const buttonContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  return (
    <Card style={cardStyle}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <AccountCircleIcon style={iconStyle} />
        <Typography variant="subtitle1" sx={nameStyle}>
  {name}
</Typography>
      </div>
  
      <div style={buttonContainerStyle}>
        {/* Health Record Button */}
        <Button
          variant="outlined"
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={healthRecordClick}
        >
          Health Record
        </Button>
  
        {/* Add Prescription Button */}
        <Button
          variant="outlined"
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => addPresc(username)}
        >
          Add Prescription
        </Button>
      </div>
    </Card>
  );
  
};

export default Patient;
