import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Package, Truck, FileText, Filter, Download, Eye, Edit, Trash2, Plus, Calendar, DollarSign, ShoppingCart, Users } from 'lucide-react';

const OrderManagementSystem = () => {
  const [orders, setOrders] = useState([
    {
      id: 'DH001',
      customerName: 'Nguyễn Văn A',
      customerPhone: '0123456789',
      createDate: '2024-01-15',
      status: 'Chờ xác nhận',
      deliveryStatus: 'Chưa giao',
      totalAmount: 1250000,
      items: [
        { name: 'Áo thun nam', quantity: 2, price: 250000 },
        { name: 'Quần jean', quantity: 1, price: 750000 }
      ],
      shippingAddress: '123 Đường ABC, Quận 1, TP.HCM',
      trackingCode: '',
      notes: ''
    },
    {
      id: 'DH002',
      customerName: 'Trần Thị B',
      customerPhone: '0987654321',
      createDate: '2024-01-14',
      status: 'Đã xác nhận',
      deliveryStatus: 'Chưa giao',
      totalAmount: 890000,
      items: [
        { name: 'Váy công sở', quantity: 1, price: 890000 }
      ],
      shippingAddress: '456 Đường XYZ, Quận 2, TP.HCM',
      trackingCode: '',
      notes: ''
    },
    {
      id: 'DH003',
      customerName: 'Lê Văn C',
      customerPhone: '0369852147',
      createDate: '2024-01-13',
      status: 'Đang giao hàng',
      deliveryStatus: 'Đang giao',
      totalAmount: 2100000,
      items: [
        { name: 'Giày thể thao', quantity: 1, price: 1200000 },
        { name: 'Balo du lịch', quantity: 1, price: 900000 }
      ],
      shippingAddress: '789 Đường DEF, Quận 3, TP.HCM',
      trackingCode: 'VD123456789',
      notes: 'Giao hàng nhanh'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deliveryFilter, setDeliveryFilter] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);

  const filteredOrders = orders.filter(order => {
    return (
      (searchTerm === '' || order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
       order.customerName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === '' || order.status === statusFilter) &&
      (deliveryFilter === '' || order.deliveryStatus === deliveryFilter)
    );
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleCreateShippingLabel = (orderId) => {
    const trackingCode = 'VD' + Math.random().toString().substr(2, 9);
    setOrders(orders.map(order => 
      order.id === orderId ? { 
        ...order, 
        trackingCode: trackingCode,
        status: 'Đang giao hàng',
        deliveryStatus: 'Đang giao'
      } : order
    ));
    alert(`Tạo vận đơn thành công! Mã vận đơn: ${trackingCode}`);
  };

  const handleCancelOrder = () => {
    if (selectedOrder && cancelReason.trim()) {
      setOrders(orders.map(order => 
        order.id === selectedOrder.id ? { 
          ...order, 
          status: 'Đã hủy',
          deliveryStatus: 'Đã hủy',
          notes: cancelReason
        } : order
      ));
      setShowCancelModal(false);
      setCancelReason('');
      setShowModal(false);
      alert('Đơn hàng đã được hủy thành công!');
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'Chờ xác nhận': 'warning',
      'Đã xác nhận': 'info',
      'Đang giao hàng': 'primary',
      'Hoàn thành': 'success',
      'Đã hủy': 'danger'
    };
    return `badge bg-${statusColors[status] || 'secondary'}`;
  };

  const getDeliveryStatusBadge = (status) => {
    const statusColors = {
      'Chưa giao': 'secondary',
      'Đang giao': 'primary',
      'Đã giao': 'success',
      'Đã hủy': 'danger'
    };
    return `badge bg-${statusColors[status] || 'secondary'}`;
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Top Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            <Package className="me-2" size={24} />
            Fashion Store
          </a>
          
          <div className="d-flex align-items-center ms-auto">
            <div className="position-relative me-3">
              <Bell size={20} className="text-white" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '10px'}}>
                3
              </span>
            </div>
            <div className="dropdown">
              <button className="btn btn-link text-white p-0" type="button" data-bs-toggle="dropdown">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-white text-primary d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px'}}>
                    <User size={16} />
                  </div>
                  <span className="d-none d-md-inline">Nguyễn Văn Admin</span>
                </div>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#">Thông tin cá nhân</a></li>
                <li><a className="dropdown-item" href="#">Cài đặt</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Đăng xuất</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <nav className="col-md-3 col-lg-2 d-md-block bg-white sidebar shadow-sm">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a className="nav-link active d-flex align-items-center text-primary bg-light rounded" href="#">
                    <ShoppingCart size={18} className="me-2" />
                    Quản lý Đơn hàng
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a className="nav-link d-flex align-items-center text-dark" href="#">
                    <Package size={18} className="me-2" />
                    Sản phẩm
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a className="nav-link d-flex align-items-center text-dark" href="#">
                    <Users size={18} className="me-2" />
                    Khách hàng
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a className="nav-link d-flex align-items-center text-dark" href="#">
                    <Truck size={18} className="me-2" />
                    Vận chuyển
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a className="nav-link d-flex align-items-center text-dark" href="#">
                    <FileText size={18} className="me-2" />
                    Báo cáo
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="pt-3 pb-2 mb-3">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                <h1 className="h2 fw-bold text-primary">Quản lý Đơn hàng</h1>
                
                {/* Stats Cards */}
                <div className="row g-3 mb-4 w-100 mt-3">
                  <div className="col-lg-3">
                    <div className="card border-0 shadow-sm bg-gradient" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                      <div className="card-body text-white">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6 className="card-title opacity-75">Tổng đơn</h6>
                            <h3 className="mb-0 fw-bold">{orders.length}</h3>
                          </div>
                          <div className="align-self-center">
                            <ShoppingCart size={32} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="card border-0 shadow-sm bg-gradient" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
                      <div className="card-body text-white">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6 className="card-title opacity-75">Chờ xác nhận</h6>
                            <h3 className="mb-0 fw-bold">{orders.filter(o => o.status === 'Chờ xác nhận').length}</h3>
                          </div>
                          <div className="align-self-center">
                            <Calendar size={32} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="card border-0 shadow-sm bg-gradient" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
                      <div className="card-body text-white">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6 className="card-title opacity-75">Đang giao</h6>
                            <h3 className="mb-0 fw-bold">{orders.filter(o => o.status === 'Đang giao hàng').length}</h3>
                          </div>
                          <div className="align-self-center">
                            <Truck size={32} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="card border-0 shadow-sm bg-gradient" style={{background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>
                      <div className="card-body text-white">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6 className="card-title opacity-75">Doanh thu</h6>
                            <h3 className="mb-0 fw-bold">{(orders.reduce((sum, o) => sum + o.totalAmount, 0) / 1000000).toFixed(1)}M</h3>
                          </div>
                          <div className="align-self-center">
                            <DollarSign size={32} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="row g-3 mb-4">
                <div className="col-lg-4">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <Search size={18} />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="Tìm kiếm theo mã đơn hoặc tên khách hàng..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">Tất cả trạng thái</option>
                    <option value="Chờ xác nhận">Chờ xác nhận</option>
                    <option value="Đã xác nhận">Đã xác nhận</option>
                    <option value="Đang giao hàng">Đang giao hàng</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                    <option value="Đã hủy">Đã hủy</option>
                  </select>
                </div>
                <div className="col-lg-3">
                  <select
                    className="form-select"
                    value={deliveryFilter}
                    onChange={(e) => setDeliveryFilter(e.target.value)}
                  >
                    <option value="">Tất cả trạng thái giao hàng</option>
                    <option value="Chưa giao">Chưa giao</option>
                    <option value="Đang giao">Đang giao</option>
                    <option value="Đã giao">Đã giao</option>
                    <option value="Đã hủy">Đã hủy</option>
                  </select>
                </div>
                <div className="col-lg-2">
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => setShowExportModal(true)}
                  >
                    <Download size={18} className="me-1" />
                    Xuất file
                  </button>
                </div>
              </div>

              {/* Orders Table */}
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-bottom-0 py-3">
                  <h5 className="mb-0 fw-bold text-dark">Danh sách đơn hàng ({filteredOrders.length})</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th className="border-0 fw-semibold">Mã đơn</th>
                          <th className="border-0 fw-semibold">Khách hàng</th>
                          <th className="border-0 fw-semibold">Ngày tạo</th>
                          <th className="border-0 fw-semibold">Trạng thái</th>
                          <th className="border-0 fw-semibold">Giao hàng</th>
                          <th className="border-0 fw-semibold">Tổng tiền</th>
                          <th className="border-0 fw-semibold text-center">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => (
                          <tr key={order.id} className="align-middle">
                            <td className="fw-bold text-primary">{order.id}</td>
                            <td>
                              <div>
                                <div className="fw-semibold">{order.customerName}</div>
                                <small className="text-muted">{order.customerPhone}</small>
                              </div>
                            </td>
                            <td>{new Date(order.createDate).toLocaleDateString('vi-VN')}</td>
                            <td>
                              <span className={getStatusBadge(order.status)}>
                                {order.status}
                              </span>
                            </td>
                            <td>
                              <span className={getDeliveryStatusBadge(order.deliveryStatus)}>
                                {order.deliveryStatus}
                              </span>
                            </td>
                            <td className="fw-semibold text-success">
                              {order.totalAmount.toLocaleString('vi-VN')}đ
                            </td>
                            <td>
                              <div className="d-flex gap-2 justify-content-center">
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => handleViewOrder(order)}
                                  title="Xem chi tiết"
                                >
                                  <Eye size={14} />
                                </button>
                                {order.status === 'Đã xác nhận' && !order.trackingCode && (
                                  <button
                                    className="btn btn-sm btn-outline-success"
                                    onClick={() => handleCreateShippingLabel(order.id)}
                                    title="Tạo vận đơn"
                                  >
                                    <Truck size={14} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Order Detail Modal */}
      {showModal && selectedOrder && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content shadow">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">Chi tiết đơn hàng {selectedOrder.id}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <h6 className="card-title fw-bold mb-3">Thông tin khách hàng</h6>
                        <p className="mb-2"><strong>Tên:</strong> {selectedOrder.customerName}</p>
                        <p className="mb-2"><strong>SĐT:</strong> {selectedOrder.customerPhone}</p>
                        <p className="mb-0"><strong>Địa chỉ:</strong> {selectedOrder.shippingAddress}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <h6 className="card-title fw-bold mb-3">Thông tin đơn hàng</h6>
                        <p className="mb-2"><strong>Ngày tạo:</strong> {new Date(selectedOrder.createDate).toLocaleDateString('vi-VN')}</p>
                        <p className="mb-2">
                          <strong>Trạng thái:</strong> 
                          <span className={`ms-2 ${getStatusBadge(selectedOrder.status)}`}>
                            {selectedOrder.status}
                          </span>
                        </p>
                        <p className="mb-0">
                          <strong>Mã vận đơn:</strong> 
                          {selectedOrder.trackingCode ? (
                            <span className="ms-2 badge bg-info">{selectedOrder.trackingCode}</span>
                          ) : (
                            <span className="ms-2 text-muted">Chưa tạo</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card border-0 bg-light mt-4">
                  <div className="card-body">
                    <h6 className="card-title fw-bold mb-3">Sản phẩm</h6>
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOrder.items.map((item, index) => (
                            <tr key={index}>
                              <td>{item.name}</td>
                              <td>{item.quantity}</td>
                              <td>{item.price.toLocaleString('vi-VN')}đ</td>
                              <td className="fw-semibold">{(item.quantity * item.price).toLocaleString('vi-VN')}đ</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="table-primary">
                            <th colSpan="3">Tổng cộng</th>
                            <th className="text-success fw-bold">{selectedOrder.totalAmount.toLocaleString('vi-VN')}đ</th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div className="alert alert-info mt-3">
                    <strong>Ghi chú:</strong> {selectedOrder.notes}
                  </div>
                )}
              </div>
              <div className="modal-footer">
                {selectedOrder.status === 'Chờ xác nhận' && (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        handleUpdateStatus(selectedOrder.id, 'Đã xác nhận');
                        setShowModal(false);
                      }}
                    >
                      Xác nhận đơn hàng
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setShowCancelModal(true)}
                    >
                      Hủy đơn hàng
                    </button>
                  </>
                )}
                {selectedOrder.status === 'Đã xác nhận' && !selectedOrder.trackingCode && (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleCreateShippingLabel(selectedOrder.id);
                      setShowModal(false);
                    }}
                  >
                    <Truck size={16} className="me-1" />
                    Tạo vận đơn
                  </button>
                )}
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Xác nhận hủy đơn hàng</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowCancelModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Lý do hủy đơn hàng:</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Nhập lý do hủy đơn hàng..."
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowCancelModal(false)}>
                  Hủy bỏ
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleCancelOrder}
                  disabled={!cancelReason.trim()}
                >
                  Xác nhận hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Xuất danh sách đơn hàng</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowExportModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Chọn định dạng:</label>
                  <div className="row g-2">
                    <div className="col-6">
                      <button
                        className="btn btn-outline-primary w-100"
                        onClick={() => {
                          alert('Đang xuất file PDF...');
                          setShowExportModal(false);
                        }}
                      >
                        <FileText size={16} className="me-1" />
                        PDF
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        className="btn btn-outline-success w-100"
                        onClick={() => {
                          alert('Đang xuất file Excel...');
                          setShowExportModal(false);
                        }}
                      >
                        <FileText size={16} className="me-1" />
                        Excel
                      </button>
                    </div>
                  </div>
                </div>
                <div className="alert alert-info">
                  <small>
                    <strong>Thông tin:</strong> Sẽ xuất {filteredOrders.length} đơn hàng theo bộ lọc hiện tại.
                  </small>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowExportModal(false)}>
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagementSystem;