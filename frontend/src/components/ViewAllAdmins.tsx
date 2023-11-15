import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  ListItemIcon,
  Avatar,
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
      <Typography variant="h4" align="center" gutterBottom>
        Admins List
      </Typography>
      <List>
        {admins.map((admin) => (
          <React.Fragment key={admin._id}>
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={admin.username}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                    >
                      ID: {admin._id}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default AdminList;