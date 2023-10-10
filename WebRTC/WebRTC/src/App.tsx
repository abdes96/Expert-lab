
import WebcamComponent from "./component/WebcamComponent";
import "./index.css";

function App() {
  
  return (
    <>
    


      <h1>WebRTX</h1>

      <div className="container">
        <h1 className="mx-5">receiver-video</h1>
          <WebcamComponent/>
                   </div> 


        <div className="container mt-5">
          <h1 className="mx-5">emitter-video</h1>
          </div> 
    </>
  );
}

export default App;
