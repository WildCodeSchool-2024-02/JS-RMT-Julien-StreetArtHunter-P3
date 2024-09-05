import { useEffect, useState } from "react";
import Modal from "react-modal";
import connexion from "../../services/connexion";
import Rows from "../../components/tables/Rows";
import Head from "../../components/tables/Head";
import DeleteModalConfirmation from "../../components/DeleteModalConfirmation";
import ModalCity from "../../components/modalCity/ModalCity";
import "../../styles/reactModal.css";

Modal.setAppElement("#root");

function City() {
  const [cities, setCities] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  const getCities = () => {
    connexion
      .get("api/cities")
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the city!", error);
      });
  };

  useEffect(() => {
    getCities();
  }, []);

  const openModal = (cityId) => {
    setSelectedCityId(cityId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedCityId(null);
    setModalIsOpen(false);
  };

  const openAddModal = () => {
    setAddModalIsOpen(true);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };
  const handleDelete = () => {
    if (selectedCityId !== null) {
      connexion
        .delete(`api/cities/${selectedCityId}`)
        .then(() => {
          setCities(cities.filter((city) => city.id !== selectedCityId));
          closeModal();
        })
        .catch((error) => {
          console.error("There was an error deleting the city!", error);
        });
    }
  };

  const handleRefresh = () => {
    getCities();
    closeAddModal();
  };

  return (
    <div className="admin-table-container">
      <h1>Villes</h1>
      <button className="button" type="submit" onClick={openAddModal}>
        Ajouter une Ville
      </button>
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
      <Modal
        isOpen={addModalIsOpen}
        onRequestClose={closeAddModal}
        className="ReactModal__Content"
        overlayClassName="ReactModal_Overlay-StreetArt"
        contentLabel="Add Street Art Modal"
      >
        <ModalCity
          handleRefresh={handleRefresh}
          closeAddModal={closeAddModal}
        />
      </Modal>
    </div>
  );
}

export default City;
