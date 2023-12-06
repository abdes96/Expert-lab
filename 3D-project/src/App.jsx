import "./App.css";
import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Goingmerry from "../models/Goingmerry";
import { Float } from "@react-three/drei";

function App() {
  return (
    <>
      <Canvas style={{ height: "100vh" }} >
        <ambientLight intensity={2} />
       
          <Goingmerry />
        <OrbitControls />
        <Stars />
       
      </Canvas>
    </>
  );
}

export default App;
