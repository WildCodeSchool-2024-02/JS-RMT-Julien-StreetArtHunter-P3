import { useState } from "react";
import { useNavigate } from "react-router-dom";
import connexion from "../services/connexion";
import { useLogin } from "../context/LoginContext";
import "../styles/hunter-game.css";

function HunterGame() {
  const [capturedImage, setCapturedImage] = useState(null); // Stocke l'image capturée
  const [file, setFile] = useState(null); // Stocke le fichier sélectionné
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { streetArtToValidation } = useLogin();
  const navigate = useNavigate(); // Gère l'affichage du modal

  // Gérer la capture d'image depuis l'input file
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile); // Crée un lien temporaire pour afficher l'image
      setCapturedImage(imageURL); // Met à jour l'image capturée à afficher
      setFile(selectedFile); // Garde la référence au fichier pour l'envoi
    }
  };

  // Soumission du formulaire pour ajouter un street art
  const handleAddSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("proof", file); // Envoie le fichier capturé
      formData.append("id", streetArtToValidation.id); // Envoie l'ID ou l'URL du street art

      await connexion.post(`api/views`, formData);

      setIsModalOpen(false); // Ferme le modal après soumission
      navigate("/result");
    } catch (error) {
      console.error("There was an error adding the new street art!", error);
    }
  };

  // Fonction pour ouvrir le modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="hunter-game-background">
      <div className="screen-container">
        {/* Affiche l'image capturée si disponible */}
        {capturedImage && (
          <img
            src={capturedImage}
            alt="Captured Street Art"
            className="captured-image"
          />
        )}
      </div>

      <div className="button-top-container">
        <button
          type="button"
          className="return-btn"
          onClick={() => window.history.back()}
        >
          Retour
        </button>

        {/* Input file pour capturer l'image */}
        <input
          aria-label="capture du street art"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="capture-btn"
          style={{ display: "none" }} // Masque l'input file
          id="fileInput"
        />
        <label htmlFor="fileInput" className="capture-btn">
          Capturer
        </label>
      </div>

      <div className="button-down-container">
        <button type="button" className="valid-btn" onClick={openModal}>
          Valider
        </button>
      </div>

      {/* Modal pour afficher le formulaire */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Valider la capture</h2>
            <form onSubmit={handleAddSubmit} encType="multipart/form-data">
              <label htmlFor="id">ID du Street Art (URL):</label>
              <input
                id="id"
                type="text"
                value={streetArtToValidation.id}
                disabled="disabled"
                aria-label="id du street art"
              />
              <label htmlFor="title">Titre de l'oeuvre:</label>
              <input
                id="title"
                type="text"
                value={streetArtToValidation.title}
                disabled="disabled"
                aria-label="titre du street art"
              />
              <div className="modal-buttons">
                <button type="submit" className="submit-btn">
                  Soumettre
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HunterGame;
