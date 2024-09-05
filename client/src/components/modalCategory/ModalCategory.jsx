import { useState } from "react";
import PropTypes from "prop-types";
import connexion from "../../services/connexion";
import ModalButton from "../modalShared/ModalButton";

function ModalCategory({ handleRefresh, closeAddModal }) {
  const [newCategory, setNewCategory] = useState({
    title: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    connexion
      .post("api/categories", newCategory)
      .then(() => {
        handleRefresh();
      })
      .catch((error) => {
        console.error("There was an error adding a new Category!", error);
      });
  };

  return (
    <div>
      <h2>Ajouter une nouvelle Categorie</h2>
      <form onSubmit={handleAddSubmit}>
        <input
          type="text"
          aria-label="title"
          name="title"
          placeholder="titre"
          value={newCategory.name}
          onChange={handleInputChange}
          required
        />
        <ModalButton closeAddModal={closeAddModal} label="nouvelle categorie" />
      </form>
    </div>
  );
}

ModalCategory.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
  closeAddModal: PropTypes.func.isRequired,
};

export default ModalCategory;
