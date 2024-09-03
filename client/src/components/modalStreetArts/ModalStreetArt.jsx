import { useRef, useState } from "react";
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

  const inputRef = useRef();
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("streetart", inputRef.current.files[0]);
      formData.append("title", newStreetArt.title);
      formData.append("description", newStreetArt.description);
      formData.append("geolocation_x", newStreetArt.geolocation_x);
      formData.append("geolocation_y", newStreetArt.geolocation_y);
      formData.append("city_id", newStreetArt.city_id);
      formData.append("artist_id", newStreetArt.artist_id);
      await connexion.post(`api/streetarts`, formData);
      handleRefresh();
    } catch
    (error) {
      console.error("There was an error adding the new street art!", error);
    }
  };

  return (
    <div>
      <h2>Ajouter un nouveau StreetArt</h2>
      <form onSubmit={handleAddSubmit} encType="multipart/form-data">
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
          type="file"
          aria-label=" streetArt image"
          name="image_url"
          placeholder="Image URL"
          value={newStreetArt.image_url}
          ref={inputRef}
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
