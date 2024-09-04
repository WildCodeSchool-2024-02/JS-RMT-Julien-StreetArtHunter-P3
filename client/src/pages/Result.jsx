import { useEffect, useState } from "react";
import { useLogin } from "../context/LoginContext";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "validé":
        return "status-validated";
      case "refusé":
        return "status-rejected";
      case "en attente":
        return "status-pending";
      default:
        return "";
    }
  };

  return (
    <div className="result-container">
      <div className="result-content">
        <table className="result-table">
          <thead className="head-table-result">
            <tr>
              <th>Votre image</th>
              <th>Image Reference</th>
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
                  <td className="td-result-image">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${result.streetart_image}`}
                      alt={result.image_alt || "Street Art"}
                      className="result-image"
                    />
                  </td>
                  <td className="td-result-image">
                    <img
                      src={result.proof_image}
                      alt={result.image_alt || "Street Art"}
                      className="result-image"
                    />
                  </td>
                  <td>{result.title}</td>
                  <td>{result.artist_name}</td>
                  <td>{result.city_name}</td>
                  <td>{new Date(result.created_at).toLocaleDateString()}</td>
                  <td className={getStatusClass(result.status)}>
                    {result.status}
                  </td>
                  <td>{result.points}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">Aucun résultat trouvé.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Result;
