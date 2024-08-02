import { useState } from "react";
import { useNavigate } from "react-router-dom";
import connexion from "../services/connexion";
import { useLogin } from "../context/LoginContext";
import "../styles/Form-connection.css";
import "../styles/button-login.css";

function FormConnection() {
  const [connect, setConnect] = useState({
    email: "",
    password: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const { setUser } = useLogin();
  const navigate = useNavigate();

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
      const user = await connexion.post("/api/login", connect);
      setUser(user.data);
      navigate("/");
    } catch (error) {
      console.error("There was an error connecting the user!", error);
      setConnect({ email: "", password: "" });
      setShowPopup(true);
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
              value={connect.password} // Corrected value attribute
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

      {showPopup && (
        <div className="popup-content">
          <p>Connexion impossible. Email ou Mot de passe invalide.</p>
        </div>
      )}
    </main>
  );
}

export default FormConnection;
