import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import connexion from "../../services/connexion";
import ModalButton from "../modalShared/ModalButton";

const initialArtist = {
  name: "",
  points: 0,
};

function ModalArtist({ handleRefresh, closeAddModal, updateId }) {
  const [newArtist, setNewArtist] = useState(initialArtist);

  useEffect(() => {
    if (updateId) {
      connexion
        .get(`/api/artists/${updateId.id}`)
        .then((res) => setNewArtist(res.data))
        .catch((err) => console.error(err));
    }
    return () => {
      setNewArtist(initialArtist);
    };
  }, [updateId]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArtist((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (updateId) {
        delete newArtist.id;
        await connexion.put(`api/artists/${updateId.id}`, newArtist);
      } else {
        await connexion.post(`api/artists`, newArtist);
      }
      handleRefresh();
    } catch (error) {
      console.error("There was an error adding or updating the artist!", error);
    }
  };

  return (
    <div>
      <h2>Ajouter un nouvel artiste</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          aria-label="name"
          name="name"
          placeholder="name"
          value={newArtist.name}
          onChange={handleInputChange}
          required
        />

        <input
          type="number"
          aria-label="points"
          name="points"
          placeholder="Points"
          value={newArtist.points}
          onChange={handleInputChange}
        />
        <ModalButton closeAddModal={closeAddModal} label="nouvel artiste" updateId />
      </form>
    </div>
  );
}

ModalArtist.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
  closeAddModal: PropTypes.func.isRequired,
  updateId: PropTypes.number.isRequired,
};

export default ModalArtist;