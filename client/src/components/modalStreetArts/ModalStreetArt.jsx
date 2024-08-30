import { useState } from "react";
import PropTypes from "prop-types";
import connexion from "../../services/connexion";

import ModalButton from "../modalShared/ModalButton";
import ModalSelect from "../modalShared/ModalSelect";


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
          aria-label=" streetArt titre"
          name="title"
          placeholder="Titre"
          value={newStreetArt.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          aria-label=" streetArt description"
          name="description"
          placeholder="Description"
          value={newStreetArt.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          aria-label=" streetArt geolocalisation_x"
          name="geolocation_x"
          placeholder="Geolocalisation X"
          value={newStreetArt.geolocation_x}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          aria-label=" streetArt geolocalisation y"
          name="geolocation_y"
          placeholder="Geolocalisation Y"
          value={newStreetArt.geolocation_y}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          aria-label=" streetArt image"
          name="image_url"
          placeholder="Image URL"
          value={newStreetArt.image_url}
          onChange={handleInputChange}
          required
        />
        <ModalSelect
          handleInputChange={handleInputChange}
          url="cities"
          aria-label="ville"
          name="city_id"
          value={newStreetArt.city_id}
          title="Sélectionne une ville"
          optionKey="name"
        />
        <ModalSelect
          handleInputChange={handleInputChange}
          url="artists"
          aria-label="artiste"
          name="artist_id"
          value={newStreetArt.artist_id}
          title="Sélectionne un artiste"
          optionKey="name"
        />
        <ModalButton closeAddModal={closeAddModal}  label="close button"/>
      </form>
    </div>
  );
}

ModalStreetArt.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
  closeAddModal: PropTypes.func.isRequired,
};

export default ModalStreetArt;
