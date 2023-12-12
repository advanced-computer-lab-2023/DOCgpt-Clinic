import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Avatar,
  Grid, // Import Grid component
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

interface Admin {
  _id: string;
  username: string;
  // Add other fields as needed
}

const AdminList: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/routes/admins/viewAdmin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdmins(response.data.admins);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" align="center" gutterBottom>
        Admins List
      </Typography>
      <Paper elevation={0} style={{ backgroundColor: 'rgba(173, 216, 230, 0.4)', padding: '228 ' }}>
      <List>
          <Grid container spacing={5}>
            {admins.map((admin, index) => (
              <Grid item xs={12} sm={4} key={admin._id}>
                {/* Increase the padding to make the paper larger */}
                <Paper elevation={3} style={{ marginBottom: 16, padding: 48}}>
                  <ListItem alignItems="flex-start">
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                    <ListItemText
                      primary={admin.username}
                      secondary={`ID: ${admin._id}`}
                    />
                  </ListItem>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </List>
      </Paper>
    </Container>
  );
};

export default AdminList;
