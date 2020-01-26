import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import LoginFormContainer from './LoginFormContainer';

export default class LoginModal extends Component {
  render() {
    const { isOpen, toggleModal } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalBody>
          <LoginFormContainer />
        </ModalBody>
      </Modal>
    );
  }
}
