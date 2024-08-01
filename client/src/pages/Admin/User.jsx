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

  const handleDelete = (userId) => {
    connexion
      .delete(`api/users/${userId}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };

  return (
    <div className="admin-table-container">
      <h1>Users</h1>
      <table className="admin-table">
        <thead>{users[0] && <Head data={users[0]} key={users[0].id} />}</thead>
        <tbody>
          {users.map((user) => (
            <Rows data={user} key={user.id} handleDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default User;
