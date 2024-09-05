import PropTypes from "prop-types";

function ModalButton({ closeAddModal, label, updateId }) {
  return (
    <div>
      <button type="submit">
        {updateId ? "Modifier" : "Ajouter"} {label}
      </button>
      <button type="button" onClick={closeAddModal}>
        Annuler
      </button>
    </div>
  );
}

ModalButton.propTypes = {
  closeAddModal: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  updateId: PropTypes.number.isRequired,
};

export default ModalButton;
