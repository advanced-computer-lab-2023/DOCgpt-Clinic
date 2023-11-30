import { Button, Card, Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const handleCreateConversation = async ({ name }: { name: string }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "/routes/conversation/startConv",
        {
          secondusername: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("recieverusername", name);
      setResponse(response.data);
      console.log(response.data._id);
      navigate(`/chat/${response.data._id}`);
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };
  return (
    <Card
      style={{
        padding: "20px",
        margin: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Container onClick={handleClick}>
        <Typography> Patient Name: {name}</Typography>
      </Container>
      <Button variant="contained" onClick={healthRecordClick}>
        {" "}
        Health Record
      </Button>
      <Button
        variant="contained"
        onClick={() => handleCreateConversation({ name })}
      >
        Create Conversation
      </Button>
    </Card>
  );
};
export default Patient;
