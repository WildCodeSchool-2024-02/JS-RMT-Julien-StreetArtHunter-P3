import { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
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

function RecenterAutomatically({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
}

RecenterAutomatically.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default function Geolocation() {
  const streetArts = useLoaderData();
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState([48.8566, 2.3522]); // Position initiale
  const [zoom, setZoom] = useState(7);

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
    // iconUrl: pointerIconUrl,
    iconSize: [38, 38], // size of the icon
  });

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (searchQuery) => {
    const geocoder = Control.Geocoder.nominatim();
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
      <MapContainer center={position} zoom={zoom} className="mapContainer">
        {/* OPEN STREEN MAPS TILES */}
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
                <Link
                  to={`/street-art-detail/${streetArt.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h4>Titre de l'oeuvre:{streetArt.title}</h4>
                  <p>Artiste:{streetArt.name}</p>
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${streetArt.image_url}`}
                    alt={streetArt.image_alt}
                  />
                </Link>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <LocationMarker />
        <RecenterAutomatically lat={position[0]} lng={position[1]} />
      </MapContainer>
    </>
  );
}
