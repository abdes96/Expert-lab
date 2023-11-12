import  { useState, useEffect } from "react";
import io from "socket.io-client";
import { useParams, useNavigate } from 'react-router-dom';

const socket = io("http://localhost:5000");

function Chat({ username }) {
  const { roomName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Add event listeners to receive and send messages
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    socket.emit("message", { username, roomName, text: newMessage });
    setNewMessage("");
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom", { username, roomName });
    navigate('/');
  };

  return (
    <>
      <div className="chat">
        <div className="chat-header">
          <h1>Chat Room: {roomName}</h1>
          <button className="close-button" onClick={leaveRoom}>&times;</button>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index}>
              <strong>{message.username}:</strong> {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
}

export default Chat;
