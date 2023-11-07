import "./App.css";
import { useState } from "react"; 
import Friend from "./components/Friend";
import Room from "./components/Room";

function App() {
  const [username, setUsername] = useState("");
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <div className="header">
        <h1> ChatTool</h1>
        <div className="toggle-wrapper">
          <div className="toggle transparent">
            <input id="transparent" type="checkbox" />
            <label className="toggle-item" htmlFor="transparent"></label>
          </div>
          <div className="Darkmode">
            <p>Darkmode</p>
          </div>
        </div>
        <p>Join a room or text a friend</p>
        <div className="entery">
          <h2>
            Enter your username :
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </h2>
        </div>
      </div>
      <div className="container">
        <Friend username={username} />
        <Room username={username} />
      </div>
    </>
  );
}

export default App;
