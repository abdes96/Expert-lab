import { useEffect , useState } from 'react';
import './css/Webcam.css';
const WebcamComponent = () => {
    

    const [mediaStream, setMediaStream] = useState(null);

    useEffect(() => {
        const startButton = document.querySelector('#start');
        const stopButton = document.querySelector('#stop');
        const videoElement = document.getElementById('emitter-video');

        startButton.addEventListener('click', async () => {
            const constraints = {
                'video': true,
                'audio': true
            };

            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                console.log('Got MediaStream:', stream);
                videoElement.srcObject = stream;
                videoElement.play();
                setMediaStream(stream);
            } catch (error) {
                console.error('Error accessing media devices.', error);
            }
          
        });

        stopButton.addEventListener('click', () => {
            if (mediaStream) {
                const tracks = mediaStream.getTracks();
                tracks.forEach(track => track.stop());
                videoElement.srcObject = null;
                setMediaStream(null);

            }
        });


    }, [mediaStream]);


    return (
        <div id='video'>
            <div>
            <button id="start">Start</button>
            <button id="stop">Stop</button>
</div>
            <video id="emitter-video" width="100%" height="400px"></video>

        </div>
    );
};

export default WebcamComponent;
