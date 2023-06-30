import React, { useState } from "react";
import "./Cart.css";

const Cart = ({ cartItems, removeFromCart, loggedIn, cartLoading }) => {
  const [newClass, setNewClass] = useState(false);
  const bookIds = cartItems.map((cartItem) => {
    return cartItem._id;
  });

  async function checkoutHandler() {
    if (cartItems.length > 0 && loggedIn) {
      try {
        const email = JSON.parse(localStorage.getItem("user")).email;
        const formData = { email, bookIds };
        const response = await fetch("http://localhost:4000/books/rent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.msg == "successfull") {
          alert("Successfully Rented Books");
          window.location.href = "/";
        } else if (data.error == "One or more books are not available") {
          alert(data.error);
        } else if (data.error == "One or more books not found") {
          alert(data.error);
        }
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  }
  return (
    <div className={`cart-container ${newClass && "expand"}`}>
      <h2 className="cart-title">
        {cartLoading && <p>Loading..</p>}
        <span>Cart</span>
        <span>Added: {cartItems.length}</span>
        <button
          className="up-arrow"
          onClick={() => {
            setNewClass(!newClass);
          }}
        >
          Toggle
        </button>
      </h2>
      {cartItems.length > 0 ? (
        <ul className="cart-items">
          {cartItems.map((item) => (
            <li key={item._id} className="cart-item">
              <div className="item-info">
                <p className="item-name">{item.bookName}</p>
              </div>
              <button
                className="remove-button"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-cart">Your cart is empty.</p>
      )}
      <button className="checkout-button" onClick={checkoutHandler}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
