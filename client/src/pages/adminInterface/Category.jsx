import { useEffect, useState } from "react";
import Modal from "react-modal";
import connexion from "../../services/connexion";
import Rows from "../../components/tables/Rows";
import Head from "../../components/tables/Head";
import DeleteModalConfirmation from "../../components/DeleteModalConfirmation";
import "../../styles/reactModal.css";

Modal.setAppElement("#root");

function Category() {
  const [categories, setCategories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    connexion
      .get("api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the category!", error);
      });
  }, []);

  const openModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedCategoryId(null);
    setModalIsOpen(false);
  };
  const handleDelete = () => {
    if (selectedCategoryId !== null) {
      connexion
        .delete(`api/categories/${selectedCategoryId}`)
        .then(() => {
          setCategories(
            categories.filter((category) => category.id !== selectedCategoryId)
          );
          closeModal();
        })
        .catch((error) => {
          console.error("There was an error deleting the user!", error);
        });
    }
  };

  return (
    <div className="admin-table-container">
      <h1>Categories</h1>
      <table className="admin-table">
        <thead>
          {categories[0] && (
            <Head data={categories[0]} key={categories[0].id} />
          )}
        </thead>
        <tbody>
          {categories.map((category) => (
            <Rows
              data={category}
              key={category.id}
              handleDelete={() => openModal(category.id)}
            />
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="ReactModal__Content"
        overlayClassName="ReactModal_Overlay"
        contentLabel="Confirmation Modal"
      >
        <DeleteModalConfirmation
          onDelete={handleDelete}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}

export default Category;
