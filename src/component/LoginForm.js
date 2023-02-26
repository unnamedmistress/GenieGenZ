import React, { useState } from "react";
import axios from "axios";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/login", { username, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      props.onLogin();
    } catch (error) {
      console.error(error);
      alert("Error logging in");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Log in</button>
      <button type="button" onClick={props.onSignupClick}>Sign up</button>
    </form>
  );
}

export default LoginForm;
