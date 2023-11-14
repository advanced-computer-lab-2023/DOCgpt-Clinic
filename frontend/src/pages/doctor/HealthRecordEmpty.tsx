import { IconButton, Stack, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLocation, useNavigate } from "react-router-dom";

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
    return(
        <Stack style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div>
                <Typography variant="h4">
                    This Patient Does not have any Health Record yet!
                </Typography>
            </div>
            <div>
                <IconButton onClick={goToAdd}>
                    <AddCircleIcon sx={{ color: 'green', fontSize: 30 }} />
                </IconButton>
            </div>
            <div>
                <Typography>
                    Add A Health Record
                </Typography>
            </div>
        </Stack>

    );
}

export default HealthRecordEmpty;