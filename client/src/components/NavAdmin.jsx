import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/nav-admin.css";

function NavAdmin() {
  return (
    <div className="nav-bar-container">
      <Link to="/" className="logo-nav">
        <img src={logo} alt="logo" className="logo-nav" />
      </Link>
      <nav className="action-buttons">
        <Link to="/admin/users" className="nav-button">
          Utilisateurs
        </Link>
        <Link to="/admin/streetarts" className="nav-button">
          Street Arts
        </Link>
        <Link to="/admin/artists" className="nav-button">
          Artistes
        </Link>
        <Link to="/admin/categories" className="nav-button">
          Catégories
        </Link>
      </nav>
    </div>
  );
}

export default NavAdmin;
