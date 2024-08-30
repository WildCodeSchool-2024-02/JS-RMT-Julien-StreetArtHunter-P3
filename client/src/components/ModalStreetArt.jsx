import { useState } from "react";
import PropTypes from "prop-types";
import connexion from "../services/connexion";
import ModalSelect from "./ModalSelect";
import ModalButton from "./ModalButton";

function ModalStreetArt({ handleRefresh, closeAddModal }) {
  const [newStreetArt, setNewStreetArt] = useState({
    title: "",
    description: "",
    geolocation_x: null,
    geolocation_y: null,
    image_url: "",
    city_id: null,
    artist_id: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStreetArt((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    connexion
      .post("api/streetarts", newStreetArt)
      .then(() => {
        handleRefresh();
      })
      .catch((error) => {
        console.error("There was an error adding the new street art!", error);
      });
  };

  return (
    <div>
      <h2>Ajouter un nouveau StreetArt</h2>
      <form onSubmit={handleAddSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={newStreetArt.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newStreetArt.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="geolocation_x"
          placeholder="Geolocalisation X"
          value={newStreetArt.geolocation_x}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="geolocation_y"
          placeholder="Geolocalisation Y"
          value={newStreetArt.geolocation_y}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={newStreetArt.image_url}
          onChange={handleInputChange}
          required
        />
        <ModalSelect
          handleInputChange={handleInputChange}
          url="cities"
          name="city_id"
          value={newStreetArt.city_id}
          title="Sélectionne une ville"
          optionKey="name"
        />
        <ModalSelect
          handleInputChange={handleInputChange}
          url="artists"
          name="artist_id"
          value={newStreetArt.artist_id}
          title="Sélectionne un artiste"
          optionKey="name"
        />
        <ModalButton closeAddModal={closeAddModal} />
      </form>
    </div>
  );
}

ModalStreetArt.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
  closeAddModal: PropTypes.func.isRequired,
};

export default ModalStreetArt;
