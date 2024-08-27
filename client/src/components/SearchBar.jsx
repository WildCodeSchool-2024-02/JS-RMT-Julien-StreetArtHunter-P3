import "../styles/searchBar.css";

function SearchBar() {
  return (
    <form className="search-form">
      <input
        type="text"
        placeholder="Entrez une ville..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        Rechercher
      </button>
    </form>
  );
}

export default SearchBar;
