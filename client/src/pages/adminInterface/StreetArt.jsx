import { useEffect, useState } from "react";
import Modal from "react-modal";
import connexion from "../../services/connexion";
import Rows from "../../components/tables/Rows";
import Head from "../../components/tables/Head";
import DeleteModalConfirmation from "../../components/DeleteModalConfirmation";
import "../../styles/reactModal.css";

Modal.setAppElement("#root");

function StreetArt() {
  const [streetArts, setstreetArts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    connexion
      .get("api/streetarts")
      .then((response) => {
        setstreetArts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  const openModal = (userId) => {
    setSelectedUserId(userId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setModalIsOpen(false);
  };

  const handleDelete = () => {
    if (selectedUserId !== null) {
      connexion
        .delete(`api/users/${selectedUserId}`)
        .then(() => {
          setstreetArts(
            streetArts.filter((user) => user.id !== selectedUserId)
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
      <h1>streetArts</h1>
      <table className="admin-table">
        <thead>
          {streetArts[0] && (
            <Head data={streetArts[0]} key={streetArts[0].id} />
          )}
        </thead>
        <tbody>
          {streetArts.map((streetArt) => (
            <Rows
              data={streetArt}
              key={streetArt.id}
              handleDelete={() => openModal(streetArt.id)}
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

export default StreetArt;
