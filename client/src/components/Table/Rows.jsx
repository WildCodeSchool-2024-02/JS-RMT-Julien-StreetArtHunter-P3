import PropTypes from "prop-types";

function Rows({ data }) {
  return (
    <tr>
      {Object.keys(data).map((el) => (
        <td key={data[el]}>{data[el]}</td>
      ))}
    </tr>
  );
}

Rows.propTypes = {
  data: PropTypes.shape.isRequired,
};

export default Rows;
