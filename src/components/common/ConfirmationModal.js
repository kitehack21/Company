import React from 'react';
import { Modal } from 'react-bootstrap';

class ConfirmationModal extends React.Component {
  render() {
    return (
        <Modal show={this.props.modal} onHide={this.props.close}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Do you want to delete <strong>{this.props.name}</strong> from databases?
        </Modal.Body>
        <Modal.Footer>
            {this.props.children}
        </Modal.Footer>
        </Modal>
    );
  }
}

export { ConfirmationModal };