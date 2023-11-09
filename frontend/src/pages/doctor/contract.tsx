// Contract.tsx

import React, { useState, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';

const Contract: React.FC = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const salary = 10000; // Salary in dollars
  const duration = '4 years'; // Contract duration

  const handleAccept = () => {
    // Logic to mark the contract as accepted and navigate to the login page
    setAccepted(true);
    navigate('/'); // Redirect to the login page
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={styles.container}>
      <Paper elevation={20} style={styles.paper}>
        <div style={styles.avatarContainer}>
          <Avatar style={styles.avatar}>
            <DescriptionIcon />
          </Avatar>
        </div>
        <Typography variant="h5" style={styles.header}>
          Doctor Contract
        </Typography>
        <div style={styles.space}></div> {/* Space between "Doctor Contract" and salary */}
        <Typography variant="body1" style={styles.contractText}>
          Salary: ${salary}
        </Typography>
        <Typography variant="body1" style={styles.contractText}>
          Duration: {duration}
        </Typography>
        <Typography variant="body1" style={styles.contractText}>
          {/* Add additional terms and conditions here */}
        
1. Duties and Responsibilities

(a) The Doctor shall practice MEDICAL SPECIALTY solely on behalf of the MEDICAL GROUP, and shall devote his/her entire professional time to the affairs of the MEDICAL GROUP. In addition, the Doctor shall devote his/her best efforts in the performance of his/her duties and shall perform such other reasonable duties, such as serving on MEDICAL GROUP committees, as may be requested of him/her from time to time by the MEDICAL GROUP. During the term hereof, the Doctor shall not, without the written consent of the MEDICAL GROUP, render professional services to or for any other person, firm, corporation or other organization for compensation, or engage in any activity that competes with the interest of the MEDICAL GROUP, excluding non-patient related contact outside of regular MEDICAL GROUP hours, whether the Doctor is acting on behalf of or as an officer, member, director, employee, shareholder, partner or fiduciary of another person or organization.
(b) MEDICAL GROUP shall establish the fees for Doctor's services. MEDICAL GROUP shall bill and collect or arrange for the billing and collection for all services provided by Doctor under this Agreement on a monthly or more frequent basis, as MEDICAL GROUP shall deem appropriate, and MEDICAL GROUP shall retain all revenues received from such billing. Doctor shall promptly execute such forms, including assignments, as may be required to facilitate billing and collection by MEDICAL GROUP. Doctor shall not directly or indirectly bill any party for any services provided pursuant to this Agreement. Doctor shall promptly remit to MEDICAL GROUP any amounts received for services provided by Doctor pursuant to this Agreement. It is understood that this provision shall not apply to any money or property received by the Doctor as a gift or legacy (as defined by the elha2ny group).
        </Typography>
        {!accepted && (
          <Button variant="contained" color="primary" onClick={handleAccept}>
            Accept Terms and Conditions
          </Button>
        )}
      </Paper>
    </Grid>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: '100vh',
  },
  paper: {
    padding: '30px 20px',
    width: 500,
    margin: "20px auto",
    textAlign: 'center', // Center the text
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    backgroundColor: "blue",
  },
  header: {
    margin: 0,
  },
  contractText: {
    marginBottom: 20,
  },
  space: {
    height: 20,
  },
};

export default Contract;