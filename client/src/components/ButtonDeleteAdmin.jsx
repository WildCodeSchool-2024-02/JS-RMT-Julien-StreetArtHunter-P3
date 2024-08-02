import PropTypes from "prop-types";
import { BsTrash3 } from "react-icons/bs";

function ButtonDeleteAdmin({ label, handleClick, id }) {
  return (
    <button type="button" className="button" onClick={() => handleClick(id)}>
      <BsTrash3 />
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
