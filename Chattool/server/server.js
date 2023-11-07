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
	
  socket.on("joinRoom", ({ username, room }) => {

	socket.join(room);
    users[socket.id] = { username, room };

    socket.to(room).emit("userJoined", username);
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
