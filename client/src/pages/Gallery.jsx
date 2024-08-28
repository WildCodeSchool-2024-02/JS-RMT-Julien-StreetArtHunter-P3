import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import connexion from "../services/connexion";
import "../styles/styles-pages/Gallery.css";

function Gallery() {
  const [streetarts, setStreetarts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    connexion
      .get("api/streetarts")
      .then((response) => {
        setStreetarts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the street arts!", error);
      });
  }, []);

  const handleCardClick = (id) => {
    navigate(`/street-art-detail/${id}`);
  };

  const handleKeyDown = (event, id) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick(id);
    }
  };

  return (
    <div className="gallery-container">
      <h1>Galerie des Street Arts</h1>
      <div className="gallery-grid">
        {streetarts.map((streetart) => (
          <div
            key={streetart.id}
            className="card"
            role="button"
            tabIndex={0}
            aria-label={streetart.title}
            onClick={() => handleCardClick(streetart.id)}
            onKeyDown={(event) => handleKeyDown(event, streetart.id)}
          >
            <img
              src={`${import.meta.env.VITE_API_URL}/${streetart.image_url}`}
              alt={streetart.image_alt}
              className="card-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
