import { useLoaderData, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Carousel from "../components/Carousel"; 
import "../styles/detail.css";

function Detail() {
  const streetArts = useLoaderData(); 
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id'); // Récupère l'ID de l'œuvre via les paramètres de recherche
  
  // Trouver l'œuvre qui correspond à l'ID
  const streetArt = streetArts.find((art) => art.id === Number(id));

  return (
    <div>
      <Header />
      <section className="detail-streetart-container">
        <h2 className="streetart-title">{streetArt.title}</h2>
        <p className="streetart-artist">Artiste: {streetArt.name}</p>
        <div className="streetart-image-container">
          <img
            src={`${import.meta.env.VITE_API_URL}/${streetArt.image_url}`}
            alt={streetArt.image_alt}
            className="streetart-image"
          />
        </div>
        {streetArt.description && (
          <p className="streetart-description">{streetArt.description}</p>
        )}
      </section>
      <Carousel />
    </div>
  );
}

export default Detail;
