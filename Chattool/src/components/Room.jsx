import  { useState, useEffect } from "react";
import io from "socket.io-client";
import { Link, useNavigate } from "react-router-dom";

const socket = io("https://serverwebsocket-b1jl.onrender.com");

function Room({ username }) {
  const [roomName, setRoomName] = useState("");
  const [publicRooms, setPublicRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("getRooms");

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

  const joinRoom = (roomName, callback) => {

    socket.emit("joinRoom", { room: roomName }, () => {


      if (typeof callback === "function") {
        callback();
      }
      navigate(`/chat/${roomName}`);
    });
  };



  return (
    <>
      <div className="room">
        <h1> Join Room</h1>
        <p>Join a room</p>
        <div className="entry">
          <h2>Rooms</h2>
          <ul>
            {publicRooms.length > 0 ? (
              publicRooms.map((room, index) => (
                <li key={index}>
                  <Link to={`/chat/${room}`} onClick={() => joinRoom(room)}>
                    {room}
                  </Link>
                </li>
              ))
            ) : (
              <li>No available rooms</li>
            )}
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
