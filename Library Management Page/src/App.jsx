import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import BooksList from "./components/BooksList";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import RentedBooks from "./components/RentedBooks";
import Popup from "./components/Popup";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedObject = JSON.parse(localStorage.getItem("user"));
    if (storedObject) {
      setLoggedIn(true);
    }

    const popupShown = localStorage.getItem("popupShown");
    if (!popupShown) {
      setShowPopup(true);
      localStorage.setItem("popupShown", "true");
    }
  }, []);

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Navbar loggedIn={loggedIn} />
      {showPopup && (
        <Popup onClose={() => setShowPopup(false)}/>
      )}
      <Routes>
        <Route exact path="/" element={<BooksList loggedIn={loggedIn} />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route
          path="/rentedbooks"
          element={<RentedBooks loggedIn={loggedIn} />}
        />
        <Route path="/newuser" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
