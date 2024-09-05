import { Outlet, Navigate } from "react-router-dom";
import { useLogin } from "../../context/LoginContext";
import "../../styles/styles-pages/admin-interface.css";

function ProtectedUser() {
  const { user } = useLogin();

  if (user) {
    return <Outlet />
  }
  return <Navigate to="/" replace />;
}

export default ProtectedUser;
