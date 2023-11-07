export default function Friend() {
  return (
    <>
      <div className="friend">
        <h1> Private Room</h1>
        <p>Join private room</p>
        <div className="entery">
          <h2>
            {" "}
            Enter Room ID : 
            <input type="text" />
          </h2>
          <button onClick={""}>Join Chat</button>
        </div>
      </div>
    </>
  );
}
