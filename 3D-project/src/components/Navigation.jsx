import React from "react";

function Navigation({ onSelectModel }) {
  return (
    <div className="navigation">
      <button onClick={() => onSelectModel("goingmerry")}>Going Merry</button>
      <button onClick={() => onSelectModel("meramera")}>MerameraNomi</button>
      <button onClick={() => onSelectModel("lamp")}>Lamp</button>
      <button onClick={() => onSelectModel("model4")}>Model 4</button>
    </div>
  );
}

export default Navigation;
