import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const LoginForm = props => {
  const { errors, values, submitting, onChange, handleBlur, onLogin } = props;

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
          value={values.username}
          onChange={onChange}
          onBlur={handleBlur}
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
          value={values.password}
          onChange={onChange}
          onBlur={handleBlur}
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
          value={values.repeatPassword}
          onChange={onChange}
          onBlur={handleBlur}
        />
        {errors.repeatPassword && (
          <div className="invalid-feedback">{errors.repeatPassword}</div>
        )}
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-block"
        onClick={onLogin}
        disabled={submitting}
      >
        Вход
      </button>
      {errors.base && (
        <div className="invalid-feedback text-center">{errors.base}</div>
      )}
    </form>
  );
};

LoginForm.defaultProps = {
  errors: {},
  values: {
    username: '',
    password: '',
    repeatPassword: '',
  },
  submitting: false,
};

LoginForm.propTypes = {
  errors: PropTypes.object,
  values: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    repeatPassword: PropTypes.string,
  }),
  submitting: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
