import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark d-flex flex-row-reverse">
        <button className="btn btn-outline-success my-2 my-sm-0" type="button">
          Login
        </button>
      </nav>
    );
  }
}
