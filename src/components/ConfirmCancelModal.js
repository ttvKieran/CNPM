import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

function ConfirmCancelModal({ show, onHide, onConfirmCancel, orderId }) {
  const [cancelReason, setCancelReason] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (!cancelReason.trim()) {
      setError('Lý do hủy không được để trống.');
      return;
    }
    setError('');
    onConfirmCancel(cancelReason);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận hủy đơn hàng {orderId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Bạn có chắc chắn muốn hủy đơn hàng này?</p>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Lý do hủy:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Nhập lý do hủy đơn hàng..."
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Hủy đơn
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmCancelModal;