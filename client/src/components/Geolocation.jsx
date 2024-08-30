import { useState, useEffect } from "react";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point, Control } from "leaflet";
import PropTypes from "prop-types";
import LocationMarker from "./LocationMarker";
import "leaflet-control-geocoder";
import "../styles/searchBar.css";
import "../styles/Geolocation.css";
import "../App.css";

function RecenterAutomatically({ lat, lng, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], zoom); // Mise à jour de la position et du zoom
  }, [lat, lng, zoom, map]);
  return null;
}

RecenterAutomatically.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
};

export default function Geolocation() {
  const streetArts = useLoaderData();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState([48.8566, 2.3522]); // Position initiale
  const [zoom, setZoom] = useState(5); // Définir le zoom initial à 5
  const [errorMessage, setErrorMessage] = useState(""); // État pour le message d'erreur

  // custom cluster icon
  const createClusterCustomIcon = (cluster) =>
    // eslint-disable-next-line new-cap
    new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });

  // create custom icon
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38], // taille de l'icône
  });

  const handleMoreInfo = (streetArt) => {
    navigate(`/street-art-detail/${streetArt.id}`);
  };

  // Function to navigate to the hunter game page
  const handleValidate = () => {
    navigate("/hunter-game");
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setErrorMessage(""); // Réinitialiser le message d'erreur lors de la saisie
  };

  const handleSearch = (searchQuery) => {
    const geocoder = Control.Geocoder.nominatim();
    geocoder.geocode(searchQuery, (results) => {
      if (results.length > 0) {
        const { center } = results[0];
        setPosition([center.lat, center.lng]);
        setZoom(10); // Mise à jour du zoom à 10 après la recherche
        setErrorMessage(""); // Réinitialiser le message d'erreur
      } else {
        setErrorMessage(
          "Lieu non trouvé, veuillez essayer une autre recherche"
        ); // Afficher un message d'erreur
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
    <>
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
      {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
      {/* Afficher le message d'erreur */}
      <MapContainer center={position} zoom={zoom} className="mapContainer">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <SetViewOnClick animateRef={animateRef} /> */}
        <ZoomControl position="bottomleft" />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {/* Mapping through the markers */}
          {streetArts.map((streetArt) => (
            <Marker
              position={[streetArt.geolocation_y, streetArt.geolocation_x]}
              icon={customIcon}
              key={streetArt.id}
            >
              <Popup>
                <div className="popup-content-wrapper">
                  <h4 className="popup-title">Titre : {streetArt.title}</h4>
                  <p className="popup-artist">Artiste: {streetArt.name}</p>
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${streetArt.image_url}`}
                    alt={streetArt.image_alt}
                    className="popup-image"
                  />
                </div>
                <div className="popup-buttons">
                  <button
                    type="button"
                    onClick={() => handleMoreInfo(streetArt)}
                    className="btn-more-info"
                  >
                    Détails
                  </button>
                  <button
                    type="button"
                    onClick={handleValidate}
                    className="btn-validate"
                  >
                    Valider
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <LocationMarker />
        <RecenterAutomatically
          lat={position[0]}
          lng={position[1]}
          zoom={zoom}
        />
      </MapContainer>
    </>
  );
}
