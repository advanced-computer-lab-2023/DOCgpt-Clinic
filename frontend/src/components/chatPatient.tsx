import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { formatDistanceToNow } from "date-fns";
import { enGB } from "date-fns/locale";

interface Message {
  createdAt: number;
  sender: string;
  text: string;
}

const ChatPatient = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setarrivalMessage] = useState<{
    sender: string;
    text: string;
    createdAt: number;
  } | null>(null);
  const [openDialog, setOpenDialog] = useState(true); // Open the dialog by default

  const { conversationId } = useParams<{ conversationId: string }>();
  const socket = useRef(io("ws://localhost:3202"));
  const chatContainer = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const recieverusername = localStorage.getItem("recieverusername");

  useEffect(() => {
    socket.current.emit("addUser", username);
  });

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setarrivalMessage({
        sender: data.senderusername,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    return () => {
      // Cleanup: remove the event listener
      socket.current.off("getMessage");
    };
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    // Scroll to the latest message
    chatContainer.current?.scrollTo(0, chatContainer.current.scrollHeight);
  }, [arrivalMessage]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `/routes/messages/getMessages/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  const formatTimeDistance = (timestamp: number) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  const handleSendMessage = async () => {
    socket.current.emit("sendMessage", {
      senderusername: username,
      recieverusername: recieverusername,
      text: newMessage,
    });

    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "/routes/messages/addMessage",
        { text: newMessage, conversationId: conversationId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewMessage(""); // Clear the input field after sending
      fetchMessages(); // Fetch updated messages
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/all-chats-patient"); // Replace "/your-specific-page" with your actual page path
  };
  return (
    <Container>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xl"
        style={{
          width: 1000,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "140px",
        }}
      >
        <DialogTitle>{recieverusername}</DialogTitle>
        <DialogContent>
          <Paper
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              minHeight: "300px",
              minWidth: "500px",
              marginBottom: "20px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
            ref={chatContainer}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection:
                    message.sender === username ? "row-reverse" : "row",
                  marginBottom: "10px",
                  alignItems: "center",
                }}
              >
                <Avatar style={{ marginRight: "10px" }}>
                  {message.sender[0].toUpperCase()}
                </Avatar>
                <div
                  style={{
                    backgroundColor:
                      message.sender === username ? "#2196f3" : "#e0e0e0",
                    padding: "5px",
                    borderRadius: "10px",
                    maxWidth: "50%",
                    position: "relative", // Adjusted positioning
                  }}
                >
                  {message.text}
                </div>
                <div style={{ fontSize: "12px", color: "#999" }}>
                  {formatTimeDistance(message.createdAt)}
                </div>
              </div>
            ))}
          </Paper>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Type your message"
              variant="outlined"
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              style={{ marginLeft: "10px" }}
            >
              <SendIcon />
            </IconButton>
          </div>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
export default ChatPatient;
