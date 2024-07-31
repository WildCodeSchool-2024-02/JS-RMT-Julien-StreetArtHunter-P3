import { useEffect, useState } from "react";
import connexion from "../../services/connexion";

import Rows from "../../components/Table/Rows";
import Head from "../../components/Table/Head";

function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    connexion
      .get("api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  return (
    <div className="admin-table-container">
      <h1>Users</h1>
      <table className="admin-table">
        <thead>{users[0] && <Head data={users[0]} key={users[0].id} />}</thead>
        <tbody>
          {users.map((user) => (
            <Rows data={user} key={user.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default User;
