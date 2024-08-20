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
          src={`${import.meta.env.VITE_API_URL}/${streetArt[0].image_url}`}
          alt={streetArt[0].image_alt}
        />
        <div className="detail-streetart-container">
          <h2>{streetArt[0].title}</h2>
          <h3>{streetArt[0].category_title}</h3>
          <h4>{streetArt[0].city_name}</h4>
          <p> Artiste: {streetArt[0].artist_name}</p>
          <div>
            <h2>Description:</h2>
            {streetArt[0].description && (
              <p className="streetart-description">{streetArt[0].description}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Detail;
