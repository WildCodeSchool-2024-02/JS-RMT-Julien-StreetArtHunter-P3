import { Link } from 'react-router-dom';
import '../styles/header.css';
import '../styles/button-login.css';
import logo from "../assets/logo.png";

function Header() {
  return (
    <header className="header">
      <Link to="/home" className="logo">
        <img src= {logo} alt="logo" className="logo"/>
      </Link>
      <nav className="navigation">
        <Link to="/gallery" className="button.login">Galerie</Link>
        <Link to="/login" className="button.login">Connexion</Link>
      </nav>
    </header>
  );
}

export default Header;
