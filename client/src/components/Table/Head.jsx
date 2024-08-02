import PropTypes from "prop-types";

function Head({ data }) {
  return (
    <tr>
      {Object.keys(data).map((el) => (
        <td key={el}>{el}</td>
      ))}
    </tr>
  );
}

Head.propTypes = {
  data: PropTypes.shape.isRequired,
};
export default Head;
