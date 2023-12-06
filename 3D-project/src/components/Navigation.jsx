import PropTypes from "prop-types";
import ObjectUploader from "./ObjectUploader";

const Navigation = ({ onSelectModel, onFileUpload }) => {
  return (
    <nav className="navigation">
      <button onClick={() => onSelectModel("goingmerry")}>Goingmerry</button>
      <button onClick={() => onSelectModel("meramera")}>Meramera</button>
      <button onClick={() => onSelectModel("lamp")}>Lamp</button>

      <ObjectUploader onFileUpload={onFileUpload} />
    </nav>
  );
};

Navigation.propTypes = {
  onSelectModel: PropTypes.func.isRequired,
  onFileUpload: PropTypes.func.isRequired,
};

export default Navigation;
