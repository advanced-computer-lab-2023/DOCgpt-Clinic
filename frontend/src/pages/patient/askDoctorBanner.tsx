import React, { useEffect, useState } from "react";
import { Typography, Button, Paper, Grid } from "@mui/material";
import AskDoctorImage from "../../li.jpeg"; // Replace with the path to your doctor image
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
const AskDoctorBanner = () => {
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [doctorUsernames, setDoctorUsernames] = useState<string[]>([]);
  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("/routes/patient/getpatientdocnames", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDoctorUsernames(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  const handleAskNowClick = async () => {
    if (doctorUsernames.length === 0) {
      await fetchDoctors();
    }
    setIsDialogOpen(true);
  };
  const handledoctorSelect = async (username: string) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "/routes/conversation/startConv",
        {
          secondusername: username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("recieverusername", username);

      console.log(response.data._id);
      navigate(`/chatPatient/${response.data._id}`);
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };
  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <>
      <Paper
        sx={{
          p: 2,
          border: "1px solid #ccc",
          borderRadius: "4px",
          margin: "50px auto",
          maxWidth: "100%",
          boxShadow: 3, // Apply box-shadow for elevation
        }}
        elevation={3} // Adjust the elevation as needed
      >
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Grid item xs={12} md={2}>
            <img
              src={AskDoctorImage}
              alt="Pharmacist"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "150px",
                borderRadius: "50%",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" color="primary" gutterBottom>
              Do you want to communicate with one of your doctors?
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              They are waiting for you
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, mr: 20 }}
              onClick={handleAskNowClick} // Add a right margin to move the button to the left
            >
              Chat now
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="md" // Adjust the maximum width. Options: 'xs', 'sm', 'md', 'lg', 'xl'
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "500px", // Custom minimum width
            padding: "20px", // Add padding for inner content
          },
        }}
      >
        <DialogTitle>Select a Doctor</DialogTitle>
        <DialogContent>
          <List>
            {doctorUsernames.map((username, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handledoctorSelect(username)}
              >
                <ListItemText primary={username} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AskDoctorBanner;
