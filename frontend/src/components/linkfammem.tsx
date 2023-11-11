import { FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import theme from '../theme';

interface LinkFamilyMemberProps {
  // Add any additional props as needed
}

const LinkFamilyMember: React.FC<LinkFamilyMemberProps> = () => {
  const [patientUsername, setPatientUsername] = useState('');
  const [familyMemberData, setFamilyMemberData] = useState<string>();
  const [relation, setRelation] = useState('');
  const [isMobileNumber, setFlag] = useState('');

  const [error, setError] = useState<string | null>(null);

  const handleChange = ( event: SelectChangeEvent) =>{
    setFlag(event.target.value);
  }
  const linkFamilyMember = async () => {
    try {
      // Check if familyMemberData is a valid mobile number
    //   const isMobileNumber = /^\d{10}$/.test(familyMemberData);
       const token=localStorage.getItem("authToken");
      const response = await fetch(`/routes/patient/linkFamilyMember?patientUsername=${patientUsername}`, {
        method: 'PATCH', // Change the method to PATCH
        headers: {
          'Content-Type': 'application/json',
          Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({
          familyMemberData,
          relation,
         // isMobileNumber, // Include a flag to indicate if familyMemberData is a mobile number
        }),
      });

      // Check if the response status is OK (200)
      if (response.ok) {
        const data = await response.json();
        console.log('Family member linked successfully:', data);
        // Handle success, e.g., display a success message to the user
      } else {
        const text = await response.text(); // Read response as text
        console.error('Error linking family member:', text);
        setError('An error occurred while linking family member');
        // Handle error, e.g., display an error message to the user
      }
    } catch (error) {
      console.error('An unexpected error occurred while linking family member:', error);
      setError('An unexpected error occurred');
      // Handle unexpected errors
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', width: '400px', margin: 'auto' }}>
       <Typography variant="h5">Link Family Member</Typography>
      <form>
      <TextField
          id="patientUsername"
          label="Patient Username"
          value={patientUsername}
          onChange={(e) => setPatientUsername(e.target.value)}
          required
          fullWidth
          margin="normal"
        />

<FormControl fullWidth margin="normal">
<InputLabel id="familyMemberType">select</InputLabel>
            <Select
            value={isMobileNumber}
            label= "Type"
            onChange={handleChange}
            >
            <MenuItem value={'Mobile'}> Mobile Number</MenuItem>
            <MenuItem value={'Email'}> Email</MenuItem>
            </Select>
        </FormControl> 

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
<TextField
          id="relation"
          label="Relation to Patient"
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
       <button
  type="button"
  onClick={linkFamilyMember}
  style={{ backgroundColor: theme.palette.blue.main, color: 'white' }}
>
  Link Family Member
</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      </Paper>
  );
};

export default LinkFamilyMember;







      