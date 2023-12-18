import { IconButton, Paper, Stack, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useLocation, useNavigate } from "react-router-dom";
import DroctorBar from "../../components/Doctor bar/doctorBar";
import DoctorBar from "../../components/Doctor bar/doctorBar";
import Background from "../../HealthRec.jpg";
import Back from "../../components/backButton";

import El7a2niInfo from "../../components/El7a2ni-info";
import El7a2niDocInfo from "../../components/El7a2niDoc-info";

function HealthRecordEmpty(){
    //Take the Patient username
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('patient');
    const navigate = useNavigate();

  //THE LOGIC OF CHECKING THAT THIS PATIENT WE JUST CLICKED HIS(HEALTH RECORD)BUTTON DOES NOT ACTUALLY HAVE ONE YET, AND DISPLAYING A MESSAGE THAT THIS PATIENT DOES NOT HAVE A HEALTH RECORD YET AND AN OPTION (+) BUTTON TO ADD
  const goToAdd = () => {
    //Send the Patient username
    if (username) {
      const params = new URLSearchParams();
      params.append("patient", username);
      navigate(`/doctor/healthRecordForm?${params.toString()}`);
    }
  };
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
  //return
  //THE VIEW
  //A SIMPLE MESSEGE IN THE MIDDLE OF THE SCREEN AND A PLUS BUTTON THAT REDIRECT TO THE (HEALTH RECORD FORM) PAGE
  return (
    <>
      <DoctorBar />
      <div
        style={{
          position: "relative",
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          minHeight: "50vh",
          marginBottom: "100px",
          backgroundPosition: "center",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Transparent overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
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
          <strong>EMPTY HEALTH RECORD</strong>
        </h1>
      </div>
    </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 'calc(100vh - 100px)', // Decrease the height by 100px
            }}
          >
            <Paper
              elevation={3}
              style={{
                padding: '60px',
                textAlign: 'center',
                maxWidth: '2000px',
                width:'600px', // Decrease the maximum width
                height:'400px'
              }}
            >
              <Typography variant="h4" style={{fontSize: 30,padding:'30px'}}>
                This patient Does Not Have Any Health Record yet!
              </Typography>
              <IconButton onClick={goToAdd}>
                <AddCircleIcon sx={{ color: 'red', fontSize: 30 }} />
              </IconButton>
              <Typography>
                Add A Health Record
              </Typography>
            </Paper>
          </div>
        <El7a2niInfo />
        </>
      );
      
      
      
}

export default HealthRecordEmpty;
