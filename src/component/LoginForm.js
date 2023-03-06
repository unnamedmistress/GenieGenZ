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
      console.log("response : " + response);
      console.log("response.ok : " + response.ok)
      if (response.ok) {
        props.onLogin();
      } else {
        throw new Error("HTTP error " + response.status);
      }
    } catch (error) {
      console.error("client side:" + error);
      alert("Error logging in" + error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          placeholder="user1"
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          placeholder="password1"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Log in</button>
      <button type="button" onClick={props.onSignupClick}>
        Sign up
      </button>
    </form>
  );
}

export default LoginForm;
