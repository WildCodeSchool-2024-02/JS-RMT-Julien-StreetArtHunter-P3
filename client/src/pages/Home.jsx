import Geolocation from "../components/Geolocation";
import Carousel from "../components/Carousel";
import SearchBar from "../components/SearchBar";

import "../styles/Geolocation.css";

function Home() {
  return (
    <div>
      <SearchBar />
      <Geolocation />
      <Carousel />
    </div>
  );
}

export default Home;
