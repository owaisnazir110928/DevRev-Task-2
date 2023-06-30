import React from "react";
import "./BooksList.css";
function Skeleton() {
  const numberOfItems = 4;
  return (
    <ul className="book-list__items">
      {Array.from({ length: numberOfItems }, (_, index) => (
        <li className="skeleton-item" key={index}>
          <div className="book-list__button_container">
            <h3 className="skeleton skeleton-text"></h3>
            <p className="skeleton skeleton-text"></p>
            <p className="skeleton skeleton-text"></p>
            <p className="skeleton skeleton-text"></p>
            <button className="skeleton skeleton-button"></button>
          </div>
          <div className="skeleton skeleton-image" />
        </li>
      ))}
    </ul>
  );
}

export default Skeleton;
