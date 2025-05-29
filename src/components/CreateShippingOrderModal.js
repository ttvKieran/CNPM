import React, { useState } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';

function CreateShippingOrderModal({ show, onHide, onCreateShipping }) {
  const [selectedService, setSelectedService] = useState('Giao hàng nhanh');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await onCreateShipping(selectedService);
      onHide(); // Đóng modal khi thành công
    } catch (err) {
      setError(err); // Hiển thị lỗi từ 6.3.2E
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Tạo vận đơn</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Chọn dịch vụ vận chuyển:</Form.Label>
          <Form.Control
            as="select"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option>Giao hàng nhanh</option>
            <option>Viettel Post</option>
            <option>J&T Express</option>
            <option>GHN Express</option>
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isLoading}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleCreate} disabled={isLoading}>
          {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Tạo vận đơn'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateShippingOrderModal;