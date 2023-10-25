import { useState } from "react";

import "./App.css";
import Friend from "./components/Friend";
import Room from "./components/Room";

function App() {
  return (
    <>
      <div className="header">
        <h1> ChatTool</h1>
        <div className="toggle-wrapper">
          <div className="toggle-wrapper">
            <div className="toggle transparent">
              <input id="transparent" type="checkbox" />
              <label className="toggle-item" htmlFor="transparent"></label>
            </div>
            <div className="name">Transparent</div>
          </div>
        </div>
        <p>Join a room or text a friend</p>
        <div className="entery">
          <h2>
            Enter your username :
            <input type="text" />
          </h2>
        </div>
      </div>
      <div className="container">
        <Friend />
        <Room />
      </div>
    </>
  );
}

export default App;
