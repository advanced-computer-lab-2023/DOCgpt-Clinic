import { Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import React, { CSSProperties, useState } from 'react';
import theme from '../theme';
import DrawerAppBar from './patientBar/patientBar';
import El7a2niInfo from "./El7a2ni-info";
import Background from '../FamilyMembers.jpg';
import Back from "./backButton";


interface LinkFamilyMemberProps {
  // Add any additional props as needed
}

const LinkFamilyMember: React.FC<LinkFamilyMemberProps> = () => {
  const [patientUsername, setPatientUsername] = useState('');
  const [familyMemberData, setFamilyMemberData] = useState<string>();
  const [relation, setRelation] = useState('');
  const [isMobileNumber, setFlag] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setFlag(event.target.value);
  }

  const linkFamilyMember = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`/routes/patient/linkFamilyMember`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          familyMemberData,
          relation,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Family member linked successfully:', data);
        setSuccessMessage('Your family member is linked successfully');
        setError(null); // Clear any existing error message
      } else {
        const text = await response.text();
        console.error('Error linking family member:', text);
        setError('An error occurred while linking family member');
        setSuccessMessage(null); // Clear success message if there was an error
      }
    } catch (error) {
      console.error('An unexpected error occurred while linking family member:', error);
      setError('An unexpected error occurred');
      setSuccessMessage(null); // Clear success message if there was an error
    }
  };

  return (  
    <>
    
      <DrawerAppBar />
      <div
      style={{
        position: 'relative',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '50vh',
        marginBottom: '100px',
        backgroundPosition: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Transparent overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
          <strong>LINK A FAMILY MEMBER</strong>
        </h1>
      </div>
    </div>
      <Paper elevation={3} style={{ padding: '20px', width: '600px', height: '500px', margin: 'auto' }}>
        <Typography variant="h5" color="primary">Family Member:</Typography>
        <div style={styles.space}></div>
        <form>
          <FormControl fullWidth margin="normal">
            <InputLabel id="familyMemberType">Select</InputLabel>
            <Select
              value={isMobileNumber}
              label="Type"
              onChange={handleChange}
            >
              <MenuItem value={'Mobile'}> Mobile Number</MenuItem>
              <MenuItem value={'Email'}> Email</MenuItem>
            </Select>
          </FormControl>
          <div style={styles.space}></div>
          <TextField
            id="familyMemberData"
            name="familyMemberData"
            label="Family Member Data"
            type="text"
            value={familyMemberData}
            onChange={(e) => setFamilyMemberData(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <div style={styles.space}></div>
          <TextField
            id="relation"
            label="Relation to Patient"
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <div style={styles.space}></div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={linkFamilyMember}
            sx={{ backgroundColor: theme.palette.blue.main, color: 'white' }}
          >
            Link Family Member
          </Button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </Paper>
      <El7a2niInfo/>

    </>


  );
};

const styles: { [key: string]: CSSProperties } = {
  space: {
    height: 20,
  }
}

export default LinkFamilyMember;