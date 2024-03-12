import "../styles/Toggle.css";
import MoonIcon from "../Assets/moonicon.png";
import SunIcon from "../Assets/sunicon.png";

const Toggle = ({ handleChange, isChecked }) => {
  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="check"
        className="toggle"
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor="check">
        {isChecked ? (
          <img src={SunIcon} alt="Sun Icon" />
        ) : (
          <img src={MoonIcon} alt="Moon Icon" />
        )}
      </label>
    </div>
  );
};

export default Toggle;
