import { Outlet } from "react-router-dom";
import NavAdmin from "../../components/NavAdmin";
import "../../styles/styles-pages/Admin.css";

function Admin() {
  return (
    <div className="admin-container">
      <NavAdmin />
      <Outlet />
    </div>
  );
}

export default Admin;
