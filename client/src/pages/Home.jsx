import Geolocation from "../components/Geolocation";
import Carousel from "../components/Carousel";
import BackButton from "../components/BackButton";

import "../styles/Geolocation.css";

function Home() {
  return (
    <div>
      <BackButton />
      <Geolocation />
      <Carousel />
    </div>
  );
}

export default Home;
