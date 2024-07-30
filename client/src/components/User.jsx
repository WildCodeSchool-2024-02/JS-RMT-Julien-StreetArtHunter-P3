import { useEffect, useState } from "react";
import connexion from "../services/connexion";
import "../styles/Users.css";

function User() {
  const [users, setUsers] = useState([]);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [editingUser, setEditingUser] = useState(null);

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

  const handleDelete = async (userId) => {
    await connexion
      .delete(`api/users/${userId}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };
  const handleAdd = async (event) => {
    event.preventDefault();
    const newUser = { pseudo, email };

    await connexion
      .post("/api/users", newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setPseudo("");
        setEmail("");
      })
      .catch((error) => {
        console.error("There was an error adding the user!", error);
      });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const updatedUser = { pseudo, email };

    await connexion
      .put(`/api/users/${editingUser.id}`, updatedUser)
      .then(() => {
        setUsers(
          users.map((user) =>
            user.id === editingUser.id ? { ...user, ...updatedUser } : user
          )
        );
        setEditingUser(null);
        setPseudo("");
        setEmail("");
      })
      .catch((error) => {
        console.error("There was an error updating the user!", error);
      });
  };

  const startEditing = (user) => {
    setEditingUser(user);
    setPseudo(user.pseudo);
    setEmail(user.email);
  };
  return (
    <div className="users">
      <h1>Users</h1>

      {/* Form to add a new user */}
      <form onSubmit={editingUser ? handleUpdate : handleAdd}>
        <input
          type="text"
          placeholder="Pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">
          {editingUser ? "Update User" : "Add User"}
        </button>
      </form>

      {/* List of users */}
      {users.map((user) => (
        <div key={user.id}>
          <h2>Pseudo: {user.pseudo}</h2>
          <p>Email: {user.email}</p>
          <button type="button" onClick={() => handleDelete(user.id)}>
            Delete
          </button>
          <button type="button" onClick={() => startEditing(user.id)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}
export default User;
