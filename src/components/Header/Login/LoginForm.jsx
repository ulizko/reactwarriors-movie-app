import React, { Component } from "react";
import { API_URL, API_KEY_3 } from "../../../api/api";

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      submitting: false,
      username: "",
      password: "",
      errors: {},
    };
  }

  onSubmit = () => {
    const fetchApi = (url, options = {}) => {
      return new Promise((resolve, reject) => {
        fetch(url, options)
          .then(response => {
            if (response.status < 400) {
              return response.json();
            } else {
              throw response;
            }
          })
          .then(data => {
            resolve(data);
          })
          .catch(data => {
            data.json().then(error => {
              reject(error);

            })
          });
      });
    };

    this.setState({ submitting: true })

    fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password,
              request_token: data.request_token,
            }),
          }
        );
      })
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              request_token: data.request_token,
            }),
          }
        );
      })
      .then(data => {
        this.setState({submitting: false})
        console.log(data)
      })
      .catch(error => {
        this.setState({
          submitting: false,
          errors: {
            base: error.status_message
          }
        })
        console.log("error", error);
      });
  };

  onChange = event => {
    const { name, value } = event.target
    this.setState(prevState => {
      return {
        [name]: value,
        errors: { ...prevState.errors, [name]: null, base: null }
      }
    });
  };

  handleBlur = (event) => {
    const errors = this.validateFields()
    if(Object.keys(errors).length) {
      this.setState(prevState => {
        return {
          errors: {
            ...prevState.errors,
            ...errors
          }
        }
      })
    }
  }

  validateFields = () => {
    const errors = {}

    if (!this.state.username) {
      errors.username = 'Not empty'
    }

    return errors
  }

  onLogin = (e) => {
    e.preventDefault()
    const errors = this.validateFields()
    if(Object.keys(errors).length) {
      this.setState({errors})

    } else {
      this.onSubmit()
    }
  }

  render() {
    const { username, password, errors, submitting } = this.state
    return (
      <form>
        <h1 className="h3 mb-3 font-weight-normal text-center">Авторизация</h1>
        <div className="form-group">
          <label htmlFor="email">Пользователь</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            aria-describedby="emailHelp"
            placeholder="Пользователь"
            value={username}
            onChange={this.onChange}
            onBlur={this.handleBlur}
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Пароль"
            value={password}
            onChange={this.onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block" onClick={this.onLogin} disabled={submitting}>
          Вход
        </button>
        {errors.base && <div className="invalid-feedback text-center">{errors.base}</div>}
      </form>
    );
  }
}
