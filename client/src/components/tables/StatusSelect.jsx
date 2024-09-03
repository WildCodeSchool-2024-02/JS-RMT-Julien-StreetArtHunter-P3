import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import connexion from "../../services/connexion";

function StatusSelect({ data, el }) {
  const [status, setStatus] = useState(data[el]);

  const handleChange = (event) => {
    const newStatus = Number(event.target.value);
    setStatus(newStatus);
  };

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

  const getStatusClass = () => {
    switch (status) {
      case 1:
        return "status-pending";
      case 2:
        return "status-approved";
      case 3:
        return "status-rejected";
      default:
        return "";
    }
  };

  return (
    <td>
      <select
        value={status}
        onChange={handleChange}
        className={`status-select ${getStatusClass()}`}
      >
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
