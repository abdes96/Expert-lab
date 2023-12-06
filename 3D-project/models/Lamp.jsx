import { useMemo, useRef } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three';

export function Lamp(props) {
  const { nodes, materials } = useGLTF('/lamp.glb');
  const { lampOn } = props;

  const originalBulbMaterial = useMemo(() => materials.Bulb_Material.clone(), [materials.Bulb_Material]);

  const bulbMaterial = lampOn ? originalBulbMaterial : new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x000000, emissiveIntensity: 0 });
  const lampRef = useRef();


  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={1}>
        <mesh geometry={nodes.Object_2.geometry} material={bulbMaterial} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.Cable_Material} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.Lamp_Material} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.Plug_Material} />
      </group>
      <Html position={[0, 2, 0]} scaleFactor={10}>
        <div style={{ color: 'white', textAlign: 'center', width: '300px', fontWeight: 'bold' }}>
          Click on the plug to give light
        </div>
      </Html>
    </group>
  );
}

useGLTF.preload('/lamp.glb');
export default Lamp;
