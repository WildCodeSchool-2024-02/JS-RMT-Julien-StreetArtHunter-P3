/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import connexion from "../services/connexion";
import "../styles/hunter-game.css";

export default function HunterGame({ handleRefresh , proof }) {
  const [capturedImage, setCapturedImage] = useState(null); // Stocke l'image capturée
  const [newStreetArt, setNewStreetArt] = useState({
    id: proof?.id || "",
    title: proof?.title || "",
  });
  const [file, setFile] = useState(null); // Stocke le fichier sélectionné
  const [isModalOpen, setIsModalOpen] = useState(false); // Gère l'affichage du modal

  // Utilise l'ID et le titre du street art pour les pré-remplir lors de l'ouverture du modal
  useEffect(() => {
    if (proof) {
      setNewStreetArt({
        id: proof.id, // Pré-remplit l'ID
        proof      });
    }
  }, [proof]);

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
      formData.append("streetart", file); // Envoie le fichier capturé
      formData.append("id", newStreetArt.id); // Envoie l'ID ou l'URL du street art
      formData.append("title", newStreetArt.title); // Envoie le titre du street art

      await connexion.post(`api/proof`, formData);

      handleRefresh(); // Rafraîchit si handleRefresh est fourni

      setIsModalOpen(false); // Ferme le modal après soumission
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
            <h2>Ajouter un Street Art</h2>
            <form onSubmit={handleAddSubmit} encType="multipart/form-data">
              <label>ID du Street Art (URL):</label>
              <input
                type="text"
                value={newStreetArt.id}
                onChange={(e) =>
                  setNewStreetArt({ ...newStreetArt, id: e.target.value })
                }
                placeholder="Entrez l'ID ou l'URL"
                required
              />
              <label>Titre de l'oeuvre:</label>
              <input
                type="text"
                value={newStreetArt.title}
                onChange={(e) =>
                  setNewStreetArt({ ...newStreetArt, title: e.target.value })
                }
                placeholder="Titre de l'oeuvre"
                required
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

// PropTypes validation
HunterGame.propTypes = {
  handleRefresh: PropTypes.func, // Peut être fourni si nécessaire
  proof: PropTypes.func,
};
