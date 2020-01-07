import React, { Component } from 'react';
import { API_URL, API_KEY_3, fetchApi } from '../../../api/api';
import LoginForm from './LoginForm';
import AppContextHOC from '../../HOC/AppConextHOC';

class LoginFormContainer extends Component {
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
    const error = errors[name];

    if (Object.keys(errors).length) {
      this.setState(prevState => {
        return {
          errors: {
            ...prevState.errors,
            [name]: error,
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

    return (
      <LoginForm
        username={username}
        password={password}
        repeatPassword={repeatPassword}
        errors={errors}
        submitting={submitting}
        onLogin={this.onLogin}
        onChange={this.onChange}
        handleBlur={this.handleBlur}
      />
    );
  }
}

export default AppContextHOC(LoginFormContainer);
