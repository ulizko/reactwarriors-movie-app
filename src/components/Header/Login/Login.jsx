import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import LoginFormContainer from './LoginFormContainer';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    return (
      <React.Fragment>
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="button"
          onClick={this.toggleModal}
        >
          Login
        </button>
        <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
          <ModalBody>
            <LoginFormContainer />
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
