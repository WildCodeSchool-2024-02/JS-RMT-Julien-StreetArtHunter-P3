import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StreetArtGallery from "../components/StreetArtGallery";
import connexion from "../services/connexion";
import "../styles/styles-pages/Gallery.css";

function Gallery() {
  const [streetarts, setStreetarts] = useState([]);
  const [recentStreetarts, setRecentStreetarts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    connexion
      .get("api/streetarts")
      .then((response) => {
        setStreetarts(response.data);
      })
      .catch((error) => {
        console.error(
          "Il y a eu une erreur lors de la récupération des street arts !",
          error
        );
      });

    connexion
      .get("api/streetarts/?type=recent")
      .then((response) => {
        setRecentStreetarts(response.data);
      })
      .catch((error) => {
        console.error(
          "Il y a eu une erreur lors de la récupération des street arts récents !",
          error
        );
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
      <StreetArtGallery
        title="Tous les Street Arts"
        streetarts={streetarts}
        handleCardClick={handleCardClick}
        handleKeyDown={handleKeyDown}
      />
      <StreetArtGallery
        title="Ajoutés récemment"
        streetarts={recentStreetarts}
        handleCardClick={handleCardClick}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Gallery;
