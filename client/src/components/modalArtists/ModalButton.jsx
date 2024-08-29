import PropTypes from "prop-types";

function ModalButton({ closeAddModal, label }) {
  return (
    <div>
      <button type="submit">Ajouter {label}</button>
      <button type="button" onClick={closeAddModal}>
        Annuler
      </button>
    </div>
  );
}

ModalButton.propTypes = {
  closeAddModal: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default ModalButton;
