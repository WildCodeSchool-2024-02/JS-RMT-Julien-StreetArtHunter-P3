import { useEffect, useState } from "react";
import Modal from "react-modal";
import connexion from "../../services/connexion";
import Rows from "../../components/tables/Rows";
import Head from "../../components/tables/Head";
import DeleteModalConfirmation from "../../components/DeleteModalConfirmation";
import "../../styles/reactModal.css";

Modal.setAppElement("#root");

function Artist() {
  const [artists, setArtists] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedArtistId, setSelectedArtistId] = useState(null);

  useEffect(() => {
    connexion
      .get("api/artists")
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the artist!", error);
      });
  }, []);

  const openModal = (artistId) => {
    setSelectedArtistId(artistId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedArtistId(null);
    setModalIsOpen(false);
  };

  const handleDelete = () => {
    if (selectedArtistId !== null) {
      connexion
        .delete(`api/artists/${selectedArtistId}`)
        .then(() => {
          setArtists(
            artists.filter((artist) => artist.id !== selectedArtistId)
          );
          closeModal();
        })
        .catch((error) => {
          console.error("There was an error deleting the artist!", error);
        });
    }
  };

  return (
    <div className="admin-table-container">
      <h1>Artistes</h1>
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
    </div>
  );
}

export default Artist;
