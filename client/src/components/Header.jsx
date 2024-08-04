import { Link } from "react-router-dom";
import "../styles/header.css";
import "../styles/button.css";
import logo from "../assets/logo.png";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <nav className="navigation">
        <Link to="/gallery">
          <p className="button">Galerie</p>
        </Link>
        <Link to="/login">
          <p className="button">Connexion</p>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
