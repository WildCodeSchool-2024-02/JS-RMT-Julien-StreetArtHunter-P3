import { Link } from "react-router-dom";
import FormRegister from "../components/FormRegister";
import logo from "../assets/logo.png";
import "../styles/form-register.css";

function Register() {
  return (
    <>
      <div className="head-register">
        <Link to="/street-arts" className="logo">
          <img src={logo} alt="logo" className="register-logo" />
        </Link>
      </div>
      <div className="register-connexion">
        <h2>Inscription</h2>
        <FormRegister />
      </div>
    </>
  );
}

export default Register;
