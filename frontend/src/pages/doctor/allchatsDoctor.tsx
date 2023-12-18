import React, { useEffect, useState } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Snackbar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
  Zoom,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import ChatIcon from "@mui/icons-material/Chat";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PatientBar from "../../components/patientBar/patientBar";
import DoctorBar from "../../components/Doctor bar/doctorBar";

interface Conversation {
  _id: string;
  firstusername: string;
  secondusername: string;
  lastMessage?: string;
}

const AllChatsDoctor: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [patientUsernames, setpatientUsernames] = useState<string[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);
  const authenticatedUsername = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    fetchConversations();
    fetchDoctors();
  }, []);

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("/routes/conversation/getConv", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const conversationsWithLastMessages = await Promise.all(
        response.data.map(async (conversation: Conversation) => {
          try {
            const lastMessageResponse = await axios.get(
              `/routes/messages/getLastMessage?conversationId=${conversation._id}`
            );

            const lastMessage = lastMessageResponse.data?.text || "";
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
            return {
              ...conversation,
              lastMessage,
            };
          } catch (error) {
            console.error("Error fetching last message:", error);
            return {
              ...conversation,
              lastMessage: "",
            };
          }
        })
      );

      setConversations(conversationsWithLastMessages);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        "/routes/doctors/viewMyPatientsUsername",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setpatientUsernames(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleChatClick = (conversationId: string) => {
    const clickedConversation = conversations.find(
      (conv) => conv._id === conversationId
    );

    if (clickedConversation) {
      const otherUsername = getOtherUsername(clickedConversation);
      localStorage.setItem("recieverusername", otherUsername);
      navigate(`/chatDoctor/${conversationId}`);
    } else {
      console.error(`Conversation with ID ${conversationId} not found.`);
    }
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
    setSelectedConversation(null);
  };

  const handleSnackbarConfirm = () => {
    setIsSnackbarOpen(false);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDoctorSelection = async () => {
    console.log("Selected Doctor:", selectedPatient);
    if (selectedPatient) {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(
          "/routes/conversation/startConv",
          {
            secondusername: selectedPatient,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.setItem("recieverusername", selectedPatient);
        setResponse(response.data);
        console.log(response.data._id);
        navigate(`/chatDoctor/${response.data._id}`);
      } catch (error) {
        console.error("Error creating conversation:", error);
      }
    }
  };

  const getOtherUsername = (conversation: Conversation) => {
    return authenticatedUsername === conversation.firstusername
      ? conversation.secondusername
      : conversation.firstusername;
  };

  const styles = {
    listItem: {
      borderBottom: "1px solid #ccc",
      cursor: "pointer",
    },
    avatar: {
      backgroundColor: "#2196f3",
    },
    chatIcon: {
      color: "#4caf50",
    },
  };

  return (
    <>
      <DoctorBar />
      <Container style={{ padding: "16px" }}>
        <Typography
          variant="h4"
          style={{ marginBottom: "16px", color: "#2196f3" }}
        >
          All Chats
        </Typography>
        <List>
          {conversations.map((conversation) => (
            <Zoom in={true} key={conversation._id}>
              <ListItem
                style={styles.listItem}
                onClick={() => handleChatClick(conversation._id)}
              >
                <ListItemAvatar>
                  <Avatar style={styles.avatar}>
                    {getOtherUsername(conversation)[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={getOtherUsername(conversation)}
                  secondary={`${conversation.lastMessage}`}
                />
              </ListItem>
            </Zoom>
          ))}
        </List>

        {/* Snackbar */}

        {/* Dialog */}
        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Select a Patient</DialogTitle>
          <DialogContent>
            <List>
              {patientUsernames.map((patient, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => setSelectedPatient(patient)}
                >
                  <ListItemText primary={patient} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleDoctorSelection}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default AllChatsDoctor;
