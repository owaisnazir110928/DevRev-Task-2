
import React, { useState } from "react";
import "./AuthForm.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = { name, email, password, mobileNumber };
    setIsLoading(true); // Set loading state to true

    try {
      const response = await fetch("https://task2devrev.onrender.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.msg === "saved") {
        alert("User Registered You Can Now Log In");
        window.location.href = "/#/login";
      } else if (data.error) {
        alert("User Already Present");
        window.location.href = "/#/login";
      }

      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="main-container">
      <div className="auth-form-container">
        <h2>Signup</h2>
        <form className="auth-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Signup"}
          </button>
        </form>
        <div className="auth-form-footer">
          <p>Signup with:</p>
          <div className="auth-form-third-party">
            <button>Google</button>
            <button>Facebook</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
