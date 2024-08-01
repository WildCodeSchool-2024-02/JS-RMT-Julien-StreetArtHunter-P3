import { Link } from "react-router-dom";
import "../styles/nav-admin.css";

function NavAdmin() {
  return (
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
  );
}

export default NavAdmin;
