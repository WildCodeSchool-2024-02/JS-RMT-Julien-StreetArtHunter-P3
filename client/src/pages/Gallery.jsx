import { useEffect, useState } from "react";
import StreetArtGallery from "../components/StreetArtGallery";
import connexion from "../services/connexion";
import "../styles/styles-pages/Gallery.css";

function Gallery() {
  const [streetarts, setStreetarts] = useState([]);
  const [recentStreetarts, setRecentStreetarts] = useState([]);

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

  return (
    <div className="gallery-container">
      <h1>Galerie des Street Arts</h1>
      <StreetArtGallery title="Tous les Street Arts" streetarts={streetarts} />
      <StreetArtGallery
        title="Ajoutés récemment"
        streetarts={recentStreetarts}
      />
    </div>
  );
}

export default Gallery;
