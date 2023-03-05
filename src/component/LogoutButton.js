import React from 'react';
import { Nav} from './Nav.js';
import { LoginButton } from './LogButton.js';
import { App } from '../App.js';

const LogoutButton = ({ isLoggedIn, handleLogout }) => {
  return isLoggedIn ? (
    <li className="nav-item">
      <button className="nav-link btn btn-link" onClick={handleLogout}>Log out</button>
    </li>
  ) : null;
};
  

export default LogoutButton;
