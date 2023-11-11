import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function Room() {
  const [roomName, setRoomName] = useState("");
  const [userName, setUserName] = useState("");
  const [publicRooms, setPublicRooms] = useState([]);

  useEffect(() => {
    socket.on("updateRooms", (rooms) => {
      setPublicRooms(rooms);
    });

    return () => {
      socket.off("updateRooms");
    };
  }, []);

  const createRoom = () => {
    socket.emit("createRoom", roomName);
    setRoomName("");
  };

  const joinRoom = (roomName) => {
    socket.emit("joinRoom", { room: roomName, username: userName });
  };

  return (
    <>
     
      <div className="room">
        <h1> Join Room</h1>
        <p>Join a room</p>
        <div className="entry">
          <h2>Rooms</h2>
          <ul>
            {publicRooms.map((room, index) => (
              <li key={index}>
                <Link to={`/chat/${room}`}>{room}</Link>
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Enter room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button onClick={createRoom}>Create Chat Room</button>
        </div>
      </div>
    </>
  );
}

export default Room;
