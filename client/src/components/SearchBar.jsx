import { useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder";
import "../styles/searchBar.css";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState([51.505, -0.09]); // Position initiale
  const [zoom, setZoom] = useState(13);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (searchQuery) => {
    const geocoder = L.Control.Geocoder.nominatim();

    geocoder.geocode(searchQuery, (results) => {
      if (results.length > 0) {
        const { center } = results[0];
        setPosition([center.lat, center.lng]);
        setZoom(13);
        // setErrorMessage("");
      } else {
        // setErrorMessage("Lieu non trouvé");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      handleSearch(query);
    }
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Entrez une ville..."
          className="search-input"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">
          Rechercher
        </button>
      </form>

      <MapContainer
        center={position}
        zoom={zoom}
        zoomControl={false}
        style={{ height: "100vh", marginTop: "20px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png" />
        <ZoomControl position="topright" />
      </MapContainer>
    </div>
  );
}

export default SearchBar;
