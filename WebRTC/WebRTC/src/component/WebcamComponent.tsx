import { useEffect, useState, useRef } from "react";
import "./css/Webcam.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import io from "socket.io-client";
import Peer from "simple-peer";

const socket = io("https://webrtc-jl8a.onrender.com/");

const WebcamComponent: React.FC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [calling, setCalling] = useState(false);
  const [otherUserId, setOtherUserId] = useState("");
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
  const [deviceAccessible, setDeviceAccessible] = useState(true);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        myVideo.current.srcObject = stream;
      })
      .catch((error) => {
        console.error("Error accessing device:", error);
        setDeviceAccessible(false);
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setOtherUserId(data.from);

      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    setOtherUserId(id);
    if (!deviceAccessible) {
      return;
    }
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
    if (!deviceAccessible) {
      return;
    }

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
      socket.emit("leaveCall", { userToCall: otherUserId });
    }

    window.location.href = "/";
  };

  return (
    <div className="webcam-container">
      <div className="controls">
        {deviceAccessible ? (
          <>
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
            <button
              id="call"
              onClick={() => callUser(idToCall)}
              disabled={calling}
            >
              Call
            </button>
          </>
        ) : (
          <div className="device-error">
            <p>Device not accessible.</p>
          </div>
        )}
      </div>
      <div className="videos">
        <div className="video-container">
          <h2>Your cam</h2>
          <video id="emitter-video" ref={myVideo} autoPlay playsInline />
        </div>
        <div className="video-container">
          <h2>Calling user cam</h2>
          <video id="remote-video" ref={userVideo} autoPlay playsInline />
          {callAccepted && <button onClick={leaveCall}>End Call</button>}
        </div>
      </div>
      {receivingCall && !callAccepted && (
        <div className="call-received">
          <h1>{name} is calling you</h1>
          <button onClick={answerCall}>Answer</button>
          <button onClick={leaveCall}>End Call</button>
        </div>
      )}
    </div>
  );
};

export default WebcamComponent;
