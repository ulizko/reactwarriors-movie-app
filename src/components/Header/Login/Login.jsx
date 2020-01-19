import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import LoginFormContainer from './LoginFormContainer';

export default class Login extends Component {
  render() {
    const { toggleModal, isOpen } = this.props;
    return (
      <React.Fragment>
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="button"
          onClick={toggleModal}
        >
          Login
        </button>
        <Modal isOpen={isOpen} toggle={toggleModal}>
          <ModalBody>
            <LoginFormContainer />
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
