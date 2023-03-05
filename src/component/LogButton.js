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

export function AuthButtonsLog(props) {
  const { isLoggedIn, handleLogin, handleSignupClick, handleLogout } = props;

  if (isLoggedIn) {
    return (
      <button onClick={handleLogout}>Log out</button>
    );
  } else {
    return (
      <>
        <LoginButton onClick={handleLogin} />
        <SignupButton onClick={handleSignupClick} />
      </>
    );
  }
}
export default {
    LoginButton,
    SignupButton,
    AuthButtonsLog
  };
  