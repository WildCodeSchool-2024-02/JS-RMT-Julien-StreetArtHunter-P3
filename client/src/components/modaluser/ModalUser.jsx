import { useState } from "react";
import PropTypes from "prop-types";
import connexion from "../../services/connexion";
import ModalButton from "../modalShared/ModalButton";


function ModalUser({ handleRefresh, closeAddModal }) {
  const [newUser, setNewUser] = useState({
    pseudo: "",
    email: "",
    password: "",
    is_admin: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    connexion
      .post("api/users", newUser)
      .then(() => {
        handleRefresh();
      })
      .catch((error) => {
        console.error("There was an error adding the new users!", error);
      });
  };

  return (
    <div>
      <h2>Ajouter un nouveau Uilisateur</h2>
      <form onSubmit={handleAddSubmit}>
        <input
          type="text"
          name="pseudo"
          placeholder="pseudo"
          value={newUser.pseudo}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={newUser.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={newUser.password}
          onChange={handleInputChange}
          required
        />
        <label>
          Admin:
          <input
            type="checkbox"
            name="is_admin"
            checked={newUser.is_admin}
            onChange={(e) =>
              setNewUser((prevState) => ({
                ...prevState,
                is_admin: e.target.checked,
              }))
            }
          />
        </label>
        <ModalButton closeAddModal={closeAddModal} />
      </form>
    </div>
  );
}

ModalUser.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
  closeAddModal: PropTypes.func.isRequired,
};

export default ModalUser;
