import React, { Component } from 'react';
import CallApi from '../../../api/api';

import LoginForm from './LoginForm';
import AppContextHOC from '../../HOC/AppConextHOC';

class LoginFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      submitting: false,
      values: {
        username: '',
        password: '',
        repeatPassword: '',
      },
      errors: {},
    };
  }

  onSubmit = () => {
    this.setState({ submitting: true });
    const { username, password } = this.state.values;
    CallApi.get('/authentication/token/new')
      .then(data => {
        const body = {
          username,
          password,
          request_token: data.request_token,
        };
        return CallApi.post('/authentication/token/validate_with_login', {
          body,
        });
      })
      .then(({ request_token }) => {
        return CallApi.post('/authentication/session/new', {
          body: { request_token },
        });
      })
      .then(({ session_id }) => {
        this.props.updateSessionId(session_id);
        return CallApi.get('/account', { params: { session_id } });
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
        values: { ...prevState.values, [name]: value },
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
    const { username, password, repeatPassword } = this.state.values;
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
    const { values, errors, submitting } = this.state;

    return (
      <LoginForm
        values={values}
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
