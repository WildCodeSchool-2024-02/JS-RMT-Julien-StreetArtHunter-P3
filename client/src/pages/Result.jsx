import { useEffect, useState } from "react";
import { useLogin } from "../context/LoginContext";
import resultLogo from "../assets/resultlogo.png";
import connexion from "../services/connexion";
import "../styles/result.css";

function Result() {
  const { user } = useLogin();
  const [results, setResults] = useState([]);

  const fetchUserResults = async () => {
    if (!user || !user.id) return;

    try {
      const response = await connexion.get("api/views");

      setResults(response.data);
    } catch (error) {
      console.error("There was an error fetching the street arts!", error);
    }
  };

  useEffect(() => {
    fetchUserResults();
  }, []);

  return (
    <div className="result-container">
      <img src={resultLogo} alt="Logo" className="result-logo" />
      <div className="result-content">
        <h1>Résultats</h1>
        <table className="result-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Œuvre</th>
              <th>Artiste</th>
              <th>Ville</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {results.length > 0 ? (
              results.map((result) => (
                <tr key={result.id}>
                  <td>
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${result.streetart_image}`}
                      alt={result.image_alt || "Street Art"}
                      className="result-image"
                    />
                  </td>
                  <td>{result.title}</td>
                  <td>{result.artist_name}</td>
                  <td>{result.city_name}</td>
                  <td>{new Date(result.created_at).toLocaleDateString()}</td>
                  <td>{result.status}</td>
                  <td>{result.points}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Aucun résultat trouvé.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Result;
