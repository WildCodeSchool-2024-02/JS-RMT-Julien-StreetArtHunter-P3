import { useEffect, useState } from "react";
import Modal from "react-modal";
import connexion from "../../services/connexion";
import Rows from "../../components/tables/Rows";
import Head from "../../components/tables/Head";
import DeleteModalConfirmation from "../../components/DeleteModalConfirmation";
import ModalStreetArt from "../../components/modalStreetArts/ModalStreetArt";
import "../../styles/reactModal.css";
import "../../styles/button.css";

Modal.setAppElement("#root");

function StreetArt() {
  const [streetArts, setStreetArts] = useState([]);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [selectedStreetArtId, setSelectedStreetArtId] = useState(null);

  const getStreetArts = () => {
    connexion
      .get("api/streetarts")
      .then((response) => {
        setStreetArts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the street arts!", error);
      });
  };

  useEffect(() => {
    getStreetArts();
  }, []);

  const openDeleteModal = (streetArtId) => {
    setSelectedStreetArtId(streetArtId);
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedStreetArtId(null);
    setDeleteModalIsOpen(false);
  };

  const openAddModal = () => {
    setAddModalIsOpen(true);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };

  const handleDelete = () => {
    if (selectedStreetArtId !== null) {
      connexion
        .delete(`api/streetarts/${selectedStreetArtId}`)
        .then(() => {
          getStreetArts();
          closeDeleteModal();
        })
        .catch((error) => {
          console.error("There was an error deleting the street art!", error);
        });
    }
  };

  const handleRefresh = () => {
    getStreetArts();
    closeAddModal();
  };

  return (
    <div className="admin-table-container">
      <h1>Street Arts</h1>
      <button className="button" type="submit" onClick={openAddModal}>
        Ajouter un StreetArt
      </button>
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
              handleDelete={() => openDeleteModal(streetArt.id)}
            />
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeDeleteModal}
        className="ReactModal__Content"
        overlayClassName="ReactModal_Overlay"
        contentLabel="Delete Confirmation Modal"
      >
        <DeleteModalConfirmation
          onDelete={handleDelete}
          onCancel={closeDeleteModal}
        />
      </Modal>

      <Modal
        isOpen={addModalIsOpen}
        onRequestClose={closeAddModal}
        className="ReactModal__Content"
        overlayClassName="ReactModal_Overlay-StreetArt"
        contentLabel="Add Street Art Modal"
      >
        <ModalStreetArt
          handleRefresh={handleRefresh}
          closeAddModal={closeAddModal}
        />
      </Modal>
    </div>
  );
}

export default StreetArt;
