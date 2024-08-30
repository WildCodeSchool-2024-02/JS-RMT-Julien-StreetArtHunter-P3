import { Outlet, Navigate } from "react-router-dom";
import NavAdmin from "../../components/NavAdmin";
import { useLogin } from "../../context/LoginContext";
import "../../styles/styles-pages/admin-interface.css";

function Admin() {
  const { user } = useLogin();

  if (user && user.is_admin) {
    return (
      <div className="admin-container">
        <NavAdmin />
        <Outlet />
      </div>
    );
  }
  return <Navigate to="/" replace />;
}

export default Admin;
