import PropTypes from "prop-types";

function AddModalButton({ onSubmit, onCancel }) {
  return (
    <div>
      <button type="submit" onClick={onSubmit}>
        Ajouter StreetArt
      </button>
      <button type="button" onClick={onCancel}>
        Annuler
      </button>
    </div>
  );
}

AddModalButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AddModalButton;
