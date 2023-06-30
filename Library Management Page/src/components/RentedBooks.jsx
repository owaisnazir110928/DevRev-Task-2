import React, { useEffect, useState } from "react";
import "./RentedBooks.css";

const RentedBooks = ({ loggedIn }) => {
  const [rentedBooks, setRentedBooks] = useState([]);
  const fetchBooks = async () => {
    if (loggedIn) {
      const email = JSON.parse(localStorage.getItem("user")).email;
      const formData = { email };
      try {
        const response = await fetch(`http://localhost:4000/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        setRentedBooks(data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    if (loggedIn) {
      fetchBooks();
    }
  });
  return (
    <div className="rented-books-container">
      <h2 className="rented-books-title">Rented Books</h2>
      <span className="rented-number">
        Number of Rented Books: <span>{rentedBooks.length}</span>
      </span>
      {rentedBooks.length > 0 ? (
        <ul className="rented-books-list">
          {rentedBooks.map((book) => (
            <li key={book._id} className="rented-book-item">
              <p className="rented-book-name">{book.bookName}</p>
              <p className="rented-book-author">{book.authorName}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-rented-books">No rented books.</p>
      )}
    </div>
  );
};

export default RentedBooks;
