import { useState } from "react";
import PropTypes from "prop-types";
import connexion from "../../services/connexion";
import ModalButton from "./ModalButton";

function ModalArtist({ handleRefresh, closeAddModal }) {
  const [newArtist, setNewArtist] = useState({
    name: "",
    points: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArtist((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    connexion
      .post("api/artists", newArtist)
      .then(() => {
        handleRefresh();
      })
      .catch((error) => {
        console.error("There was an error adding a new artist!", error);
      });
  };

  return (
    <div>
      <h2>Ajouter un nouveau artiste</h2>
      <form onSubmit={handleAddSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={newArtist.name}
          onChange={handleInputChange}
          required
        />

        <input
          type="number" // Use number type for points
          name="points"
          placeholder="Points"
          value={newArtist.points}
          onChange={handleInputChange}
        />
        <ModalButton closeAddModal={closeAddModal} />
      </form>
    </div>
  );
}

ModalArtist.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
  closeAddModal: PropTypes.func.isRequired,
};

export default ModalArtist;