import { useEffect, useState } from "react";
import Modal from "react-modal";
import connexion from "../../services/connexion";
import Rows from "../../components/tables/Rows";
import Head from "../../components/tables/Head";
import DeleteModalConfirmation from "../../components/DeleteModalConfirmation";
import ModalUser from "../../components/modaluser/ModalUser";
import "../../styles/reactModal.css";

Modal.setAppElement("#root");

function User() {
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  const getUsers = () => {
    connexion
      .get("api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const openModal = (userId) => {
    setSelectedUserId(userId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setModalIsOpen(false);
  };

  const openAddModal = () => {
    setAddModalIsOpen(true);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };

  const handleDelete = () => {
    if (selectedUserId !== null) {
      connexion
        .delete(`api/users/${selectedUserId}`)
        .then(() => {
          setUsers(users.filter((user) => user.id !== selectedUserId));
          closeModal();
          getUsers();
        })
        .catch((error) => {
          console.error("There was an error deleting the user!", error);
        });
    }
  };
  const handleRefresh = () => {
    getUsers();
    closeAddModal();
  };

  return (
    <div className="admin-table-container">
      <h1>Users</h1>
      <button className="button" type="submit" onClick={openAddModal}>
        Ajouter un Utilisateur
      </button>
      <table className="admin-table">
        <thead>{users[0] && <Head data={users[0]} key={users[0].id} />}</thead>
        <tbody>
          {users.map((user) => (
            <Rows
              data={user}
              key={user.id}
              handleDelete={() => openModal(user.id)}
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
      <Modal
        isOpen={addModalIsOpen}
        onRequestClose={closeAddModal}
        className="ReactModal__Content"
        overlayClassName="ReactModal_Overlay-StreetArt"
        contentLabel="Add Street Art Modal"
      >
        <ModalUser
          handleRefresh={handleRefresh}
          closeAddModal={closeAddModal}
        />
      </Modal>
    </div>
  );
}

export default User;
