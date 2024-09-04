import { Link } from "react-router-dom";
import "../styles/notfound.css";

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default NotFound;
