import styles from "../styles/Doctor.module.css"
import { Doctor as DoctorModel} from "../models/doctor";
import { Button, Card, Stack, Typography  } from '@mui/material';
import UpdateDoctorEmail from "./UpdateDoctorEmail";
import UpdateDoctorRate from "./UpdateDoctorRate";
import UpdateDoctorHospital from "./UpdateDoctorHospital";
import React, { useState } from "react";

interface DoctorProps {
    doctor: DoctorModel, 
    doctorUsername: any
}


const Doctor = ({ doctor, doctorUsername }: DoctorProps) => {
    
    const [showUpdateEmailDialog, setshowUpdateEmailDialog] = useState(false);
    const [showUpdateRateDialog, setshowUpdateRateDialog] = useState(false);
    const [showUpdateHospitalDialog, setshowUpdateHospitalDialog] = useState(false);
    // You can render an empty state, an error message, or return null
    if (!doctor) {
        return null; // Or render an empty state or error message
    }
    const {      
        username,
        name,
        speciality,
        affiliation,
        hourlyRate,
        educationalBackground,
        dateOfBirth,
        email
    } = doctor;


    return(
        <Card className={styles.doctorCard}>
            <Stack spacing={4}>
                <Typography variant="h3"> Welcome, Dr.  {name}</Typography >

                <div className={styles.cardSubtitles}>Username: 
                <span className={styles.cardText}>{username}</span></div>

                <div className={styles.cardSubtitles}>Speciality: 
                <span className={styles.cardText}>{speciality}</span></div>

                <div className={styles.cardSubtitles}>Affiliation: 
                <span className={styles.cardText}>{affiliation}</span>
                <Button onClick={() => setshowUpdateHospitalDialog(true)}>Edit</Button></div>
                {
                    showUpdateHospitalDialog && 
                    <UpdateDoctorHospital 
                        onDismiss={() => setshowUpdateHospitalDialog(false)}
                        onSaved={() => {}}
                        doctorUsername={doctorUsername}
                    />
                }
                <div className={styles.cardSubtitles}>Hourly Rate: 
                <span className={styles.cardText}>{hourlyRate}</span>
                <Button onClick={() => setshowUpdateRateDialog(true)}>Edit</Button></div>
                {
                    showUpdateRateDialog && 
                    <UpdateDoctorRate 
                        onDismiss={() => setshowUpdateRateDialog(false)}
                        onSaved={() => {}}
                        doctorUsername={doctorUsername}
                    />
                }

                <div className={styles.cardSubtitles}>Educational Background: <span className={styles.cardText}>{educationalBackground}</span> </div>

                <div className={styles.cardSubtitles}>Date Of Birth: 
                <span className={styles.cardText}> {dateOfBirth}</span></div>

                <div className={styles.cardSubtitles}>Email: 
                <span className={styles.cardText}>{email}</span>
                <Button onClick={() => setshowUpdateEmailDialog(true)}>Edit</Button></div>
                {
                    showUpdateEmailDialog && 
                    <UpdateDoctorEmail 
                        onDismiss={() => setshowUpdateEmailDialog(false)}
                        onSaved={() => {
                            
                        }}
                        doctorUsername={doctorUsername}
                    />
                }
                
            </Stack>
        </Card>
    )

}

export default Doctor;

