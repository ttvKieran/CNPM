import React, { useState, useEffect } from 'react';
import { Table, Button, Form, FormControl, InputGroup, Row, Col, Dropdown } from 'react-bootstrap';
import ExportOptionsModal from './ExportOptionsModal';

function OrderList({ orders, onSelectOrder, onShowToast }) {
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterShippingStatus, setFilterShippingStatus] = useState('');
  const [sortBy, setSortBy] = useState('orderDate');
  const [sortDirection, setSortDirection] = useState('desc'); // 'asc' or 'desc'

  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    // 3a. Nếu nhân viên muốn tìm kiếm đơn hàng nhanh chóng
    let tempOrders = [...orders];

    // Lọc theo từ khóa tìm kiếm (mã đơn hàng, tên khách hàng)
    if (searchTerm) {
      tempOrders = tempOrders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo trạng thái đơn hàng
    if (filterStatus) {
      tempOrders = tempOrders.filter(order => order.status === filterStatus);
    }

    // Lọc theo trạng thái giao hàng
    if (filterShippingStatus) {
      tempOrders = tempOrders.filter(order => order.shippingStatus === filterShippingStatus);
    }

    // Sắp xếp
    tempOrders.sort((a, b) => {
      let valA, valB;
      if (sortBy === 'orderDate') {
        valA = new Date(a.orderDate);
        valB = new Date(b.orderDate);
      } else { // sortBy === 'id' (mã đơn hàng)
        valA = a.id;
        valB = b.id;
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredOrders(tempOrders);
  }, [orders, searchTerm, filterStatus, filterShippingStatus, sortBy, sortDirection]);

  const handleExport = (exportType, format) => {
    // 7. Nhân viên chọn “Xuất danh sách chi tiết chi tiết”
    // 7a. Nếu nhân viên không cần xuất danh sách chi tiết từng đơn hàng mà chỉ cần tổng quan
    // Giả định tạo file và tải xuống
    console.log(`Exporting ${exportType} as ${format}`);
    // Trong thực tế, bạn sẽ gửi request đến backend để tạo file
    setTimeout(() => {
        onShowToast(`Đã tạo và tải xuống file ${exportType} định dạng ${format}!`, 'success');
        setShowExportModal(false);
    }, 500);

    // 7.2E. Hệ thống gặp sự cố khi tạo file báo cáo (giả lập lỗi)
    // if (Math.random() > 0.8) { // 20% khả năng lỗi
    //     onShowToast("Không thể tạo file. Vui lòng thử lại sau.", 'danger');
    //     setShowExportModal(false);
    //     return;
    // }
  };

  return (
    <div>
      <Row className="mb-3">
        <Col md={4}>
          <InputGroup>
            <FormControl
              placeholder="Tìm kiếm theo mã đơn hàng, khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-secondary">Tìm kiếm</Button>
          </InputGroup>
        </Col>
        <Col md={8}>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>Trạng thái ĐH:</Form.Label>
            <Col sm={3}>
              <Form.Control as="select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">Tất cả</option>
                <option value="Chờ xác nhận">Chờ xác nhận</option>
                <option value="Đã xác nhận">Đã xác nhận</option>
                <option value="Đang đóng gói">Đang đóng gói</option>
                <option value="Đang giao hàng">Đang giao hàng</option>
                <option value="Đã giao hàng">Đã giao hàng</option>
                <option value="Đã hủy">Đã hủy</option>
              </Form.Control>
            </Col>
            <Form.Label column sm={2}>Trạng thái GH:</Form.Label>
            <Col sm={3}>
              <Form.Control as="select" value={filterShippingStatus} onChange={(e) => setFilterShippingStatus(e.target.value)}>
                <option value="">Tất cả</option>
                <option value="Chưa tạo">Chưa tạo</option>
                <option value="Đang giao hàng">Đang giao hàng</option>
                <option value="Đã giao hàng">Đã giao hàng</option>
                <option value="Đã hủy">Đã hủy</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <Form.Group as={Row}>
            <Form.Label column sm={4}>Sắp xếp:</Form.Label>
            <Col sm={8}>
              <Form.Control as="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="orderDate">Thời gian tạo đơn</option>
                <option value="id">Mã đơn hàng</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group as={Row}>
            <Form.Label column sm={4}>Thứ tự:</Form.Label>
            <Col sm={8}>
              <Form.Control as="select" value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
                <option value="desc">Giảm dần</option>
                <option value="asc">Tăng dần</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Col>
        <Col md={{ span: 2, offset: 4 }} className="text-end">
            <Button variant="success" onClick={() => setShowExportModal(true)}>
                Xuất Báo cáo
            </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Mã ĐH</th>
            <th>Khách hàng</th>
            <th>Ngày đặt</th>
            <th>Tổng tiền</th>
            <th>Trạng thái ĐH</th>
            <th>Trạng thái GH</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.orderDate}</td>
                <td>{order.totalAmount} VND</td>
                <td><span className={`badge bg-${getOrderStatusColor(order.status)}`}>{order.status}</span></td>
                <td><span className={`badge bg-${getShippingStatusColor(order.shippingStatus)}`}>{order.shippingStatus}</span></td>
                <td>
                  <Button variant="info" size="sm" onClick={() => onSelectOrder(order.id)}>
                    Xem chi tiết
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">Không tìm thấy đơn hàng nào.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <ExportOptionsModal
        show={showExportModal}
        onHide={() => setShowExportModal(false)}
        onExport={handleExport}
      />
    </div>
  );
}

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

export default OrderList;