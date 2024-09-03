import { useLoaderData } from "react-router-dom";
import "../styles/detail.css";

function Detail() {
  const streetArt = useLoaderData();
  if (!streetArt) {
    return <p>StreetArt non trouvé</p>;
  }

  return (
    <div>
      <section className="container-detail">
        <img
          className="streetart-image"
          src={`${import.meta.env.VITE_API_URL}/${streetArt.image_url}`}
          alt={streetArt.image_alt}
        />
        <div className="detail-streetart-container">
          <h3>{streetArt.title}</h3>
          <h3>{streetArt.category_title}</h3>
          <h4>{streetArt.city_name}</h4>
          <p> Artiste: {streetArt.artist_name}</p>
        </div>
        <div className="description-container">
          <h5>Description:</h5>
          {streetArt.description && (
            <p className="streetart-description">{streetArt.description}</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Detail;
