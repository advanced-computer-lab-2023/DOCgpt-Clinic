import styles from "../styles/Doctor.module.css"
import { Doctor as DoctorModel} from "../models/doctor";
import { Button, Card, Stack, Typography  } from '@mui/material';
import UpdateDoctorEmail from "./UpdateDoctorEmail";
import UpdateDoctorRate from "./UpdateDoctorRate";
import UpdateDoctorHospital from "./UpdateDoctorHospital";
import React, { useState } from "react";

interface DoctorProps {
    doctor: DoctorModel, 
    doctorId: string
}


const Doctor = ({ doctor, doctorId }: DoctorProps) => {
    const {
        name,
        username,
        speciality,
        affiliation,
        hourlyRate,
        educationalBackground,
        dateOfBirth,
        email
    } = doctor;

    const [showUpdateEmailDialog, setshowUpdateEmailDialog] = useState(false);
    const [showUpdateRateDialog, setshowUpdateRateDialog] = useState(false);
    const [showUpdateHospitalDialog, setshowUpdateHospitalDialog] = useState(false);

    return(
        <Card className={styles.doctorCard}>
            <Stack spacing={4}>
                <Typography variant="h3"> Welcome,  {name}</Typography >

                <div className={styles.cardSubtitles}>username: 
                <span className={styles.cardText}>{username}</span></div>

                <div className={styles.cardSubtitles}>speciality: 
                <span className={styles.cardText}>{speciality}</span></div>

                <div className={styles.cardSubtitles}>affiliation: 
                <span className={styles.cardText}>{affiliation}</span>
                <Button onClick={() => setshowUpdateHospitalDialog(true)}>Edit</Button></div>
                {
                    showUpdateHospitalDialog && 
                    <UpdateDoctorHospital 
                        onDismiss={() => setshowUpdateHospitalDialog(false)}
                        onSaved={() => {}}
                        doctorId={doctorId}
                    />
                }
                <div className={styles.cardSubtitles}>hourlyRate: 
                <span className={styles.cardText}>{hourlyRate}</span>
                <Button onClick={() => setshowUpdateRateDialog(true)}>Edit</Button></div>
                {
                    showUpdateRateDialog && 
                    <UpdateDoctorRate 
                        onDismiss={() => setshowUpdateRateDialog(false)}
                        onSaved={() => {}}
                        doctorId={doctorId}
                    />
                }

                <div className={styles.cardSubtitles}>educationalBackground: <span className={styles.cardText}>{educationalBackground}</span> </div>

                <div className={styles.cardSubtitles}>dateOfBirth: 
                <span className={styles.cardText}> {dateOfBirth}</span></div>

                <div className={styles.cardSubtitles}>email: 
                <span className={styles.cardText}>{email}</span>
                <Button onClick={() => setshowUpdateEmailDialog(true)}>Edit</Button></div>
                {
                    showUpdateEmailDialog && 
                    <UpdateDoctorEmail 
                        onDismiss={() => setshowUpdateEmailDialog(false)}
                        onSaved={() => {
                            
                        }}
                        doctorId={doctorId}
                    />
                }
                
            </Stack>
        </Card>
    )

}

export default Doctor;

