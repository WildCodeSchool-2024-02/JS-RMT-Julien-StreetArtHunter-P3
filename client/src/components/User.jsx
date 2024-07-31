import { useEffect, useState } from "react";
import connexion from "../services/connexion";

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
        <thead>
          <tr>
            <th>Pseudo</th>
            <th>Email</th>
            <th>Points</th>
            <th>Created at</th>
            <th>Updated at</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.pseudo}</td>
              <td>{user.email}</td>
              <td>{user.points}</td>
              <td>{user.created_at}</td>
              <td>{user.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default User;
