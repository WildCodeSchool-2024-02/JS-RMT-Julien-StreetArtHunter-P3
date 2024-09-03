import PropTypes from "prop-types";
import ButtonDeleteAdmin from "../ButtonDeleteAdmin";
import ButtonUpdateAdmin from "../ButtonUpdateAdmin";
import StatusSelect from "./StatusSelect";

function Rows({ data, handleDelete, handleUpdate, noDelete, canUpdate }) {
  return (
    <tr>
      {Object.keys(data).map((el) => {
        if (el.includes("_image")) {
          if (data[el].includes("http")) {
            return (
              <td key={data[el]}>
                <img className="img_seen" src={data[el]} alt={data[el]} />
              </td>
            );
          }
          return (
            <td key={data[el]}>
              <img
                className="img_seen"
                src={`${import.meta.env.VITE_API_URL}/${data[el]}`}
                alt={data[el]}
              />
            </td>
          );
        }
        if (el.includes("_select")) {
          return <StatusSelect key={data[el]} data={data} el={el} />;
        }
        return <td key={data[el]}>{data[el]}</td>;
      })}
      {canUpdate && (
        <td>
          <ButtonUpdateAdmin
            aria-label="update-button"
            handleClick={handleUpdate}
            id={data.id}
          />
        </td>
      )}
      {!noDelete && (
        <td>
          <ButtonDeleteAdmin
            aria-label="delete-button"
            handleClick={handleDelete}
            id={data.id}
          />
        </td>
      )}
    </tr>
  );
}

Rows.propTypes = {
  data: PropTypes.shape.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  noDelete: PropTypes.bool.isRequired,
  canUpdate: PropTypes.bool.isRequired,
};

export default Rows;
