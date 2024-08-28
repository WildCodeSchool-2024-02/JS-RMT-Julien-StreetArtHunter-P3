import "../styles/searchBar.css";
import { useState } from "react";
import PropTypes from "prop-types";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Entrez une ville..."
        className="search-input"
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit" className="search-button">
        Rechercher
      </button>
    </form>
  );
}

// Validation des props avec PropTypes
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
