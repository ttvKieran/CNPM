import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemIcon, ListItemText,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Select, MenuItem, FormControl, InputLabel, Chip, Grid, Card, CardContent,
  IconButton, Menu, Avatar, Divider, FormControlLabel, Checkbox, Snackbar, Alert,
  TablePagination, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import {
  Dashboard, ShoppingCart, LocalShipping, Assessment, Settings, AccountCircle,
  Search, FilterList, Edit, Cancel, Print, GetApp, MoreVert, ExpandMore,
  Notifications, Menu as MenuIcon
} from '@mui/icons-material';
import { ThemeProvider } from '@emotion/react';
import { getCustomTheme } from './customTheme';

const OrderManagementSystem = () => {
  // States
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [orderDetailOpen, setOrderDetailOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [shippingDialogOpen, setShippingDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [customerFilter, setCustomerFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [exportType, setExportType] = useState('overview');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [selectedFields, setSelectedFields] = useState([]);
  const [cancelReason, setCancelReason] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [shippingService, setShippingService] = useState('');

  // Mock data
  useEffect(() => {
    const mockOrders = [
      {
        id: 'DH001',
        createdAt: '2024-05-30 10:30',
        status: 'Chờ xác nhận',
        customer: 'Nguyễn Văn A',
        total: 500000,
        shippingCode: '',
        phone: '0901234567',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        items: [
          { name: 'Sản phẩm A', quantity: 2, price: 200000 },
          { name: 'Sản phẩm B', quantity: 1, price: 100000 }
        ]
      },
      {
        id: 'DH002',
        createdAt: '2024-05-30 11:45',
        status: 'Đã xác nhận',
        customer: 'Trần Thị B',
        total: 750000,
        shippingCode: '',
        phone: '0912345678',
        address: '456 Đường DEF, Quận 2, TP.HCM',
        items: [
          { name: 'Sản phẩm C', quantity: 3, price: 250000 }
        ]
      },
      {
        id: 'DH003',
        createdAt: '2024-05-30 14:20',
        status: 'Đang giao hàng',
        customer: 'Lê Văn C',
        total: 300000,
        shippingCode: 'VD123456789',
        phone: '0923456789',
        address: '789 Đường GHI, Quận 3, TP.HCM',
        items: [
          { name: 'Sản phẩm D', quantity: 1, price: 300000 }
        ]
      }
    ];
    setOrders(mockOrders);
  }, []);

  const statusColors = {
    'Chờ xác nhận': 'warning',
    'Đã xác nhận': 'info',
    'Đang giao hàng': 'primary',
    'Hoàn thành': 'success',
    'Đã hủy': 'error'
  };

  const shippingServices = [
    'Giao hàng nhanh',
    'Giao hàng tiết kiệm',
    'J&T Express',
    'Viettel Post',
    'VNPost'
  ];

  const exportFields = [
    { id: 'id', label: 'Mã đơn hàng' },
    { id: 'createdAt', label: 'Thời gian tạo' },
    { id: 'customer', label: 'Khách hàng' },
    { id: 'phone', label: 'Số điện thoại' },
    { id: 'address', label: 'Địa chỉ' },
    { id: 'total', label: 'Tổng tiền' },
    { id: 'status', label: 'Trạng thái' },
    { id: 'shippingCode', label: 'Mã vận đơn' }
  ];

  // Menu items
  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, active: false },
    { text: 'Quản lý Đơn hàng', icon: <ShoppingCart />, active: true },
    { text: 'Vận chuyển', icon: <LocalShipping />, active: false },
    { text: 'Báo cáo', icon: <Assessment />, active: false },
    { text: 'Cài đặt', icon: <Settings />, active: false }
  ];

  // Filter orders
  const filteredOrders = orders.filter(order => {
    return (
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === '' || order.status === statusFilter) &&
      (customerFilter === '' || order.customer.toLowerCase().includes(customerFilter.toLowerCase()))
    );
  });

  // Handle functions
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setOrderDetailOpen(true);
    setOrderNotes('');
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    showSnackbar(`Đã cập nhật trạng thái đơn hàng ${orderId} thành "${newStatus}"`, 'success');
  };

  const handleCreateShippingLabel = () => {
    if (!shippingService) {
      showSnackbar('Vui lòng chọn dịch vụ vận chuyển', 'error');
      return;
    }
    
    // Mock shipping code generation
    const shippingCode = 'VD' + Math.random().toString().substr(2, 9);
    
    setOrders(prev => prev.map(order => 
      order.id === selectedOrder.id 
        ? { ...order, shippingCode, status: 'Đang giao hàng' }
        : order
    ));
    
    setSelectedOrder(prev => ({ ...prev, shippingCode, status: 'Đang giao hàng' }));
    setShippingDialogOpen(false);
    setShippingService('');
    showSnackbar(`Đã tạo vận đơn thành công. Mã vận đơn: ${shippingCode}`, 'success');
  };

  const handleCancelOrder = () => {
    if (!cancelReason.trim()) {
      showSnackbar('Vui lòng nhập lý do hủy đơn', 'error');
      return;
    }
    
    setOrders(prev => prev.map(order => 
      order.id === selectedOrder.id 
        ? { ...order, status: 'Đã hủy', cancelReason }
        : order
    ));
    
    setCancelDialogOpen(false);
    setOrderDetailOpen(false);
    setCancelReason('');
    showSnackbar(`Đã hủy đơn hàng ${selectedOrder.id}`, 'success');
  };

  const handleExport = () => {
    const message = exportType === 'overview' 
      ? `Đã xuất danh sách tổng quan (${exportFormat.toUpperCase()})` 
      : `Đã xuất danh sách chi tiết (${exportFormat.toUpperCase()}) với ${selectedFields.length} trường`;
    
    showSnackbar(message, 'success');
    setExportDialogOpen(false);
    setSelectedFields([]);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleFieldChange = (fieldId) => {
    setSelectedFields(prev => 
      prev.includes(fieldId) 
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerOpen ? 280 : 80,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerOpen ? 280 : 80,
            boxSizing: 'border-box',
            transition: 'width 0.3s',
            bgcolor: '#1976d2',
            color: 'white'
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => setDrawerOpen(!drawerOpen)} sx={{ color: 'white' }}>
            <MenuIcon />
          </IconButton>
          {drawerOpen && <Typography variant="h6">ECommerce Admin</Typography>}
        </Box>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
        <List>
          {menuItems.map((item) => (
            <ListItem 
              key={item.text} 
              sx={{ 
                bgcolor: item.active ? 'rgba(255,255,255,0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: drawerOpen ? 56 : 'auto' }}>
                {item.icon}
              </ListItemIcon>
              {drawerOpen && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <AppBar position="static" sx={{ bgcolor: 'white', color: 'black', boxShadow: 1 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Quản lý Đơn hàng
            </Typography>
            <IconButton>
              <Notifications />
            </IconButton>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar sx={{ width: 32, height: 32 }}>NV</Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem>Thông tin cá nhân</MenuItem>
              <MenuItem>Đăng xuất</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Box sx={{ p: 3, flexGrow: 1 }}>
          {/* Filter Section */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Tìm theo mã đơn hàng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <Search sx={{ mr: 1, color: 'gray' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Trạng thái</InputLabel>
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      label="Trạng thái"
                    >
                      <MenuItem value="">Tất cả</MenuItem>
                      <MenuItem value="Chờ xác nhận">Chờ xác nhận</MenuItem>
                      <MenuItem value="Đã xác nhận">Đã xác nhận</MenuItem>
                      <MenuItem value="Đang giao hàng">Đang giao hàng</MenuItem>
                      <MenuItem value="Hoàn thành">Hoàn thành</MenuItem>
                      <MenuItem value="Đã hủy">Đã hủy</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Tìm theo khách hàng..."
                    value={customerFilter}
                    onChange={(e) => setCustomerFilter(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    label="Ngày tạo đơn"
                    InputLabelProps={{ shrink: true }}
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<GetApp />}
                    onClick={() => setExportDialogOpen(true)}
                  >
                    Xuất file
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                    <TableCell><strong>Mã đơn</strong></TableCell>
                    <TableCell><strong>Thời gian tạo</strong></TableCell>
                    <TableCell><strong>Khách hàng</strong></TableCell>
                    <TableCell><strong>Tổng tiền</strong></TableCell>
                    <TableCell><strong>Trạng thái</strong></TableCell>
                    <TableCell><strong>Mã vận đơn</strong></TableCell>
                    <TableCell><strong>Thao tác</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => (
                    <TableRow key={order.id} hover>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.createdAt}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.total.toLocaleString('vi-VN')} đ</TableCell>
                      <TableCell>
                        <Chip 
                          label={order.status} 
                          color={statusColors[order.status]} 
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{order.shippingCode || '-'}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleOrderClick(order)}
                        >
                          Chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={filteredOrders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            />
          </Paper>
        </Box>
      </Box>

      {/* Order Detail Dialog */}
      <Dialog open={orderDetailOpen} onClose={() => setOrderDetailOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Chi tiết đơn hàng {selectedOrder?.id}
          <IconButton
            sx={{ position: 'absolute', right: 8, top: 8 }}
            onClick={() => setOrderDetailOpen(false)}
          >
            ×
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Thông tin đơn hàng</Typography>
                    <Typography><strong>Mã đơn:</strong> {selectedOrder.id}</Typography>
                    <Typography><strong>Thời gian:</strong> {selectedOrder.createdAt}</Typography>
                    <Typography><strong>Trạng thái:</strong> 
                      <Chip 
                        label={selectedOrder.status} 
                        color={statusColors[selectedOrder.status]} 
                        size="small" 
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                    <Typography><strong>Tổng tiền:</strong> {selectedOrder.total.toLocaleString('vi-VN')} đ</Typography>
                    {selectedOrder.shippingCode && (
                      <Typography><strong>Mã vận đơn:</strong> {selectedOrder.shippingCode}</Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Thông tin khách hàng</Typography>
                    <Typography><strong>Tên:</strong> {selectedOrder.customer}</Typography>
                    <Typography><strong>SĐT:</strong> {selectedOrder.phone}</Typography>
                    <Typography><strong>Địa chỉ:</strong> {selectedOrder.address}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Sản phẩm</Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Tên sản phẩm</TableCell>
                            <TableCell>Số lượng</TableCell>
                            <TableCell>Đơn giá</TableCell>
                            <TableCell>Thành tiền</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedOrder.items.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.price.toLocaleString('vi-VN')} đ</TableCell>
                              <TableCell>{(item.quantity * item.price).toLocaleString('vi-VN')} đ</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Ghi chú nội bộ"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Nhập ghi chú cho đơn hàng..."
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          {selectedOrder?.status === 'Chờ xác nhận' && (
            <>
              <Button 
                variant="contained" 
                color="success"
                onClick={() => handleStatusUpdate(selectedOrder.id, 'Đã xác nhận')}
              >
                Xác nhận đơn
              </Button>
              <Button 
                variant="contained" 
                color="error"
                onClick={() => setCancelDialogOpen(true)}
              >
                Hủy đơn
              </Button>
            </>
          )}
          {selectedOrder?.status === 'Đã xác nhận' && (
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => setShippingDialogOpen(true)}
            >
              Tạo vận đơn
            </Button>
          )}
          <Button onClick={() => setOrderDetailOpen(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>

      {/* Shipping Dialog */}
      <Dialog open={shippingDialogOpen} onClose={() => setShippingDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Tạo vận đơn</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Chọn dịch vụ vận chuyển</InputLabel>
            <Select
              value={shippingService}
              onChange={(e) => setShippingService(e.target.value)}
              label="Chọn dịch vụ vận chuyển"
            >
              {shippingServices.map((service) => (
                <MenuItem key={service} value={service}>{service}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShippingDialogOpen(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleCreateShippingLabel}>
            Tạo vận đơn
          </Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Hủy đơn hàng</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Lý do hủy đơn"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Nhập lý do hủy đơn hàng..."
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>Hủy</Button>
          <Button variant="contained" color="error" onClick={handleCancelOrder}>
            Xác nhận hủy
          </Button>
        </DialogActions>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onClose={() => setExportDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Xuất danh sách đơn hàng</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1" gutterBottom>Loại xuất file:</Typography>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={exportType === 'overview'}
                        onChange={() => setExportType('overview')}
                      />
                    }
                    label="Xuất tổng quan"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={exportType === 'detail'}
                        onChange={() => setExportType('detail')}
                      />
                    }
                    label="Xuất chi tiết"
                  />
                </Box>
              </FormControl>
            </Grid>

            {exportType === 'detail' && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Chọn các trường muốn xuất:
                </Typography>
                <Grid container spacing={1}>
                  {exportFields.map((field) => (
                    <Grid item xs={6} md={4} key={field.id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedFields.includes(field.id)}
                            onChange={() => handleFieldChange(field.id)}
                          />
                        }
                        label={field.label}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Định dạng file</InputLabel>
                <Select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  label="Định dạng file"
                >
                  <MenuItem value="pdf">PDF</MenuItem>
                  <MenuItem value="excel">Excel</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialogOpen(false)}>Hủy</Button>
          <Button 
            variant="contained" 
            onClick={handleExport}
            disabled={exportType === 'detail' && selectedFields.length === 0}
          >
            Xuất file
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderManagementSystem;