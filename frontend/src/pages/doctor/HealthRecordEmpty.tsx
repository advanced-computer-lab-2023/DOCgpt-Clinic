import { IconButton, Paper, Stack, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLocation, useNavigate } from "react-router-dom";
import DroctorBar from "../../components/Doctor bar/doctorBar";
import Background from '../../Background.jpeg';
import DoctorBar from "../../components/Doctor bar/doctorBar";
function HealthRecordEmpty(){
    //Take the Patient username
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('patient');
    const navigate = useNavigate();

    //THE LOGIC OF CHECKING THAT THIS PATIENT WE JUST CLICKED HIS(HEALTH RECORD)BUTTON DOES NOT ACTUALLY HAVE ONE YET, AND DISPLAYING A MESSAGE THAT THIS PATIENT DOES NOT HAVE A HEALTH RECORD YET AND AN OPTION (+) BUTTON TO ADD 
    const goToAdd = () => {
        //Send the Patient username
        if(username){
            const params = new URLSearchParams();
            params.append('patient', username);
            navigate(`/doctor/healthRecordForm?${params.toString()}`);
        }
    } 

    //return
    //THE VIEW 
    //A SIMPLE MESSEGE IN THE MIDDLE OF THE SCREEN AND A PLUS BUTTON THAT REDIRECT TO THE (HEALTH RECORD FORM) PAGE
    return (
        <div
          style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: 'cover',
            minHeight: '100vh',
            backgroundPosition: 'center',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Increased shadow values
          }}
        >    
          <DoctorBar />
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
        </div>
      );
      
      
      
}

export default HealthRecordEmpty;