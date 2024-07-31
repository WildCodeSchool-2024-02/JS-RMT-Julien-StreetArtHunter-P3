import { useState } from "react";
import connexion from "../services/connexion";
import "../styles/Form-connection.css";
import "../styles/button-login.css";

function FormConnection() {
  const [connect, setConnect] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConnect((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await connexion.post("/api/login", connect);
    } catch (error) {
      console.error("There was an error connecting the user!", error);
    }
  };

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
              value={connect.email}
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
              name="password"
              value={connect.motdepasse}
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
