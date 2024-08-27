import { useEffect, useState } from "react";
import connexion from "../services/connexion";
import "../styles/styles-pages/Gallery.css";

function Gallery() {
  const [streetarts, setStreetarts] = useState([]);

  useEffect(() => {
    connexion
      .get("api/streetarts")
      .then((response) => {
        setStreetarts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the artist!", error);
      });
  }, []);

  return (
    <div className="gallery-container">
      <h1>Galerie des Street Arts</h1>
      <div className="gallery-grid">
        {streetarts.map((streetart) => (
          <div key={streetart.id} className="card">
            <img
              src={`${import.meta.env.VITE_API_URL}/${streetart.image_url}`}
              alt={streetart.image_alt}
              className="card-image"
            />
            <div className="card-content">
              <h2>{streetart.title}</h2>
              <p>Artiste: {streetart.name}</p>
              <p>Ville: {streetart.city_name}</p>
              <p>
                Géolocalisation: {streetart.geolocation_x},{" "}
                {streetart.geolocation_y}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
