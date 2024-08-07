/* eslint-disable react/jsx-props-no-spreading */
import { useLoaderData } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/carousel.css";

function Carousel() {
  const streetArts = useLoaderData();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <main className="carousel-main">
      <div className="carousel-container">
        <Slider {...settings}>
          {streetArts.map((streetart) => (
            <div key={streetart.id} className="carousel-streetart">
              <img
                src={`${import.meta.env.VITE_API_URL}/${streetart.imageUrl}`}
                alt={streetart.imageAlt}
              />
              <div className="carousel-item-details">
                <h3>{streetart.title}</h3>
                <p>Artist: {streetart.artist_id}</p>
                <p>City: {streetart.city_id}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </main>
  );
}

export default Carousel;
