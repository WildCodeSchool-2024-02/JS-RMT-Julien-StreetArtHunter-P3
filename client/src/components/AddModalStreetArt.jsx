import PropTypes from "prop-types";
import AddModalSelect from "./AddModalSelect";
import AddModalButton from "./AddModalButton";

function AddModalStreetArt({
  handleAddSubmit,
  handleInputChange,
  newStreetArt,
  cities,
  artistes,
}) {
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
        <AddModalSelect
          cities={cities}
          artistes={artistes}
          newStreetArt={newStreetArt}
          handleInputChange={handleInputChange}
        />
        <AddModalButton />
      </form>
    </div>
  );
}

AddModalStreetArt.propTypes = {
  handleAddSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  newStreetArt: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    geolocation_x: PropTypes.string,
    geolocation_y: PropTypes.string,
    image_url: PropTypes.string,
    city_id: PropTypes.string,
    artist_id: PropTypes.string,
  }).isRequired,
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  artistes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
};

export default AddModalStreetArt;
