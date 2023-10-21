import { useEffect, useState, useRef } from "react";
import "./css/Webcam.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
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
  const [callerSignal, setCallerSignal] = useState<
    Peer.SignalData | undefined
  >();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
      console.log("Me:");
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    if (localStream) {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: localStream,
      });

      peer.on("signal", (data) => {
        socket.emit("callUser", {
          userToCall: id,
          signalData: data,
          from: me,
          name: name,
        });
      });

      peer.on("stream", (stream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
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
        <input
          type="text"
          placeholder="Your ID"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <CopyToClipboard text={me}>
          <button>Copy ID</button>
        </CopyToClipboard>

        <input
          type="text"
          placeholder="Enter ID to Call"
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
        />

        <button id="call" onClick={() => callUser(idToCall)}>
          Call
        </button>
      </div>
      <div>
        <h2>Your Video</h2>
        <video
          id="emitter-video"
          width="100%"
          height="200px"
          ref={myVideo}
          autoPlay
          playsInline
        />
      </div>
      <div>
        <h2>Remote Video</h2>
        <video
          id="remote-video"
          width="100%"
          height="200px"
          ref={userVideo}
          autoPlay
          playsInline
        />
      </div>
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
