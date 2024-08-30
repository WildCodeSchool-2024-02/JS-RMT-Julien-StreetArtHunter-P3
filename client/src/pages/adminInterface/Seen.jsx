import { useEffect, useState } from "react";
import Modal from "react-modal";
import connexion from "../../services/connexion";
import Rows from "../../components/tables/Rows";
import Head from "../../components/tables/Head";
import "../../styles/reactModal.css";

Modal.setAppElement("#root");

function Seen() {
  const [views, setViews] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [setSelectedViewsId] = useState(null);

  useEffect(() => {
    connexion
      .get("api/views")
      .then((response) => {
        setViews(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the category!", error);
      });
  }, []);

  const openModal = (seenId) => {
    setSelectedViewsId(seenId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedViewsId(null);
    setModalIsOpen(false);
  };

  return (
    <div className="admin-table-container">
      <h1>Views</h1>
      <table className="admin-table">
        <thead>{views[0] && <Head data={views[0]} key={views[0].id} />}</thead>
        <tbody>
          {views.map((seen) => (
            <Rows
              data={seen}
              key={seen.id}
              handleDelete={() => openModal(seen.id)}
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
      />
    </div>
  );
}

export default Seen;
