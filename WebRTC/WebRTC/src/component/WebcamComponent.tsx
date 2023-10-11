import { useEffect, useState } from "react";
import "./css/Webcam.css";

interface MediaStreamConstraints {
  video: boolean;
  audio: boolean;
}

const WebcamComponent: React.FC = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const startButton = document.querySelector("#start") as HTMLButtonElement;
    const stopButton = document.querySelector("#stop") as HTMLButtonElement;
    const videoElement = document.getElementById("emitter-video") as HTMLVideoElement;

    startButton.addEventListener("click", async () => {
      const constraints: MediaStreamConstraints = {
        video: true,
        audio: true,
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log("Got MediaStream:", stream);

        videoElement.srcObject = stream;

        videoElement.addEventListener("canplay", () => {
          videoElement.play();
        });
        setMediaStream(stream);
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }


    });

    stopButton.addEventListener("click", () => {
      if (mediaStream) {
        const tracks = mediaStream.getTracks();
        tracks.forEach((track) => track.stop());
        videoElement.srcObject = null;
        setMediaStream(null);
      }
    });
  }, [mediaStream]);

  return (
    <div id="video">
      <div>
        <button id="start">Start</button>
        <button id="stop">Stop</button>
      </div>
      <video id="emitter-video" width="100%" height="400px"></video>
    </div>
  );
};

export default WebcamComponent;
