import "./App.css";
import { Suspense } from "react";

import { Canvas } from "@react-three/fiber";
import Goingmerry from "../models/Goingmerry";

function App() {
  return (
    <>
        <Canvas style={{ height: "100vh" }} camera={{ position: [10, 10, 10] }}>
          <ambientLight intensity={2}/>
            <Suspense fallback={null}>
              <Goingmerry />
            </Suspense>
        </Canvas>
    </>
  );
}

export default App;
