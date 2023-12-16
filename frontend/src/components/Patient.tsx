import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import logo from "../man.jpg";
import { style } from "@mui/system";

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
      const response = await axios.get(`
        /routes/doctors/HealthRecord?patientUsername=${username}`);
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
  const { name, username, mobilenumber, email, gender, dateofbirth } = patient;

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
  // const buttonStyle = {
  //   margin: "8px",
  //   width: "250px",
  //   height: "50px",
  //   borderColor: "grey", // Blue border color
  //   color: "black", // Set text color to black
  // };

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
  const openGmail = (email: any) => {
    window.open(`mailto:${email}`);
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

      // Append prescriptionId to the URL
     
      const newWindow = window.open(
        ` http://localhost:3001/doctormed/${prescriptionId}`,
        "_blank"
      );

      if (!newWindow) {
        console.error("Unable to open a new window.");
      }
    } catch (error) {
      console.error("Error in addPresc:", error);
    }
  };

  function calculateAge(dateOfBirth: string | number | Date) {
    const dob = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();

    // Check if the birthday has already occurred this year
    const hasBirthdayOccurred =
      today.getMonth() > dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

    // Subtract 1 from the age if the birthday hasn't occurred yet
    if (!hasBirthdayOccurred) {
      age--;
    }

    return age;
  }

  const age = calculateAge(dateofbirth);
  const paperStyle = {
    display: "flex",
    margin: "10px auto",
    width: "700px",
    height: "auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    ":hover": {
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    },
    borderRadius: "10px",
    overflow: "hidden",
    transition: "box-shadow 0.3s ease-in-out",
  };

  const imageContainerStyle = {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${logo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const infoContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    padding: "16px",
    width: "50%",
  };

  const buttonStyle = {
    marginTop: "8px",
    fontSize: "0.75rem",
    padding: "5px 5px",
  };

  function handleAppoinments(): void {
    localStorage.setItem("myPatient", username);
    navigate("/doctor/patients/appointment");
  }

  return (
    <Paper sx={paperStyle}>
      <Box sx={imageContainerStyle} />
      <Box sx={infoContainerStyle}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          @{username}
        </Typography>
        <Typography variant="body1">Age: {age}</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <EmailIcon
            color="primary"
            sx={{ mr: 1 }}
            onClick={() => openGmail(email)}
          />
          <Typography
            variant="body1"
            sx={{
              color: "initial",
              "&:hover": {
                color: "primary.main",
                cursor: "pointer",
              },
            }}
            onClick={() => openGmail(email)}
          >
            {email}
          </Typography>{" "}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocalPhoneIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="body1">{mobilenumber}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            sx={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onClick={healthRecordClick}
          >
            Health Record
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onMouseEnter={handleMouseEnter}
            sx={buttonStyle}
            onClick={addPresc}
          >
            Add Prescription
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onMouseEnter={handleMouseEnter}
            sx={buttonStyle}
            onClick={handleAppoinments}
          >
            Appointments
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Patient;
