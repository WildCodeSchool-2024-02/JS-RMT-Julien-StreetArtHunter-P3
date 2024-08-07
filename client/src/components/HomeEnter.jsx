import { useNavigate } from "react-router-dom";
import citybackground from "../assets/city-background.png";
import logo from "../assets/logo.png";
import "../App.css";
import "../styles/home-enter.css";
import "../styles/button.css";

function HomeEnter() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="App-header-enter">
      <img src={citybackground} className="App-background" alt="background" />
      <div className="content">
        <img src={logo} className="title-image" alt="Street Art Hunter" />
        <button type="button" className="button" onClick={handleClick}>
          Entrer
        </button>
      </div>
      <div className="about-section">
        <h2>A Propos</h2>
        <p>
          Nous préparons un prototype d’appli web pour tous les amateurs de
          street-art en ville. Notre appli promet une expérience visuelle
          nostalgique et amusante.
        </p>
        <p>
          Explore la ville, déniche des œuvres d’art urbaines, découvre les
          artistes et partage tes découvertes avec d’autres passionnés. Plonge
          dans une aventure qui mêle exploration urbaine et culture artistique,
          le tout dans une ambiance ludique et rétro !
        </p>
      </div>
    </div>
  );
}

export default HomeEnter;
