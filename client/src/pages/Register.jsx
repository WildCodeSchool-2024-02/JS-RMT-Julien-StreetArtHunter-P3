import FormRegister from "../components/FormRegister";
import logo from "../assets/logo.png";
import "../styles/form-register.css";

function Register() {
  return (
    <div className="register-connexion">
      <img src={logo} alt="logo" />
      <h2>Inscription</h2>
      <FormRegister />
    </div>
  );
}

export default Register;
