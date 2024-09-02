import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import "../styles/button.css";
import logo from "../assets/logo.png";
import { useLogin } from "../context/LoginContext";
import BackButton from "./BackButton";

function Header() {
  const { user, setUser } = useLogin();
  const navigate = useNavigate();

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
        <BackButton />
        <Link to="/gallery" className="button">
          Galerie
        </Link>
        {user ? (
          <button type="button" className="button" onClick={handleLogout}>
            Déconnexion
          </button>
        ) : (
          <>
            <Link to="/login" className="button">
              Connexion
            </Link>
            <Link to="/register" className="button">
              Inscription
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
