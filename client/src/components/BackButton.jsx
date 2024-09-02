import { useNavigate } from "react-router-dom";
import "../styles/back-button.css";
import flecheRetour from "../assets/flecheRetour.png";

function BackButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button className="back-button" onClick={handleClick} type="button">
      <img src={flecheRetour} alt="Retour" className="back-button-logo" />
    </button>
  );
}

export default BackButton;
