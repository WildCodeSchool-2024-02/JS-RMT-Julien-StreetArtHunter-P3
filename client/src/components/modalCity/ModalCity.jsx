import { useState } from "react";
import PropTypes from "prop-types";
import connexion from "../../services/connexion";
import ModalButton from "../modalShared/ModalButton";

function ModalCity({ handleRefresh, closeAddModal }) {
  const [newCity, setNewCity] = useState({
    name: "",
    points: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    connexion
      .post("api/cities", newCity)
      .then(() => {
        handleRefresh();
      })
      .catch((error) => {
        console.error("There was an error adding a new city!", error);
      });
  };

  return (
    <div>
      <h2>Ajouter une nouvellle ville</h2>
      <form onSubmit={handleAddSubmit}>
        <input
          type="text"
          aria-label="name"
          name="name"
          placeholder="name"
          value={newCity.name}
          onChange={handleInputChange}
          required
        />

        <input
          type="number"
          aria-label="points"
          name="points"
          placeholder="Points"
          value={newCity.points}
          onChange={handleInputChange}
        />
        <ModalButton closeAddModal={closeAddModal} label="nouvelle ville" />
      </form>
    </div>
  );
}

ModalCity.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
  closeAddModal: PropTypes.func.isRequired,
};

export default ModalCity;
