import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmationModal = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseDelete = (e) => {
        setShow(false);
        props.onDeleteObject(e, props.index);
    }

    return (
        <div>
        <Button variant="primary" onClick={handleShow}>
            Delete
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Body>Delete item? You will not be able to undo this action.</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleCloseDelete}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
}

export default ConfirmationModal;