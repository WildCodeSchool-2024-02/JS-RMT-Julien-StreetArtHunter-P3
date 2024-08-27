import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import "../styles/button.css";
import logo from "../assets/logo.png";
import { useLogin } from "../context/LoginContext";


function Header() {
  // Récupère les infos du context
  const { user, setUser } = useLogin();
  const navigate = useNavigate();

  // Fonction handleLogout qui reset le user (null) et navigate vers la page principale
  const handleLogout = () => {
    setUser(null);
    navigate("/street-arts");
  };
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <nav className="navigation">
        <Link to="/gallery" className="button">
          Galerie
        </Link>
        {!user &&
          <Link to="/login" className="button">
            Connexion
          </Link>}
        <Link to="/register" className="button">
          Inscription
        </Link>
        {user &&
          <button type="button" className="button" onClick={handleLogout}>
            Déconnexion
          </button>}
      </nav>
    </header>
  );
}

export default Header;
