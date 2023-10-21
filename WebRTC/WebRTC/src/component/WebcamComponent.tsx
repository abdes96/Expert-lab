import { useEffect, useState, useRef } from "react";
import "./css/Webcam.css";
import io from "socket.io-client";
import Peer from "simple-peer";

interface MediaStreamConstraints {
  video: boolean;
  audio: boolean;
}

const socket = io("http://localhost:5000");

const WebcamComponent: React.FC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [calling, setCalling] = useState(false);

  const [me, setMe] = useState("");
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState<Peer.SignalData | undefined>();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);

  useEffect(() => {
    const startButton = document.querySelector("#start") as HTMLButtonElement;
    const stopButton = document.querySelector("#stop") as HTMLButtonElement;
    const videoElement = document.getElementById(
      "emitter-video"
    ) as HTMLVideoElement;

    startButton.addEventListener("click", async () => {
      const constraints: MediaStreamConstraints = {
        video: true,
        audio: true,
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        videoElement.srcObject = stream;
        videoElement.play();
        setLocalStream(stream);

        socket.on("me", (id) => {
          setMe(id);
        });

        socket.on("callUser", (data) => {
          setReceivingCall(true);
          setCaller(data.from);
          setName(data.name);
          setCallerSignal(data.signal);
        });
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    });

    stopButton.addEventListener("click", () => {
      if (localStream) {
        const tracks = localStream.getTracks();
        tracks.forEach((track) => track.stop());
        videoElement.srcObject = null;
        setLocalStream(null);

        socket.emit("callEnded");
      }
    });
  }, [localStream]);

  const callUser = () => {
    if (localStream) {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: localStream,
      });

      peer.on("signal", (data) => {
        socket.emit("callUser", {
          userToCall: idToCall,
          signalData: data,
          from: me,
          name: name,
        });
      });

      peer.on("stream", (userStream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = userStream;
        }
      });

      socket.on("callAccepted", (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      });

      connectionRef.current = peer;
      setCalling(true);
    } else {
      console.error("localStream is null, unable to make the call.");
    }
  };

  const answerCall = () => {
    if (localStream) {
      setCallAccepted(true);
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: localStream,
      });
      peer.on("signal", (data) => {
        socket.emit("answerCall", { signal: data, to: caller });
      });
      peer.on("stream", (stream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });

      peer.signal(callerSignal);
      connectionRef.current = peer;
    } else {
      console.error("localStream is null, unable to answer the call.");
    }
  };

  const leaveCall = () => {
    setCallEnded(true);
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
  };

  return (
    <div id="video">
      <div>
        <button id="start">Start</button>
        <button id="stop">Stop</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter ID to Call"
          onChange={(e) => setIdToCall(e.target.value)}
        />
        <button id="call" onClick={callUser} disabled={calling}>
          Call
        </button>
      </div>
      <video
        id="emitter-video"
        width="100%"
        height="400px"
        ref={myVideo}
        autoPlay
        playsInline
      />
      {receivingCall && !callAccepted && (
        <div>
          <h1>{name} is calling you</h1>
          <button onClick={answerCall}>Answer</button>
        </div>
      )}
    </div>
  );
};

export default WebcamComponent;
