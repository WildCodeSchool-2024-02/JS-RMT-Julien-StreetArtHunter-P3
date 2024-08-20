import { useState } from "react";
import connexion from "../services/connexion";

function FormRegister() {
  const [registerData, setRegisterData] = useState({
    pseudo: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevRegisterData) => ({
      ...prevRegisterData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (registerData.password !== registerData.password_confirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setError("");

    try {
      await connexion.post("api/register", registerData);

      setSuccess("Inscription réussie !");

      setRegisterData({
        pseudo: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
    } catch (err) {
      setError("Erreur lors de l'inscription.");
    }
  };

  return (
    <main className="form-register">
      <form onSubmit={handleSubmit}>
        <div className="user-info">
          <div className="form-input-group">
            <label htmlFor="pseudo">Pseudo</label>
            <input
              type="text"
              name="pseudo"
              id="pseudo"
              value={registerData.pseudo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={registerData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-input-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            value={registerData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input-group">
          <label htmlFor="password_confirmation">Confirmation de Mot de Passe</label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            value={registerData.password_confirmation}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <div className="register-button">
          <button className="button" type="submit">S'inscrire</button>
        </div>
      </form>
    </main>
  );
}

export default FormRegister;