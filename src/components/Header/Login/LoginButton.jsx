import React from 'react';

const LoginButton = ({ toggleModal }) => {
  return (
    <button
      className="btn btn-outline-success my-2 my-sm-0"
      type="button"
      onClick={toggleModal}
    >
      Login
    </button>
  );
};

export default LoginButton;
