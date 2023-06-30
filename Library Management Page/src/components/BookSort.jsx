import React, { useState } from "react";
import "./BookSort.css";

const SortBooks = ({ handleSort }) => {
  const [sortBy, setSortBy] = useState("");

  const handleSortChange = (event) => {
    const selectedSortBy = event.target.value;
    setSortBy(selectedSortBy);
    handleSort(selectedSortBy);
  };

  return (
    <div className="sort-books-container">
      <label htmlFor="sort-select" className="sort-books-label">
        Sort By: 
      </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={handleSortChange}
        className="sort-books-select"
      >
        <option value="">Sort By</option>
        <option value="Name">Name</option>
        <option value="Author">Author</option>
        <option value="Date">Date</option>
        <option value="Availibility">Availability</option>
      </select>
    </div>
  );
};

export default SortBooks;
