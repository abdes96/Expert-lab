const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const rooms = {};
const users = {};

io.on("connection", (socket) => {

  socket.on("createRoom", (roomName) => {
    rooms[roomName] = { participants: [] };
    io.emit("updateRooms", Object.keys(rooms));
  });

  socket.on("joinRoom", ({ username, room }, callback) => {
    //console.log(`${username} is joining room ${room}`);

    socket.join(room);
    users[socket.id] = { username, room };

    //console.log("Users after joining room:", users);

    socket.to(room).emit("userJoined", username);

    if (typeof callback === 'function') {
      callback();
    } else {
      console.error('Callback is not a function');
    }
  });

  socket.on("getRooms", () => {
    socket.emit("updateRooms", Object.keys(rooms));
  });

  socket.on("message", (message) => {
    const user = users[socket.id];

  
    if (user) {
      const { username, room } = user;
      //console.log(`Received message from ${username} in room ${room}: ${message.text}`);
      io.to(room).emit("message", { username, text: message.text });
    }
  });

  socket.on("disconnect", () => {

    const user = users[socket.id];
    if (user) {
      const { username, room } = user;
      socket.to(room).emit("userLeft", username);


      socket.leave(room);
      delete users[socket.id];
    }
  });
});

server.listen(5000, () => console.log("server is running on port 5000"));
