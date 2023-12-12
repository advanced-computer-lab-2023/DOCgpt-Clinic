import React, { useState } from "react";
import { Doctor as DoctorModel } from "../models/doctor";
import { Button, Paper, Stack, Typography, useTheme } from "@mui/material";
import UpdateDoctorEmail from "./UpdateDoctorEmail";
import UpdateDoctorRate from "./UpdateDoctorRate";
import UpdateDoctorHospital from "./UpdateDoctorHospital";

interface DoctorProps {
  doctor: DoctorModel;
  doctorUsername: any;

}

const Doctor = ({ doctor, doctorUsername }: DoctorProps) => {
  const [showUpdateEmailDialog, setshowUpdateEmailDialog] = useState(false);
  const [showUpdateRateDialog, setshowUpdateRateDialog] = useState(false);
  const [showUpdateHospitalDialog, setshowUpdateHospitalDialog] = useState(
    false
  );

  const theme = useTheme();

  if (!doctor) {
    return null;
  }

  const {
    username,
    name,
    speciality,
    affiliation,
    hourlyRate,
    educationalBackground,
    dateOfBirth,
    email,
  } = doctor;

  const paperStyle = {
    padding: '50px',
    width: '95%',
    fontSize: '24px',
    margin: '60px auto', // Add margin to center the Paper vertically and create space
  };

  const titleStyle = {
    fontSize: '32px',            // Increase title font size
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  };

  return (
    <Paper elevation={9} style={paperStyle}>
      <Stack spacing={4}>
        <Typography variant="h3" style={titleStyle}>
          Welcome, Dr. {name}
        </Typography>

        <div>
          <Typography variant="body1">
            Username: {username}
          </Typography>

          <Typography variant="body1">
            Speciality: {speciality}
          </Typography>

          <Typography variant="body1">
            Affiliation: {affiliation}
            <Button onClick={() => setshowUpdateHospitalDialog(true)}>
              Edit
            </Button>
          </Typography>
          {showUpdateHospitalDialog && (
            <UpdateDoctorHospital
              onDismiss={() => setshowUpdateHospitalDialog(false)}
              onSaved={() => {}}
              doctorUsername={doctorUsername}
            />
          )}

          <Typography variant="body1">
            Hourly Rate: {hourlyRate}
            <Button onClick={() => setshowUpdateRateDialog(true)}>Edit</Button>
          </Typography>
          {showUpdateRateDialog && (
            <UpdateDoctorRate
              onDismiss={() => setshowUpdateRateDialog(false)}
              onSaved={() => {}}
              doctorUsername={doctorUsername}
            />
          )}

          <Typography variant="body1">
            Educational Background: {educationalBackground}
          </Typography>

          <Typography variant="body1">
            Date Of Birth: {new Date(dateOfBirth).toLocaleDateString()}{" "}
          </Typography>

          <Typography variant="body1">
            Email: {email}
            <Button onClick={() => setshowUpdateEmailDialog(true)}>Edit</Button>
          </Typography>
          {showUpdateEmailDialog && (
            <UpdateDoctorEmail
              onDismiss={() => setshowUpdateEmailDialog(false)}
              onSaved={() => {}}
              doctorUsername={doctorUsername}
            />
          )}
        </div>
      </Stack>
    </Paper>
  );
};

export default Doctor;
