import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import LoginForm from './LoginForm';
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
            <LoginForm
              updateUser={this.props.updateUser}
              updateSessionId={this.props.updateSessionId}
            ></LoginForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
