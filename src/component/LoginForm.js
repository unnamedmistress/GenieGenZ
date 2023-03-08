import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "/api/login";
    console.log("Sending POST request to:", url);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
     console.log(response);
      console.log("response.ok : " + response.ok)
      if (response.ok) {
        props.onLogin();
      } else {
        console.log( username + " : " + password)
        throw new Error("HTTP error " + response.status);
      }
    } catch (error) {
      console.error("client side: " + error + " " + error.message);
      alert("Error logging in " + error );
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome to Tutor Genie!</h1>
      <p style={{ textAlign: "center" }}>To demo, login as username: user1, password: password1 or SignUp </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            placeholder="user1"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            placeholder="password1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mr-2">Log in</button>
        <button type="button" className="btn btn-secondary" onClick={props.onSignupClick}>
          Sign up
        </button>
      </form>
    </div>
  );
}

export default LoginForm