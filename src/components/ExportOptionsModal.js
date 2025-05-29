import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ExportOptionsModal({ show, onHide, onExport }) {
  const [exportType, setExportType] = useState('detailed'); // 'detailed' or 'overview'
  const [format, setFormat] = useState('pdf'); // 'pdf' or 'excel'

  const handleExport = () => {
    onExport(exportType, format);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Xuất danh sách đơn hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Loại báo cáo:</Form.Label>
          <Form.Check
            type="radio"
            label="Danh sách chi tiết"
            name="exportType"
            value="detailed"
            checked={exportType === 'detailed'}
            onChange={(e) => setExportType(e.target.value)}
            id="radio-detailed"
          />
          <Form.Check
            type="radio"
            label="Danh sách tổng quan"
            name="exportType"
            value="overview"
            checked={exportType === 'overview'}
            onChange={(e) => setExportType(e.target.value)}
            id="radio-overview"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Định dạng file:</Form.Label>
          <Form.Check
            type="radio"
            label="PDF"
            name="format"
            value="pdf"
            checked={format === 'pdf'}
            onChange={(e) => setFormat(e.target.value)}
            id="radio-pdf"
            inline
          />
          <Form.Check
            type="radio"
            label="Excel"
            name="format"
            value="excel"
            checked={format === 'excel'}
            onChange={(e) => setFormat(e.target.value)}
            id="radio-excel"
            inline
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleExport}>
          Tải file
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ExportOptionsModal;