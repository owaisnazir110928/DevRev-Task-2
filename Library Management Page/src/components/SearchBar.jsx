import React from "react";
import "./BooksList.css";
const SearchBar = ({
  searchQuery,
  handleSearchChange,
  handleSuggestionClick,
  showSuggestions,
  searchResults,
  handleKeyPress,
}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        placeholder=" "
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
      />
      <label>Search Here</label>
      {showSuggestions && (
        <ul className="search-suggestions">
          {searchResults.map((book) => (
            <li
              key={book._id}
              onClick={() => handleSuggestionClick(book.bookName)}
            >
              {book.bookName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
