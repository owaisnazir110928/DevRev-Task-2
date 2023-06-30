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
        placeholder="Search books..."
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
      />
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
