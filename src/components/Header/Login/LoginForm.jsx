import React, { Component } from 'react';
import classNames from 'classnames';
import { API_URL, API_KEY_3, fetchApi } from '../../../api/api';

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      submitting: false,
      username: '',
      password: '',
      repeatPassword: '',
      errors: {},
    };
  }

  onSubmit = () => {
    this.setState({ submitting: true });

    fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-type': 'application/json',
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
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              request_token: data.request_token,
            }),
          }
        );
      })
      .then(data => {
        this.props.updateSessionId(data.session_id);
        return fetchApi(
          `${API_URL}/account?api_key=${API_KEY_3}&session_id=${data.session_id}`
        );
      })
      .then(user => {
        this.setState({ submitting: false });
        this.props.updateUser(user);
      })
      .catch(error => {
        this.setState({
          submitting: false,
          errors: {
            base: error.status_message,
          },
        });
      });
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState(prevState => {
      return {
        [name]: value,
        errors: { ...prevState.errors, [name]: null, base: null },
      };
    });
  };

  handleBlur = event => {
    const name = event.target.name;
    const errors = this.validateFields();
    if (Object.keys(errors).length) {
      this.setState(prevState => {
        return {
          errors: {
            ...prevState.errors,
            [name]: errors[name],
          },
        };
      });
    }
  };

  validateFields = () => {
    const { username, password, repeatPassword } = this.state;
    const errors = {};

    if (!username) {
      errors.username = 'Not empty';
    }
    if (!password) {
      errors.password = 'Not empty';
    }
    if (password !== repeatPassword) {
      errors.repeatPassword = 'Must to equal password';
    }

    return errors;
  };

  onLogin = e => {
    e.preventDefault();
    const errors = this.validateFields();
    if (Object.keys(errors).length) {
      this.setState({ errors });
    } else {
      this.onSubmit();
    }
  };

  render() {
    const {
      username,
      password,
      repeatPassword,
      errors,
      submitting,
    } = this.state;

    const inputClasses = {
      username: classNames('form-control', {
        'is-invalid': errors.username,
      }),
      password: classNames('form-control', {
        'is-invalid': errors.password,
      }),
      repeatPassword: classNames('form-control', {
        'is-invalid': errors.repeatPassword,
      }),
    };

    return (
      <form>
        <h1 className="h3 mb-3 font-weight-normal text-center">Авторизация</h1>
        <div className="form-group">
          <label htmlFor="email">Пользователь</label>
          <input
            type="text"
            className={inputClasses.username}
            id="username"
            name="username"
            aria-describedby="emailHelp"
            placeholder="Пользователь"
            value={username}
            onChange={this.onChange}
            onBlur={this.handleBlur}
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            className={inputClasses.password}
            id="password"
            name="password"
            placeholder="Пароль"
            value={password}
            onChange={this.onChange}
            onBlur={this.handleBlur}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="repeatPassword">Повторите Пароль</label>
          <input
            type="password"
            className={inputClasses.repeatPassword}
            id="repeatPassword"
            name="repeatPassword"
            placeholder="Пароль"
            value={repeatPassword}
            onChange={this.onChange}
            onBlur={this.handleBlur}
          />
          {errors.repeatPassword && (
            <div className="invalid-feedback">{errors.repeatPassword}</div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block"
          onClick={this.onLogin}
          disabled={submitting}
        >
          Вход
        </button>
        {errors.base && (
          <div className="invalid-feedback text-center">{errors.base}</div>
        )}
      </form>
    );
  }
}
