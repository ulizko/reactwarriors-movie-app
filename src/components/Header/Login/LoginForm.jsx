import React, { Component } from "react";

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {},
    };
  }

  onChange = event => {
    this.setState();
  };
  render() {
    return (
      <form>
        <h1 className="h3 mb-3 font-weight-normal text-center">Авторизация</h1>
        <div className="form-group">
          <label htmlFor="email">Пользователь</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Пользователь"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Пароль"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Вход
        </button>
      </form>
    );
  }
}
