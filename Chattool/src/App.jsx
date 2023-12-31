import "./App.css";
import { useState, useEffect } from "react";
import Room from "./components/Room";
import RoutesConfig from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("");
  const [usernameCreated, setUsernameCreated] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      setUsernameCreated(true);
      
    }
  }, []);

  const handleCreateUsername = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      // Save username in local storage
      localStorage.setItem("username", username);

      setUsernameCreated(true);
    } else {
      alert("Please enter a valid username");
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <Router>
      {usernameCreated && <RoutesConfig username={username} />}
      <div className="header">
        <h1>ChatTool</h1>

        <p>Join rooms!</p>
        <div className="entry">
          <form onSubmit={handleCreateUsername}>
            <h2>
              Enter your username :
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
              <button type="submit">Create Username</button>
            </h2>
          </form>
        </div>
      </div>

      <div className="container">
        {usernameCreated && <Room username={username} />}
      </div>
    </Router>
  );
}

export default App;
