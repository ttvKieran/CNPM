import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

function ToastNotification({ show, message, type, onClose }) {
  return (
    <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1050 }}>
      <Toast show={show} onClose={onClose} bg={type} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Thông báo</strong>
        </Toast.Header>
        <Toast.Body className={type === 'warning' || type === 'info' ? 'text-dark' : 'text-white'}>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastNotification;