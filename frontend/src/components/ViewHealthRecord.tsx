import React, { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import axios from 'axios';

interface ViewHealthRecordProps {
    doctorUsername: any;
}

const  ViewHealthRecord: React.FC<ViewHealthRecordProps> = ({doctorUsername}) => {
    const [healthRecords, setHealthRecords] = useState<any[]>([]);

    const fetchHealthRecord = async () => {
        console.log('Fetching patients...');
        try {
        const response = await axios.get(`/routes/doctors/HealthRecords?doctorUsername=${doctorUsername}`);
        console.log('Response:', response);
        setHealthRecords(response.data);
        } catch (error) {
        console.error('Error:', error);
        }
    };

    return (
        <div>
        <Typography variant="h4" gutterBottom>
            View My Patients' Health Records
        </Typography>
        <Button variant="contained" onClick={fetchHealthRecord}>
            View Health Records
        </Button>

        <div>
            {healthRecords.map((healthRecord: any, index: number) => (
            <div key={index}>
                <Box
                    sx={{
                        border: '1px solid #ccc',
                        padding: 2,
                        marginBottom: 2,
                    }}
                >
                {/* <Typography variant="h6"> {JSON.stringify(healthRecord)}</Typography> */}
                <Typography variant="h6"> Username: {JSON.stringify(healthRecord.patientId.username)}</Typography>
                <Typography variant="h6"> MedicalHistory: {JSON.stringify(healthRecord.MedicalHistory)}</Typography>
                <Typography variant="h6"> MedicationList: {JSON.stringify(healthRecord.MedicationList)}</Typography>
                <Typography variant="h6"> VitalSigns: {JSON.stringify(healthRecord.VitalSigns)}</Typography>
                
                
                </Box>
            </div>
            ))}
        </div>
        </div>
    );
};


export default ViewHealthRecord