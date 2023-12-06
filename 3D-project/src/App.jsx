import "./App.css";
import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Goingmerry from "../models/Goingmerry";
import { useState } from "react";
import Navigation from "./components/navigation";

function App() {
  const [selectedModel, setSelectedModel] = useState("goingmerry");

  const handleModelSelect = (modelName) => {
    setSelectedModel(modelName);
  };

  return (
    <>
      <Navigation onSelectModel={handleModelSelect} />
      <Canvas style={{ height: "100vh" }} >
        <ambientLight intensity={2} />

        {selectedModel === "goingmerry" && <Goingmerry />}
        {selectedModel === "model2" && <Model2 />}
        {selectedModel === "model3" && <Model3 />}
        {selectedModel === "model4" && <Model4 />}

        <OrbitControls />
        <Stars />

      </Canvas>
    </>
  );
}

export default App;
