import PropTypes from "prop-types";
import Button from "../ButtonDeleteAdmin";

function Rows({ data, handleDelete }) {
  return (
    <tr>
      {Object.keys(data).map((el) => (
        <td key={data[el]}>{data[el]}</td>
      ))}

      <td>
        <Button
          aria-label="delete-button"
          handleClick={handleDelete}
          id={data.id}
        />
      </td>
    </tr>
  );
}

Rows.propTypes = {
  data: PropTypes.shape.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Rows;
