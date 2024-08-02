import { Outlet } from "react-router-dom";
import "../../styles/styles-pages/admin.css";

function Admin() {
  return (
    <>
      <nav>Ma nav d'admin</nav>
      <Outlet />
    </>
  );
}

export default Admin;
