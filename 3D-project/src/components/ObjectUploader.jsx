import React, { useState } from 'react';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import PropTypes from 'prop-types';

const ObjectUploader = ({ onFileUpload }) => {
  const [selectedObject, setSelectedObject] = useState(null);

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];

      if (file) {
        const objectUrl = URL.createObjectURL(file);

        const loader = new GLTFLoader();
        loader.load(
          objectUrl,
          (gltf) => {

            const scene = gltf.scene;

            setSelectedObject(scene);

            onFileUpload(scene);
          },
          undefined,
          (error) => {
            console.error('Error loading 3D model:', error);
          }
        );
      }
    } catch (error) {
      console.error('Error loading 3D model:', error);
    }
  };

  return (
    <div className="object-uploader">
      <label htmlFor="file-upload" className="file-upload-label">
        Upload Model (GLB)
      </label>
      <input type="file" id="file-upload" accept=".glb" onChange={handleFileChange} />
   
    </div>
  );
};

ObjectUploader.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};

export default ObjectUploader;
