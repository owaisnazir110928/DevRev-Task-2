import React from "react";
import "./BooksList.css";

const BookItem = ({ book, addToCart, removeFromCart, loggedIn }) => {
  return (
    <li key={book._id} className="book-list__item">
      <div
        className="book-list__status"
        style={{
          backgroundColor: book.numOfAvailableCopies > 0 ? "Green" : "Red",
        }}
      >
        {book.numOfAvailableCopies > 0 ? "Available" : "Unavailable"}
      </div>
      <div className="book-list__button_container">
        <h3>{book.bookName}</h3>
        <p>
          <span>Author:</span> {book.authorName}
        </p>
        <p>
          <span>Subject:</span> {book.genre}
        </p>
        <p>
          <span>Year of Publishing:</span> {book.yearOfPublishing}
        </p>
        <p>
          <span>Number of Copies:</span> {book.numOfAvailableCopies}
        </p>
        {book.numOfAvailableCopies > 0 ? (
          <button className="book-list__button" onClick={() => addToCart(book)}>
            {loggedIn && <span>Add to Cart</span>}
            {!loggedIn && <span>Login First</span>}
          </button>
        ) : (
          <button className="book-list__button" disabled>
            Unavailable
          </button>
        )}
      </div>
      <img
        src={book.imageLink}
        alt={book.bookName}
        className="book-list__image"
      />
    </li>
  );
};

export default BookItem;
