import React, { Component } from "react";
import Login from "./Login/Login";
export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link">Home</a>
            </li>
          </ul>
        </div>
        <Login />
      </nav>
    );
  }
}
