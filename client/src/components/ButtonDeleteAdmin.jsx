import PropTypes from "prop-types";
import "../styles/button.css";

function ButtonDeleteAdmin({ label, handleClick, id }) {
  return (
    <button type="button" className="button" onClick={() => handleClick(id)}>
      {label}
    </button>
  );
}

ButtonDeleteAdmin.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default ButtonDeleteAdmin;
