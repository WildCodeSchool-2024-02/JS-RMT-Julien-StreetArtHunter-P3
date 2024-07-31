import { Link } from "react-router-dom";
import "../styles/header.css";
import "../styles/button-login.css";
import logo from "../assets/logo.png";

function Header() {
  return (
    <header className="header">
      <Link to="/home" className="logo">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <nav className="navigation">
        <Link to="/gallery">
          <button type="button" className="button-login">
          Galerie
          </button>
        </Link>
        <Link to="/login">
          <button type="button" className="button-login">
          Connexion
          </button>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
