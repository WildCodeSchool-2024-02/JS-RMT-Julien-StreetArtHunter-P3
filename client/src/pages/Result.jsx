import "../styles/result.css";
import resultLogo from "../assets/resultlogo.png";

function Result() {
  return (
    <div className="result-container">
      <img src={resultLogo} alt="Logo" className="result-logo" />
      <div className="result-content">
        <h1>Résultats</h1>
        <table className="result-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Ville</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>image</td>
              <td>Paris</td>
              <td>01/01/2024</td>
              <td>Complété</td>
              <td>100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Result;
