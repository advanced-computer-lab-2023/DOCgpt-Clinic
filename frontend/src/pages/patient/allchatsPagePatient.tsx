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

interface Conversation {
  _id: string;
  firstusername: string;
  secondusername: string;
  lastMessage?: string;
}

const AllChatsPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [doctorUsernames, setDoctorUsernames] = useState<string[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
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

  const handleChatClick = (conversationId: string) => {
    const clickedConversation = conversations.find(
      (conv) => conv._id === conversationId
    );

    if (clickedConversation) {
      const otherUsername = getOtherUsername(clickedConversation);
      localStorage.setItem("recieverusername", otherUsername);
      navigate(`/chatPatient/${conversationId}`);
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
    console.log("Selected Doctor:", selectedDoctor);
    if (selectedDoctor) {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(
          "/routes/conversation/startConv",
          {
            secondusername: selectedDoctor,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.setItem("recieverusername", selectedDoctor);
        setResponse(response.data);
        console.log(response.data._id);
        navigate(`/chatPatient/${response.data._id}`);
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
      <PatientBar />
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
                    {conversation.firstusername[0].toUpperCase()}
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
          <DialogTitle>Select a Doctor</DialogTitle>
          <DialogContent>
            <List>
              {doctorUsernames.map((doctor, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <ListItemText primary={doctor} />
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

export default AllChatsPage;
