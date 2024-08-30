import PropTypes from "prop-types";
import Button from "../ButtonDeleteAdmin";

function Rows({ data, handleDelete }) {
  return (
    <tr>
      {Object.keys(data).map((el) => {
        if (el.includes("_image")) {
          if (data[el].includes("http")) {
            return <img src={data[el]} key={data[el]} alt={data[el]} />;
          }
          return (
            <img
              src={`${import.meta.env.VITE_API_URL}/${data[el]}`}
              key={data[el]}
              alt={data[el]}
            />
          );
        }
        return <td key={data[el]}>{data[el]}</td>;
      })}

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
