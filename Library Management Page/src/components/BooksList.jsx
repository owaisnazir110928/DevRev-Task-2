import React, { useEffect, useState } from "react";
import "./BooksList.css";
import Skeleton from "./Skeleton";
import SearchBar from "./SearchBar";
import BookItem from "./BookItem";
import SortBooks from "./BookSort";
import Cart from "./Cart";
const BooksList = ({ loggedIn }) => {
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [availableBooks, setAvailableBooks] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetch(`https://task2devrev.onrender.com/books`);
        const data = await response.json();
        setAllBooks(data);
        countCopies(data); // Pass the data to the countCopies function
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const countCopies = (data) => {
    const totalAvailableCopies = data.reduce((count, book) => {
      return count + book.numOfAvailableCopies;
    }, 0);
    setAvailableBooks(totalAvailableCopies);
  };

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (page <= 5) {
          const response = await fetch(`https://task2devrev.onrender.com/books/${page}`);
          const data = await response.json();
          setBooks((prevBooks) => [...prevBooks, ...data]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);

    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, []);

  useEffect(() => {
    const searchBooks = () => {
      const results = books.filter((book) =>
        book.bookName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    };

    searchBooks();
  }, [searchQuery, books]);

  const handleSort = (sortBy) => {
    let sortedBooks = [];

    if (sortBy === "Name") {
      sortedBooks = [...searchResults].sort((a, b) =>
        a.bookName.localeCompare(b.bookName)
      );
    } else if (sortBy === "Author") {
      sortedBooks = [...searchResults].sort((a, b) =>
        a.authorName.localeCompare(b.authorName)
      );
    } else if (sortBy === "Date") {
      sortedBooks = [...searchResults].sort(
        (a, b) => a.yearOfPublishing - b.yearOfPublishing
      );
    } else if (sortBy === "Availibility") {
      sortedBooks = [...searchResults].sort(
        (a, b) => b.numOfAvailableCopies - a.numOfAvailableCopies
      );
    } else {
      sortedBooks = [...searchResults];
    }

    setSearchResults(sortedBooks);
  };
  const addToCart = (book) => {
    if (!loggedIn) {
      window.location.href = "/login";
    } else {
      const isBookInCart = cart.some((cartItem) => cartItem._id === book._id);
      if (isBookInCart) {
        return;
      } else {
        setCartLoading(true);
        setCart((prevCart) => [...prevCart, book]);
        setCartLoading(false);
      }
    }
  };

  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((book) => book._id !== bookId));
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setShowSuggestions(query.trim() !== "");
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setShowSuggestions(false);
    }
  };

  return (
    <div className="container">
      <div className="book-list">
        <h2 className="book-list__title"></h2>
        <Cart
          cartItems={cart}
          removeFromCart={removeFromCart}
          loggedIn={loggedIn}
          cartLoading={cartLoading}
        />
        <div className="sort-search">
          <SearchBar
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            handleSuggestionClick={handleSuggestionClick}
            showSuggestions={showSuggestions}
            searchResults={searchResults}
            handleKeyPress={handleKeyPress}
          />
          <SortBooks handleSort={handleSort} />
        </div>
        <div className="count">
          <p className="book-list__count">
            Searched Books: <span>{searchResults.length}</span>
          </p>
          <p className="book-list__count">
            Available Copies: <span>{availableBooks}</span>
          </p>
          <p className="book-list__count">
            Total Book Count: <span>{allBooks.length}</span>
          </p>
        </div>
        <ul className="book-list__items">
          {searchResults.map((book) => (
            <BookItem
              key={book._id}
              book={book}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              loggedIn={loggedIn}
            />
          ))}
          {loading && <Skeleton />}
        </ul>
      </div>
    </div>
  );
};

export default BooksList;
