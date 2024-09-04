import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import connexion from "../../services/connexion";

function AddModalSelect({
  handleInputChange,
  url,
  name,
  value,
  title,
  optionKey,
}) {
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    connexion
      .get(`api/${url}`)
      .then((response) => {
        setSelection(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the cities!", error);
      });
  }, [url]);

  return (
    <select name={name} onChange={handleInputChange} required value={value}>
      <option value="">{title}</option>
      {selection.map((select) => (
        <option key={select.id} value={select.id}>
          {select[optionKey]}
        </option>
      ))}
    </select>
  );
}

AddModalSelect.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  optionKey: PropTypes.string.isRequired,
};

export default AddModalSelect;
