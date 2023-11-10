import { Card, Typography } from "@mui/material";


interface PatientProps {
    patient: any
}

const Patient = ({patient}: PatientProps) => {
    if(!patient){
        return null;
    }
    const {name} = patient;
    const handleClick = () => {
        // Add your click event handling logic here
        alert('Card clicked!');
    };
    return(
        <Card style={{padding: '20px', margin: '10px'}} onClick={handleClick}>
            <Typography> Patient Name: {name}</Typography>
        </Card>
    );
}
export default Patient;
