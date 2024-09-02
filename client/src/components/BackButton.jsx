import { useNavigate } from "react-router-dom";
import "../styles/back-button.css";

function BackButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button className="back-button" onClick={handleClick} type="button">
      Retour
    </button>
  );
}

export default BackButton;
