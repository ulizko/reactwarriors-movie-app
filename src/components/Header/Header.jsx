import React, { Component } from 'react';
import Login from './Login/Login';
import User from './User';
export default class Header extends Component {
  render() {
    const { user, updateUser, updateSessionId } = this.props;
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
          {user ? (
            <User user={user} />
          ) : (
            <Login updateUser={updateUser} updateSessionId={updateSessionId} />
          )}
        </div>
      </nav>
    );
  }
}
