import React from 'react';
import LogoutButton from './LogoutButton.js';
import LoginButton from './LogButton.js';

const Nav = ({ isLoggedIn, handleLogout, handleLogin, children }) => {
  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">
          How to use
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Home
        </a>
      </li>
      {isLoggedIn ? (
        <LogoutButton isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      ) : (
        <LoginButton handleLogin={handleLogin} />
      )}
      {children}
    </ul>
  );
};

export default Nav;
