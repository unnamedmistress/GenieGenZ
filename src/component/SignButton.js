import React from "react";
import { Link } from "react-router-dom";

export function LoginButton(props) {
  return (
    <button onClick={props.onClick}>Log in</button>
  );
}

export function SignupButton() {
  return (
    <Link to="/signup">
      <button>Sign up</button>
    </Link>
  );
}
