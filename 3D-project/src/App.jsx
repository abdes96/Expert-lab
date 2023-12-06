import React, { useState } from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Goingmerry from "../models/Goingmerry";
import Meramera from "../models/Meramera";
import Lamp from "../models/Lamp";
import Navigation from "./components/Navigation";
import './App.css'

function App() {
  const [selectedModel, setSelectedModel] = useState("goingmerry");
  const [lampOn, setLampOn] = useState(true);

  const handleModelSelect = (modelName) => {
    setSelectedModel(modelName);
  };

  const handleToggleLamp = () => {
    setLampOn(!lampOn);
  };

  return (
    <>
      <Navigation onSelectModel={handleModelSelect} />
      <Canvas style={{ height: "100vh" }}>
        <ambientLight intensity={2} />

        {selectedModel === "goingmerry" && <Goingmerry />}
        {selectedModel === "meramera" && <Meramera />}
        {selectedModel === "lamp" && <Lamp lampOn={lampOn} onClick={handleToggleLamp} />}
        {selectedModel === "model4" && <Model4 />}

        <OrbitControls />
        <Stars />
      </Canvas>
    </>
  );
}

export default App;
