import { useEffect, useState } from "react";
import Modal from "react-modal";
import connexion from "../../services/connexion";
import Rows from "../../components/tables/Rows";
import Head from "../../components/tables/Head";
import DeleteModalConfirmation from "../../components/DeleteModalConfirmation";
import "../../styles/reactModal.css";
import "../../styles/button.css";

Modal.setAppElement("#root");

function StreetArt() {
  const [streetArts, setStreetArts] = useState([]);
  const [cities, setCities] = useState([]);
  const [artistes, setArtistes] = useState([]);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [selectedStreetArtId, setSelectedStreetArtId] = useState(null);
  const [newStreetArt, setNewStreetArt] = useState({
    title: "",
    description: "",
    geolocation_x: "",
    geolocation_y: "",
    image_url: "",
    image_alt: "",
    points: "",
    created_at: "",
    city_name: "",
    artist_name: "",
  });

  const getCities = () => {
    connexion
      .get("api/cities")
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the cities!", error);
      });
  };

  const getArtists = () => {
    connexion
      .get("api/artists")
      .then((response) => {
        setArtistes(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the artist!", error);
      });
  };

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
    getArtists();
    getCities();
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
    setNewStreetArt({
      title: "",
      description: "",
      geolocation_x: "",
      geolocation_y: "",
      image_url: "",
      image_alt: "",
      points: "",
      created_at: "",
      city_name: "",
      artist_name: "",
    });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStreetArt((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    connexion
      .post("api/streetarts", newStreetArt)
      .then(() => {
        getStreetArts();
        closeAddModal();
      })
      .catch((error) => {
        console.error("There was an error adding the new street art!", error);
      });
  };

  return (
    <div className="admin-table-container">
      <h1>Street Arts</h1>
      <button className="button" type="submit" onClick={openAddModal}>
        Ajouter StreetArt
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
        <h2>Ajouter un nouveau StreetArt</h2>
        <form onSubmit={handleAddSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Titre"
            value={newStreetArt.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newStreetArt.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="geolocation_x"
            placeholder="Geolocalisation X"
            value={newStreetArt.geolocation_x}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="geolocation_y"
            placeholder="Geolocalisation Y"
            value={newStreetArt.geolocation_y}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={newStreetArt.image_url}
            onChange={handleInputChange}
            required
          />
          <select
            name="city_id"
            value={newStreetArt.city_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Selectionne une ville</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>

          <select
            name="artist_id"
            value={newStreetArt.artist_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Selectionne un artiste</option>
            {artistes.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
          <button type="submit">Ajouter StreetArt</button>
          <button type="button" onClick={closeAddModal}>
            Annuler
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default StreetArt;
