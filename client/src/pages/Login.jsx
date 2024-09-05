import FormConnection from "../components/FormConnection";
import logo from "../assets/logo.png";

import "../styles/form-connection.css";

function Login() {
  return (
    <>
      <div className="head-login">
        <img src={logo} alt="logo" className="login-logo" />
      </div>
      <div className="login-connexion">
        <h2>Connexion</h2>
        <FormConnection />
      </div>
    </>
  );
}

export default Login;
