import React, { useEffect, useRef, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
interface Message {
  sender: string;
  text: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setarrivalMessage] = useState<{
    sender: string;
    text: string;
    createdAt: number;
  } | null>(null);

  const { conversationId } = useParams<{ conversationId: string }>();
  const socket = useRef(io("ws://localhost:3200"));

  console.log(socket);
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

  return (
    <Container>
      <Typography variant="h4">Chat</Typography>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "300px",
          marginBottom: "20px",
        }}
      >
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}: </strong>
            {message.text}
          </div>
        ))}
      </div>
      <TextField
        label="Type your message"
        variant="outlined"
        fullWidth
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "10px" }}
        onClick={handleSendMessage}
      >
        Send Message
      </Button>
    </Container>
  );
};

export default Chat;
