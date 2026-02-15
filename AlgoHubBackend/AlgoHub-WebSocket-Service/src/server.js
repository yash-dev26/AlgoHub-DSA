const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const redis = require("ioredis");
const bodyParser = require("body-parser");
const { PORT, FRONTEND_URL } = require("./config/server.config");


const app = express( );
const httpServer = createServer(app);

app.use(bodyParser.json());

const redisClient = new redis();
const io = new Server(httpServer, { 
  cors: {
    origin: FRONTEND_URL, // Adjust this to your frontend URL
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("A client connected: " + socket.id);

  socket.on("setUserId", (userId) => { // from frontend, when we emit "setUserId" with the user ID
    console.log("Setting user ID for socket " + socket.id + ": " + userId);
    redisClient.set(socket.id, userId); // Store the mapping of socket ID to user ID in Redis cache
  });

});

app.post("/senddata",  async(req, res) => {
  console.log("Received data to send: ", req.body);
  const { userId, data } = req.body; 
  if (!userId || !data) {
    return res.status(400).json({ error: "Missing userId or data in request body" });
  }
  try {
    const socketId = await redisClient.get(userId);
    if (socketId) {
      io.to(socketId).emit("newData", data); // Emit the data to the specific socket ID, on the frontend, listen for "newData" to receive this data
      return res.status(200).send("Data sent to user " + userId);
    } else {
      return res.status(404).send("User not connected");
    }
  } catch (error) {
    console.error("Error sending data: ", error);
    return res.status(500).send("Internal Server Error");
  }
});

httpServer.listen(PORT, () => {
  console.log("WebSocket server is running on port 3000");
});