import React, { Component } from 'react';
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
              <a href="#home" className="nav-link">
                Home
              </a>
            </li>
          </ul>
          {user ? <UserMenu /> : <LoginButton toggleModal={toggleModal} />}
        </div>
      </nav>
    );
  }
}
