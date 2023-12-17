import React, { useState } from "react";
import { Doctor as DoctorModel } from "../models/doctor";
import { Button, Icon, IconButton, Paper, Stack, Typography, useTheme } from "@mui/material";
import UpdateDoctorEmail from "./UpdateDoctorEmail";
import UpdateDoctorRate from "./UpdateDoctorRate";
import UpdateDoctorHospital from "./UpdateDoctorHospital";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faCheckSquare, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

import doctorImage from '../images/rota.jpeg'; // Adjust the path
import { padding, style } from "@mui/system";
library.add(faCoffee, faCheckSquare, faEdit);

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
  return (
    <Paper elevation={9} style={paperStyle}>

      <div style={{display: "flex", justifyContent: "center", marginBottom:'50px'}}>
        <Typography variant="h3" style={titleStyle}>
          Welcome, Dr. {name}
        </Typography> 

      </div>
      
      <Stack spacing={4} direction="row" alignItems="center"  >
      <img src={doctorImage} alt="Doctor" style={{ width: '250px', marginLeft: '20px' }} />
        <div>
          
          <Typography variant="body1" style={{ marginBottom: '20px', display: 'inline-flex', alignItems: 'center'}}>
            <span style={{ color: 'black' , marginRight: '5px', marginLeft: '5px'}}>  <FontAwesomeIcon icon={faUserMd}/></span>
            <span style={{ color: 'black' }}> Speciality: {speciality}</span>
          </Typography>
          <div></div>

          <Typography variant="body1" style={{ display: 'inline-flex', alignItems: 'center',  marginBottom: '20px' }}>
          <span style={{ color: 'black' , marginRight: '5px'}}>  
            <Icon> 
              <LocalHospitalRoundedIcon />
            </Icon>
          </span>
        <span style={{ color: 'black' }}>Hospital:</span>
        <span style={{ color: '#2196F3' , marginLeft: '15px'}}> {affiliation}</span>
      </Typography>
        <IconButton color="primary" style={{ marginTop: '-15px' }} onClick={() => setshowUpdateHospitalDialog(true)}>
          <EditRoundedIcon />
        </IconButton>
          {showUpdateHospitalDialog && (
            <UpdateDoctorHospital
              onDismiss={() => setshowUpdateHospitalDialog(false)}
              onSaved={() => {}}
              doctorUsername={doctorUsername}
            />
          )}
          <div></div>
      <Typography variant="body1" style={{ display: 'inline-flex', alignItems: 'center',  marginBottom: '20px' }}>
      <span style={{ color: 'black' , marginRight: '5px'}}>  
            <Icon> 
              <PaymentsRoundedIcon />
            </Icon>
          </span>
        <span style={{ color: 'black' }}>Hourly Rate:</span>
        <span style={{ color: '#2196F3' , marginLeft: '15px'}}> {hourlyRate}</span>
        <span style={{ color: 'black' , marginLeft: '10px'}}>EGP/hr</span>
      </Typography>
        <IconButton color="primary" style={{ marginTop: '-15px' }} onClick={() => setshowUpdateRateDialog(true)}>
          <EditRoundedIcon />
        </IconButton>

          {showUpdateRateDialog && (
            <UpdateDoctorRate
              onDismiss={() => setshowUpdateRateDialog(false)}
              onSaved={() => {}}
              doctorUsername={doctorUsername}
            />
          )}

          <Typography variant="body1" style={{ marginBottom: '20px'}}>
          <span style={{ color: 'black' , marginRight: '5px'}}>  
            <Icon> 
              <SchoolRoundedIcon />
            </Icon>
          </span>
            Educational Background: {educationalBackground}
          </Typography>

          <Typography variant="body1" style={{ marginBottom: '20px'}}>
          <span style={{ color: 'black' , marginRight: '5px'}}>  
            <Icon> 
              <CakeRoundedIcon />
            </Icon>
          </span>
            Date Of Birth: {new Date(dateOfBirth).toLocaleDateString()}{" "}
          </Typography>

          <Typography variant="body1" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ color: 'black' , marginRight: '5px'}}>  
            <Icon> 
              <EmailRoundedIcon />
            </Icon>
          </span>
        <span style={{ color: 'black' }}>Email:</span>
        <span style={{ color: '#2196F3' , marginLeft: '15px'}}> {email}</span>
      </Typography>
        <IconButton color="primary" style={{ marginTop: '-15px' }} onClick={() => setshowUpdateEmailDialog(true)}>
          <EditRoundedIcon />
        </IconButton>
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
