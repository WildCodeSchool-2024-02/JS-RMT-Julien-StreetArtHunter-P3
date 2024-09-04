import PropTypes from "prop-types";
import { BsPencilSquare } from "react-icons/bs";
import "../styles/button.css";

function ButtonUpdateAdmin({ label, handleClick, id }) {
  return (
    <button type="button" className="button" onClick={() => handleClick(id)}>
      <BsPencilSquare />
      {label}
    </button>
  );
}

ButtonUpdateAdmin.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default ButtonUpdateAdmin;
