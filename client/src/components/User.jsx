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
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id} className="user">
          <h2>Pseudo: {user.pseudo}</h2>
          <p>Email: {user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default User;
