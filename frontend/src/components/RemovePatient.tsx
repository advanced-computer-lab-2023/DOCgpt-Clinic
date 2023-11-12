import React, { useState } from 'react';
import axios from 'axios';
import Drawerrbar from '../components/admin Bar/adminBar';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Button,
  TextField,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const RemovePatient: React.FC = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send a DELETE request to delete the doctor by username
      const response = await axios.delete('/routes/admins/deletepatient', {
        data: { username }, // Send the username in the request body
      });

      // Handle success
      if (response.status === 200) {
        setMessage('Patient deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting Patient:', error);
      setMessage('Error deleting Patient');
    }
  };

  return (
    <>
    <Drawerrbar/>
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Remove Patient
      </Typography>
      <form onSubmit={handleSubmit}>
        <List>
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <>
                  <Typography variant="h6" gutterBottom>
                    Patient Username
                  </Typography>
                </>
              }
              secondary={
                <>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    label="Enter Patient Username"
                  />
                </>
              }
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" color="primary" type="submit">
              Remove Patient
            </Button>
          </ListItem>
          <ListItem>{message && <Typography>{message}</Typography>}</ListItem>
        </List>
      </form>
    </Container>
    </>
  );
};

export default RemovePatient;
