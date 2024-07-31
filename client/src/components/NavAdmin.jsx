import { Link } from "react-router-dom";
import "../styles/nav-admin.css";

function NavAdmin() {
  return (
    <nav className="action-buttons">
      <Link to="/User" className="nav-button">
        Utilisateurs
      </Link>
      <Link to="/StreetArt" className="nav-button">
        Street Arts
      </Link>
      <Link to="/Artist" className="nav-button">
        Artistes
      </Link>
      <Link to="/Category" className="nav-button">
        Catégories
      </Link>
    </nav>
  );
}

export default NavAdmin;
