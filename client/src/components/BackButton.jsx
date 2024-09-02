import { useNavigate } from "react-router-dom"; // Assure-toi d'avoir installé et configuré React Router

function BackButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleClick} type="button" className="back-button">
      Retour
    </button>
  );
}

export default BackButton;
