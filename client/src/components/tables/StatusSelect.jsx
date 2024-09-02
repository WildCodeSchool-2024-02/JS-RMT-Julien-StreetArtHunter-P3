import PropTypes from "prop-types";

function StatusSelect({ data, el }) {
  return (
    <td key={data[el]}>
      <select>
        <option value={1}>En attente</option>
        <option value={2}>Accepté</option>
        <option value={3}>Refusé</option>
      </select>
    </td>
  );
}

StatusSelect.propTypes = {
  data: PropTypes.shape.isRequired,
  el: PropTypes.string.isRequired,
};

export default StatusSelect;
