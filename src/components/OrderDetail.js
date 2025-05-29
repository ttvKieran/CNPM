import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, ListGroup, Badge, Alert } from 'react-bootstrap';
import CreateShippingOrderModal from './CreateShippingOrderModal';
import ConfirmCancelModal from './ConfirmCancelModal';

function OrderDetail({ order, onUpdateOrder, onBackToList, onShowToast }) {
  const [currentOrder, setCurrentOrder] = useState(order);
  const [notes, setNotes] = useState(order.notes);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // 6.1. Cập nhật trạng thái đơn hàng từ “Chờ xác nhận” → “Đã xác nhận”.
  const handleConfirmOrder = () => {
    if (currentOrder.status === 'Chờ xác nhận') {
      // Giả định kiểm tra tính hợp lệ trước khi xác nhận (sản phẩm, thông tin giao hàng)
      if (!currentOrder.isProductAvailable || !currentOrder.isValidShipping) {
        onShowToast('Đơn hàng không hợp lệ (sản phẩm hết hàng hoặc thông tin giao hàng không đúng).', 'danger');
        // 6.3b. Nếu có sự cố, nhân viên có thể chủ động hủy đơn
        // Show option to cancel instead of just alert
        setShowCancelModal(true); // Gợi ý hủy đơn
        return;
      }

      const updatedOrder = { ...currentOrder, status: 'Đã xác nhận' };
      onUpdateOrder(updatedOrder, 'Trạng thái cập nhật: Đã xác nhận.');
      setCurrentOrder(updatedOrder); // Cập nhật trạng thái local
    }
  };

  // 6.2. Cập nhật ghi chú cho đơn hàng.
  const handleSaveNotes = () => {
    const updatedOrder = { ...currentOrder, notes: notes };
    onUpdateOrder(updatedOrder, 'Cập nhật ghi chú.');
    setCurrentOrder(updatedOrder);
  };

  // 6.3. Chọn nút “Tạo vận đơn”
  const handleCreateShippingOrder = (shippingService) => {
    // 6.3.2 Hệ thống gửi yêu cầu tạo vận đơn đến Hệ thống vận chuyển.
    // Giả lập API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 6.3.2E. Hệ thống gửi yêu cầu tạo vận đơn đến đơn vị vận chuyển nhưng không thành công
        if (Math.random() > 0.8) { // 20% khả năng lỗi
          reject('Không thể tạo vận đơn. Vui lòng thử lại hoặc kiểm tra thông tin vận chuyển.');
        } else {
          // 6.3.3 Hệ thống vận chuyển phản hồi mã vận đơn duy nhất.
          const shippingId = `VN${Math.floor(Math.random() * 100000000)}`;
          resolve(shippingId);
        }
      }, 1500);
    });
  };

  const handleProcessCreateShipping = async (shippingService) => {
    try {
      const newShippingId = await handleCreateShippingOrder(shippingService);
      // 6.3.4 Hệ thống lưu mã vận đơn vào đơn hàng.
      // 6.3.5 Hệ thống cập nhật trạng thái đơn hàng từ “Đã xác nhận” → “Đang giao hàng”.
      const updatedOrder = {
        ...currentOrder,
        shippingId: newShippingId,
        shippingStatus: 'Đang giao hàng',
        status: 'Đang giao hàng' // Cập nhật trạng thái đơn hàng chính
      };
      onUpdateOrder(updatedOrder, `Tạo vận đơn: ${newShippingId}. Trạng thái cập nhật: Đang giao hàng.`);
      setCurrentOrder(updatedOrder); // Cập nhật trạng thái local
      setShowShippingModal(false);
    } catch (error) {
      onShowToast(error, 'danger'); // Hiển thị lỗi từ 6.3.2E
    }
  };

  // 6.3b. Nếu khách hàng yêu cầu hủy đơn hoặc đơn hàng có sự cố nội bộ
  const handleCancelOrder = (reason) => {
    const updatedOrder = {
      ...currentOrder,
      status: 'Đã hủy',
      shippingStatus: 'Đã hủy',
    };
    onUpdateOrder(updatedOrder, `Đơn hàng đã bị hủy. Lý do: ${reason}`);
    setCurrentOrder(updatedOrder); // Cập nhật trạng thái local
    setShowCancelModal(false);
  };

  // Hàm hỗ trợ để lấy màu sắc cho trạng thái
  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'Chờ xác nhận': return 'secondary';
      case 'Đã xác nhận': return 'primary';
      case 'Đang đóng gói': return 'info';
      case 'Đang giao hàng': return 'warning';
      case 'Đã giao hàng': return 'success';
      case 'Đã hủy': return 'danger';
      default: return 'light';
    }
  };

  const getShippingStatusColor = (status) => {
      switch (status) {
        case 'Chưa tạo': return 'secondary';
        case 'Đang giao hàng': return 'warning';
        case 'Đã giao hàng': return 'success';
        case 'Đã hủy': return 'danger';
        default: return 'light';
      }
    };


  if (!currentOrder) {
    return <Alert variant="warning">Không tìm thấy thông tin đơn hàng.</Alert>;
  }

  return (
    <Card className="mb-4">
      <Card.Header as="h5">
        Chi tiết Đơn hàng: {currentOrder.id}
        <Button variant="secondary" size="sm" className="float-end" onClick={onBackToList}>
          Quay lại danh sách
        </Button>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <Card.Title>Thông tin chung</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Mã ĐH:</strong> {currentOrder.id}</ListGroup.Item>
              <ListGroup.Item><strong>Khách hàng:</strong> {currentOrder.customerName}</ListGroup.Item>
              <ListGroup.Item><strong>Ngày đặt:</strong> {currentOrder.orderDate}</ListGroup.Item>
              <ListGroup.Item><strong>Tổng tiền:</strong> {currentOrder.totalAmount} VND</ListGroup.Item>
              <ListGroup.Item>
                <strong>Trạng thái ĐH:</strong>
                <Badge bg={getOrderStatusColor(currentOrder.status)} className="ms-2">{currentOrder.status}</Badge>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Trạng thái GH:</strong>
                <Badge bg={getShippingStatusColor(currentOrder.shippingStatus)} className="ms-2">{currentOrder.shippingStatus}</Badge>
              </ListGroup.Item>
              <ListGroup.Item><strong>Mã vận đơn:</strong> {currentOrder.shippingId || 'Chưa có'}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={6}>
            <Card.Title className="mt-3 mt-md-0">Sản phẩm trong đơn</Card.Title>
            <ListGroup variant="flush">
              {currentOrder.items.map((item, index) => (
                <ListGroup.Item key={index}>
                  {item.name} (SL: {item.qty}) - {item.price} VND
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Card.Title className="mt-3">Ghi chú</Card.Title>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>
            <Button variant="outline-primary" size="sm" onClick={handleSaveNotes}>
              Lưu Ghi chú
            </Button>
          </Col>
        </Row>

        <hr className="my-4" />

        <Card.Title>Lịch sử xử lý đơn hàng</Card.Title>
        <ListGroup className="mb-3">
          {currentOrder.history.map((entry, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
              <span>{entry.description}</span>
              <Badge bg="light" text="dark">{entry.timestamp}</Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <div className="d-flex justify-content-end gap-2">
          {currentOrder.status === 'Chờ xác nhận' && (
            <Button variant="success" onClick={handleConfirmOrder}>
              Xác nhận Đơn hàng
            </Button>
          )}

          {/* 6.3a. Nếu nhân viên không muốn tạo vận đơn ngay --> đã có nút Lưu Ghi chú ở trên */}
          {currentOrder.status === 'Đã xác nhận' && currentOrder.shippingStatus === 'Chưa tạo' && (
            <Button variant="primary" onClick={() => setShowShippingModal(true)}>
              Tạo vận đơn
            </Button>
          )}

          {/* 6.3b. Hủy đơn hàng */}
          {currentOrder.status !== 'Đã hủy' && currentOrder.status !== 'Đã giao hàng' && (
            <Button variant="danger" onClick={() => setShowCancelModal(true)}>
              Hủy Đơn hàng
            </Button>
          )}
        </div>
      </Card.Body>

      {/* Modals */}
      <CreateShippingOrderModal
        show={showShippingModal}
        onHide={() => setShowShippingModal(false)}
        onCreateShipping={handleProcessCreateShipping}
      />
      <ConfirmCancelModal
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        onConfirmCancel={handleCancelOrder}
        orderId={currentOrder.id}
      />
    </Card>
  );
}

export default OrderDetail;