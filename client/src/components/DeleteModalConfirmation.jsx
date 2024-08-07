import PropTypes from "prop-types";

function DeleteModalConfirmation({ onDelete, onCancel }) {
  return (
    <div>
      <h2>Supprimer cet utilisateur ?</h2>
      <button type="button" onClick={onDelete}>
        Oui, supprimer
      </button>
      <button type="button" onClick={onCancel}>
        Annuler
      </button>
    </div>
  );
}

DeleteModalConfirmation.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteModalConfirmation;
