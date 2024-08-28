import PropTypes from "prop-types";

function AddModalSelect({ cities, artistes, newStreetArt, handleInputChange }) {
  return (
    <div>
      <select
        name="city_id"
        value={newStreetArt.city_id}
        onChange={handleInputChange}
        required
      >
        <option value="">Sélectionne une ville</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
      <select
        name="artist_id"
        value={newStreetArt.artist_id}
        onChange={handleInputChange}
        required
      >
        <option value="">Sélectionne un artiste</option>
        {artistes.map((artist) => (
          <option key={artist.id} value={artist.id}>
            {artist.name}
          </option>
        ))}
      </select>
    </div>
  );
}

AddModalSelect.propTypes = {
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
  newStreetArt: PropTypes.shape({
    city_id: PropTypes.string.isRequired,
    artist_id: PropTypes.string.isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default AddModalSelect;
