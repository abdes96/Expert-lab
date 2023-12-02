const { log } = require("console");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "https://serverwebsocket-b1jl.onrender.com",
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
    socket.join(room);

    if (username) {
      users[socket.id] = { username, room };

      const usernames = Object.values(users).filter(u => u.room === room).map(u => u.username);
      io.to(room).emit("userJoined", usernames);

      const messages = rooms[room] ? rooms[room].messages : [];
      socket.emit("loadMessages", messages);

      if (typeof callback === 'function') {
        callback();
      } else {
        console.error('Callback is not a function');
      }
    } else {
      console.error('Username is missing when joining room.');
    }
  });

  socket.on("getRooms", () => {
    socket.emit("updateRooms", Object.keys(rooms));
  });

  socket.on("message", (message) => {
    const { username, roomName, text } = message;

    if (!rooms[roomName] || !rooms[roomName].messages) {
      rooms[roomName] = { participants: [], messages: [] };
    }
    rooms[roomName].messages.push({ username, text });

    io.to(roomName).emit("message", { username, text });
  });

  socket.on("userLeft", ({ username, roomName }) => {
    const user = users[socket.id];
    if (user) {
      const { room } = user;
      const remainingUsernames = Object.values(users)
        .filter(u => u.room === room)
        .map(u => u.username)
        .filter(u => u !== username);

      io.to(room).emit("userLeft", { remainingUsernames, leftUsername: username });

      socket.leave(room);
      delete users[socket.id];
      console.log(`${username} left the room ${room}`);
      console.log("Remaining usernames:", remainingUsernames);
    }
  });


});

server.listen(5000, () => console.log("Server is running on port 5000"));
