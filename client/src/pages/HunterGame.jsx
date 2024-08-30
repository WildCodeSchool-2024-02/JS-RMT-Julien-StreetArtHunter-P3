import { useState } from "react";
import "../styles/hunter-game.css";

export default function HunterGame() {
  const [capturedImage, setCapturedImage] = useState(null);
  const handleCapture = () => {
    const simulatedImageUrl =
      "https://i0.wp.com/artosoir.fr/wp-content/uploads/2021/02/P2130108.jpg?w=660&ssl=1";

    setCapturedImage(simulatedImageUrl);
  };

  return (
    <div className="hunter-game-background">
      <div className="screen-container">
        {/* <div className="screen"> */}
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
        <button type="button" onClick={handleCapture} className="capture-btn">
          Capturer
        </button>
      </div>
      <div className="button-down-container">
        <button type="button" className="valid-btn">
          Valider
        </button>
      </div>
    </div>
  );
}
