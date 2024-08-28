import "../styles/hunter-game.css"

function HungerGame() {


  return (
    <div className="hunger-game">
      <div className="console-background">
        {/* Boutons */}
        <div className="button-container">
          <button type="button" className="btn-left" onClick={() => window.history.back()}>
            Retour
          </button>
          <button type="button" className="btn-center-left">
            Valider
          </button>
          <button type="button" className="btn-center-right">
            Capturer
          </button>
          <button type="button" className="btn-right">
            {/* Fonctionnalité à déterminer */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HungerGame;