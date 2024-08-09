import { useEffect, useState } from "react";
import Modal from "react-modal";
import connexion from "../../services/connexion";
import Rows from "../../components/tables/Rows";
import Head from "../../components/tables/Head";
import DeleteModalConfirmation from "../../components/DeleteModalConfirmation";
import "../../styles/reactModal.css";

Modal.setAppElement("#root");

function City() {
  const [cities, setCities] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState(null);

  useEffect(() => {
    connexion
      .get("api/cities")
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the city!", error);
      });
  }, []);

  const openModal = (artistId) => {
    setSelectedCityId(artistId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedCityId(null);
    setModalIsOpen(false);
  };

  const handleDelete = () => {
    if (selectedCityId !== null) {
      connexion
        .delete(`api/artists/${selectedCityId}`)
        .then(() => {
          setCities(cities.filter((city) => city.id !== selectedCityId));
          closeModal();
        })
        .catch((error) => {
          console.error("There was an error deleting the city!", error);
        });
    }
  };

  return (
    <div className="admin-table-container">
      <h1>Villes</h1>
      <table className="admin-table">
        <thead>
          {cities[0] && <Head data={cities[0]} key={cities[0].id} />}
        </thead>
        <tbody>
          {cities.map((city) => (
            <Rows
              data={city}
              key={city.id}
              handleDelete={() => openModal(city.id)}
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

export default City;
