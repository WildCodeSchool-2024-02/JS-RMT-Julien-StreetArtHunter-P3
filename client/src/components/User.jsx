import { useEffect, useState } from "react";
import connexion from "../services/connexion";
import "../styles/Users.css";

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
    <div className="users">
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h2>Pseudo: {user.pseudo}</h2>
          <p>Email: {user.email}</p>
          <button type="button" onClick={() => handleDelete(user.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default User;
