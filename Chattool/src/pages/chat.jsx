import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";

const socket = io("https://serverwebsocket-b1jl.onrender.com");

function Chat({ username }) {
  const { roomName } = useParams();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const joinRoom = (roomName, callback) => {

    socket.emit("joinRoom", { username, room: roomName }, () => {
      if (typeof callback === 'function') {
        callback();
      }
    });
  };
  const handleBeforeUnload = () => {
    socket.emit("userLeft", { username, roomName });
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);


    socket.on("userJoined", (usernames) => {

      setUsers(usernames);
    });

    joinRoom(roomName);

    socket.on("userLeft", ({ remainingUsernames, leftUsername }) => {
      console.log("Remaining usernames:", remainingUsernames);

      setUsers(remainingUsernames);
      console.log(`${leftUsername} left the room`);
    });



    socket.on("loadMessages", (loadedMessages) => {
      setMessages(loadedMessages);
      scrollToBottom();

    });

    socket.on("message", (message) => {
      setMessages((prevMessages) => {
        const updatedMessages = Array.isArray(prevMessages) ? [...prevMessages, message] : [message];
        return updatedMessages;
      });
      scrollToBottom();

    });



    return () => {
      socket.off("loadMessages");
      socket.off("message");
      socket.off("userJoined");
      socket.off("userLeft");
    };
  }, [roomName]);

  const sendMessage = () => {
    joinRoom(roomName, () => {
      if (newMessage.trim() === "") return;
      socket.emit("message", { username, roomName, text: newMessage });
      setNewMessage("");
    });
  };

  const leaveRoom = () => {
    navigate('/');
    socket.emit("userLeft", { username, roomName });
    socket.on("userJoined", (usernames) => {
      setUsers(usernames);
    });
  };


  return (
    <>
      <div className="chat">
        <div className="chat-header">
          <h1>Chat Room: {roomName}</h1>
          <button className="close-button" onClick={() => leaveRoom()}>&times;</button>
        </div>
        <div className="chat-users">
          <h2>Users in the chat:</h2>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
        <div className="chat-messages">
          {messages && messages.map((message, index) => (
            <div key={index}>
              <strong>{message.username}:</strong> {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button onClick={() => sendMessage()}>Send</button>
        </div>
      </div>
    </>
  );
}

export default Chat;
