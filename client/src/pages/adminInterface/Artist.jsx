import { useEffect, useState } from "react";
import Modal from "react-modal";
import connexion from "../../services/connexion";
import Rows from "../../components/tables/Rows";
import Head from "../../components/tables/Head";
import DeleteModalConfirmation from "../../components/DeleteModalConfirmation";
import "../../styles/reactModal.css";
import ModalArtist from "../../components/modalArtists/ModalArtist";

Modal.setAppElement("#root");

function Artist() {
  const [artists, setArtists] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  const getArtists = () => {
    connexion
      .get("api/artists")
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching artists!", error);
      });
  };

  useEffect(() => {
    getArtists()
  }, []);

  const openModal = (artistId) => {
    setSelectedArtistId(artistId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedArtistId(null);
    setModalIsOpen(false);
  };

  const openAddModal = () => {
    setAddModalIsOpen(true);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };

  const handleDelete = () => {
    if (selectedArtistId !== null) {
      connexion
        .delete(`api/artists/${selectedArtistId}`)
        .then(() => {
          getArtists()
          closeModal();
        })
        .catch((error) => {
          console.error("There was an error deleting the artist!", error);
        });
    }
  };

  const handleRefresh = () => {
    getArtists();
    closeAddModal();
  };

  return (
    <div className="admin-table-container">
      <h1>Artistes</h1>
      <button className="button" type="submit" onClick={openAddModal}>
        Ajouter un Artist
      </button>
      <table className="admin-table">
        <thead>
        {artists[0] && <Head data={artists[0]} key={artists[0].id} />}
        </thead>
        <tbody>
        {artists.map((artist) => (
          <Rows
            data={artist}
            key={artist.id}
            handleDelete={() => openModal(artist.id)}
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
        <ModalArtist
          handleRefresh={handleRefresh}
          closeAddModal={closeAddModal}
        />
      </Modal>
    </div>
  );
}

export default Artist;
