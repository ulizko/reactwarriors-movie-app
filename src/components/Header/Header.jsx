import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './Login/LoginButton';
import UserMenu from './UserMenu';
export default class Header extends Component {
  render() {
    const { user, toggleModal } = this.props;
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {user ? <UserMenu /> : <LoginButton toggleModal={toggleModal} />}
        </div>
      </nav>
    );
  }
}
