import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function StreetArtGallery({ title, streetarts }) {
  const navigate = useNavigate();

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
    <div className="streetart-gallery">
      <h2>{title}</h2>
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

StreetArtGallery.propTypes = {
  title: PropTypes.string.isRequired,
  streetarts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      image_alt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StreetArtGallery;
