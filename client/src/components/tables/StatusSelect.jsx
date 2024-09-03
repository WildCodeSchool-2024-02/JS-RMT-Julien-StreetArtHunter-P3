import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import connexion from "../../services/connexion";

function StatusSelect({ data, el }) {
  // Set the initial status from the data, defaulting to 1 if not available
  const [status, setStatus] = useState(data[el]);

  // Handle changes in the select dropdown
  const handleChange = (event) => {
    const newStatus = Number(event.target.value);
    setStatus(newStatus);
  };

  // Effect to handle the status update on change
  useEffect(() => {
    if (status !== data[el]) {
      const updateStatus = async () => {
        try {
          await connexion.put(`/api/views/${data.streetart_id}`, {
            status,
            user: data.user_id,
          });
        } catch (error) {
          console.error("Erreur lors de la mise à jour du statut:", error);
        }
      };

      updateStatus();
    }
  }, [status, data, el]);

  return (
    <td>
      <select value={status} onChange={handleChange}>
        <option value={1}>En attente</option>
        <option value={2}>Accepté</option>
        <option value={3}>Refusé</option>
      </select>
    </td>
  );
}

StatusSelect.propTypes = {
  data: PropTypes.string.isRequired,
  el: PropTypes.string.isRequired,
};

export default StatusSelect;
