const io = require("socket.io")(3200, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let users = [];
  
  const addUser = (username, socketId) => {
    !users.some((user) => user.username === username) &&
      users.push({ username, socketId });
  }; 
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (username) => {
    return users.find((user) => user.username === username);
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
  
    //take userId and socketId from user
    socket.on("addUser", (username) => {
      addUser(username, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderusername, recieverusername, text }) => {
      const user = getUser(recieverusername);
    
      // Check if user is defined before emitting the message
      if (user && user.socketId) {
        io.to(user.socketId).emit("getMessage", {
          senderusername,
          text,
        });
      } else {
        // Handle the case where the user is not found or has no socketId
        console.error(`User ${recieverusername} not found or has no socketId`);
      }
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });