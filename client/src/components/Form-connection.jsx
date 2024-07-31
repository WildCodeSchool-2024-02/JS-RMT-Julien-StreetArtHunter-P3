import { useState, useEffect } from "react";
import connexion from "../services/connexion";
import "../styles/Form-connection.css";
import "../styles/button-login.css";

function FormConnection() {
  const [formData, setFormData] = useState({
    email: "",
    motdepasse: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    connexion
      .get("api/users")
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  return (
    <main className="form-connection">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Mot de Passe
            <input
              type="password"
              placeholder="Mot de passe"
              name="motdepasse"
              value={formData.motdepasse}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="box-button">
          <button className="button" type="submit">
            Se Connecter
          </button>
        </div>
      </form>
    </main>
  );
}

export default FormConnection;
