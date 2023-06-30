import React, { useState } from "react";
import "./AuthForm.css";

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = { email, password };
    setIsLoading(true); // Set loading state to true

    try {
      const response = await fetch("https://task2devrev.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.msg === "successfull") {
        localStorage.setItem("user", JSON.stringify(data.userData));
        setLoggedIn(true);
        window.location.href = "/";
      } else if (data.error === "Invalid password") {
        alert("Invalid Password");
      } else if (data.error === "User not found") {
        alert("User Not Found Register First");
        window.location.href = "/#/newuser";
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
        <h2>Login</h2>
        <form className="auth-form" onSubmit={handleLogin}>
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="auth-form-footer">
          {/* Third-party login options */}
          <p>Login with:</p>
          <div className="auth-form-third-party">
            {/* Include your third-party login buttons here */}
            <button>Google</button>
            <button>Facebook</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
