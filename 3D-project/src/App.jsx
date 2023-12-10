import  { useState } from 'react';
import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Goingmerry from '../models/Goingmerry';
import Meramera from '../models/Meramera';
import Lamp from '../models/Lamp';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  const [selectedModel, setSelectedModel] = useState('goingmerry');
  const [lampOn, setLampOn] = useState(true);
  const [selectedObject, setSelectedObject] = useState(null);

  const handleModelSelect = (modelName) => {
    setSelectedModel(modelName);
  };

  const handleToggleLamp = () => {
    setLampOn(!lampOn);
  };

  const handleObjectLoad = (object) => {
    nesetSelectedObject(object);
    setSelectedModel('customModel'); 
  };
    console.log(selectedModel);

  return (
    <>
      <Navigation onSelectModel={handleModelSelect} onFileUpload={handleObjectLoad} />
      <Canvas style={{ height: '100vh' }}>
        <ambientLight intensity={2} />

        {selectedModel === 'goingmerry' && <Goingmerry />}
        {selectedModel === 'meramera' && <Meramera />}
        {selectedModel === 'lamp' && <Lamp lampOn={lampOn} onClick={handleToggleLamp} />}
        {selectedModel === 'customModel' && selectedObject && <primitive object={selectedObject} />}

        <OrbitControls />
        <Stars />
      </Canvas>
    </>
  );
}

export default App;
