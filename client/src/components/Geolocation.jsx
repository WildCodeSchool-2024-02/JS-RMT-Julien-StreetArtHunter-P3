import { useLoaderData, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import LocationMarker from "./LocationMarker";
import "../styles/Geolocation.css";
import "../App.css";

export default function Geolocation() {
  const streetArts = useLoaderData();
  const navigate = useNavigate();

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

  const handleMoreInfo = (streetArt) => {
    navigate(`/street-art-detail/${streetArt.id}`);
  };

  // Function to navigate to the hunter game page
  const handleValidate = () => {
    navigate("/hunter-game");
  };

  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={5} className="mapContainer">
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
              <div className="popup-content-wrapper">
                <h4 className="popup-title">
                  Titre : {streetArt.title}
                </h4>
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
    </MapContainer>
  );
}
