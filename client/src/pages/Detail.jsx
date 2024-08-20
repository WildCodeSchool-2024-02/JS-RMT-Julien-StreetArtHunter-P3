import { useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import "../styles/detail.css";

function Detail() {
  const streetArt = useLoaderData();

  if (!streetArt) {
    return <p>StreetArt non trouvé</p>;
  }
  return (
    <div>
      <Header />
      <section className="container">
        <img
          className="streetart-image"
          src={`${import.meta.env.VITE_API_URL}/${streetArt.image_url}`}
          alt={streetArt.image_alt}
        />
        <div className="detail-streetart-container">
          <h2>{streetArt.title}</h2>
          <h3>{streetArt.category_title}</h3>
          <h4>{streetArt.city_name}</h4>
          <p> Artiste: {streetArt.artist_name}</p>
          <div>
            <h2>Description:</h2>
            {streetArt.description && (
              <p className="streetart-description">{streetArt.description}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Detail;
