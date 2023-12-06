import React from "react";

function Navigation({ onSelectModel }) {
  return (
    <div className="navigation">
      <button onClick={() => onSelectModel("goingmerry")}>Going Merry</button>
      <button onClick={() => onSelectModel("model2")}>Model 2</button>
      <button onClick={() => onSelectModel("model3")}>Model 3</button>
      <button onClick={() => onSelectModel("model4")}>Model 4</button>
    </div>
  );
}

export default Navigation;
