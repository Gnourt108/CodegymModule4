import { useState, useEffect } from 'react';
import { Tabs, Tab, Row, Col, Card, Form, Button, Modal, Alert, InputGroup } from 'react-bootstrap';
import { 
  BsArrowLeftRight, BsBoxSeam, BsPlusLg, BsExclamationTriangle, 
  BsCheckCircle, BsClockHistory, BsCartCheck, BsEye, BsShieldCheck, BsSearch 
} from 'react-icons/bs';
import { toast } from 'react-toastify';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { vattuService } from '../../services/vattuService';

export default function NhapXuatKho() {
  const [activeTab, setActiveTab] = useState('ton-kho');
  
  // Data States
  const [tonKhoList, setTonKhoList] = useState([]);
  const [giaoDichList, setGiaoDichList] = useState([]);
  const [phieuCapPhatList, setPhieuCapPhatList] = useState([]);
  const [danhMucList, setDanhMucList] = useState([]); // Danh sách vật tư từ danh mục
  const [loading, setLoading] = useState(true);

  // Filter States
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [gdTypeFilter, setGdTypeFilter] = useState('ALL'); // 'ALL' | 'IMPORT' | 'EXPORT'

  // Modal Chọn Vật tư (cho Nhập kho)
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [selectionSearch, setSelectionSearch] = useState('');

  // Modal Nhập kho nhanh (cho Tồn kho < 5)
  const [showQuickImportModal, setShowQuickImportModal] = useState(false);
  const [quickImportItem, setQuickImportItem] = useState(null);
  const [quickImportForm, setQuickImportForm] = useState({
    invoiceCode: '',
    soLuong: '',
    nguoiThucHien: 'Thủ kho vật tư'
  });
  const [quickImportErrors, setQuickImportErrors] = useState({});

  // Import Form State (chính)
  const [importForm, setImportForm] = useState({
    invoiceCode: '',
    maVatTu: '',
    soLuong: '',
    nguoiThucHien: 'Thủ kho vật tư'
  });
  const [importErrors, setImportErrors] = useState({});

  // Export Modal State
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedPhieu, setSelectedPhieu] = useState(null);

  // Load All Data
  const loadData = async () => {
    setLoading(true);
    try {
      const [tonKho, giaoDich, phieuCapPhat, dmTieuHao, dmThayThe] = await Promise.all([
        vattuService.getTonKho(),
        vattuService.getGiaoDich(),
        vattuService.getPhieuCapPhat(),
        vattuService.getDanhMucTieuHao(),
        vattuService.getDanhMucThayThe()
      ]);
      setTonKhoList(tonKho);
      setGiaoDichList(giaoDich);
      setPhieuCapPhatList(phieuCapPhat);
      setDanhMucList([...dmTieuHao, ...dmThayThe]);
    } catch (err) {
      toast.error('Lỗi khi tải dữ liệu kho: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Format Currency VND
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value || 0);
  };

  // Render Image
  const renderImage = (src, row) => {
    const defaultPlaceholder = 'https://placehold.co/40x40?text=' + encodeURIComponent(row.tenVatTu || 'VT');
    return (
      <img
        src={src || defaultPlaceholder}
        alt={row.tenVatTu}
        style={{
          width: '32px',
          height: '32px',
          objectFit: 'cover',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-color)',
        }}
        onError={(e) => {
          e.target.src = 'https://placehold.co/40x40?text=Err';
        }}
      />
    );
  };

  // Sync Invoice Code Suggestion on Import Form
  const suggestInvoiceCode = () => {
    const nextNum = Math.floor(Math.random() * 9000) + 1000;
    setImportForm(prev => ({
      ...prev,
      invoiceCode: `HDNK-${nextNum}`,
      maVatTu: '',
      soLuong: '',
    }));
    setImportErrors({});
  };

  useEffect(() => {
    if (activeTab === 'nhap-kho') {
      suggestInvoiceCode();
    }
  }, [activeTab]);

  // Quick Import Modal Actions
  const handleOpenQuickImport = (row) => {
    const nextNum = Math.floor(Math.random() * 9000) + 1000;
    setQuickImportItem(row);
    setQuickImportForm({
      invoiceCode: `HDNK-${nextNum}`,
      soLuong: '',
      nguoiThucHien: 'Thủ kho vật tư'
    });
    setQuickImportErrors({});
    setShowQuickImportModal(true);
  };

  const handleQuickImportSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!quickImportForm.invoiceCode.trim()) errors.invoiceCode = 'Mã hóa đơn không được để trống';
    if (!quickImportForm.soLuong || isNaN(quickImportForm.soLuong) || Number(quickImportForm.soLuong) <= 0) {
      errors.soLuong = 'Số lượng nhập phải lớn hơn 0';
    }
    if (!quickImportForm.nguoiThucHien.trim()) errors.nguoiThucHien = 'Người thực hiện không được để trống';

    if (Object.keys(errors).length > 0) {
      setQuickImportErrors(errors);
      return;
    }

    try {
      await vattuService.importVatTu(
        quickImportForm.invoiceCode.trim(),
        quickImportItem.maVatTu,
        quickImportForm.soLuong,
        quickImportForm.nguoiThucHien.trim()
      );
      toast.success(`Nhập kho nhanh ${quickImportItem.tenVatTu} thành công!`);
      setShowQuickImportModal(false);
      setQuickImportItem(null);
      loadData();
    } catch (err) {
      toast.error('Lỗi khi nhập kho nhanh: ' + err.message);
    }
  };

  // Main Import Actions
  const handleImportSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!importForm.invoiceCode.trim()) errors.invoiceCode = 'Mã hóa đơn không được để trống';
    if (!importForm.maVatTu) errors.maVatTu = 'Chưa chọn vật tư cần nhập';
    if (!importForm.soLuong || isNaN(importForm.soLuong) || Number(importForm.soLuong) <= 0) {
      errors.soLuong = 'Số lượng nhập phải lớn hơn 0';
    }
    if (!importForm.nguoiThucHien.trim()) errors.nguoiThucHien = 'Tên người thực hiện không được trống';

    if (Object.keys(errors).length > 0) {
      setImportErrors(errors);
      return;
    }

    try {
      await vattuService.importVatTu(
        importForm.invoiceCode.trim(),
        importForm.maVatTu,
        importForm.soLuong,
        importForm.nguoiThucHien.trim()
      );
      toast.success('Nhập kho vật tư thành công!');
      suggestInvoiceCode();
      loadData();
      setActiveTab('ton-kho');
    } catch (err) {
      toast.error('Lỗi khi nhập kho: ' + err.message);
    }
  };

  // Open Selection Modal for main Import Form
  const handleOpenSelection = () => {
    setSelectionSearch('');
    setShowSelectionModal(true);
  };

  const handleSelectMaterial = (item) => {
    setImportForm(prev => ({
      ...prev,
      maVatTu: item.maVatTu
    }));
    setImportErrors(prev => ({
      ...prev,
      maVatTu: undefined
    }));
    setShowSelectionModal(false);
  };

  // Export/Issue Actions
  const handleOpenExport = (phieu) => {
    setSelectedPhieu(phieu);
    setShowExportModal(true);
  };

  const handleConfirmExport = async () => {
    if (!selectedPhieu) return;
    try {
      await vattuService.exportVatTu(selectedPhieu.id);
      toast.success(`Cấp phát thành công cho phiếu ${selectedPhieu.id}!`);
      setShowExportModal(false);
      setSelectedPhieu(null);
      loadData();
    } catch (err) {
      toast.error('Lỗi khi cấp phát: ' + err.message);
    }
  };

  // Filtering Inventory Items
  const filteredTonKho = tonKhoList.filter(item => {
    if (showLowStockOnly) {
      return item.soLuong < 5;
    }
    return true;
  });

  // Filtering Transaction History Items
  const filteredGiaoDich = giaoDichList.filter(item => {
    if (gdTypeFilter === 'ALL') return true;
    return item.loaiGiaoDich === gdTypeFilter;
  });

  // Filtering Materials in Selection Modal
  const filteredSelection = danhMucList.filter(item => {
    if (!selectionSearch.trim()) return true;
    const q = selectionSearch.toLowerCase();
    return (
      item.maVatTu.toLowerCase().includes(q) ||
      item.tenVatTu.toLowerCase().includes(q) ||
      (item.nhaSanXuat || '').toLowerCase().includes(q)
    );
  });

  // Count items for Stats Cards
  const totalStockItems = tonKhoList.length;
  const lowStockCount = tonKhoList.filter(item => item.soLuong < 5).length;
  const totalConsumables = tonKhoList.filter(item => item.loai === 'TIÊU HAO').length;
  const totalReplacements = tonKhoList.filter(item => item.loai === 'THAY THẾ').length;

  // Selected material info for Import Form
  const selectedMaterialInfo = danhMucList.find(item => item.maVatTu === importForm.maVatTu);

  // DataTable columns
  const tonKhoColumns = [
    { key: 'hinhAnh', label: 'Hình ảnh', sortable: false, width: 80, render: renderImage },
    { key: 'maVatTu', label: 'Mã vật tư', mono: true, width: 110 },
    { key: 'tenVatTu', label: 'Tên vật tư', sortable: true },
    { key: 'nhaSanXuat', label: 'Nhà sản xuất', sortable: true, width: 150 },
    { key: 'donGia', label: 'Đơn giá', sortable: true, width: 140, render: (val) => formatCurrency(val) },
    { key: 'donVi', label: 'ĐVT', width: 80 },
    { 
      key: 'soLuong', 
      label: 'Số tồn', 
      width: 100,
      render: (val) => {
        let textClass = 'fw-bold';
        if (val === 0) textClass += ' text-danger';
        else if (val < 5) textClass += ' text-warning';
        else textClass += ' text-success';
        return <span className={textClass}>{val}</span>;
      }
    },
    {
      key: 'status',
      label: 'Trạng thái',
      width: 140,
      render: (_, row) => {
        if (row.soLuong === 0) {
          return <StatusBadge status="danger" label="Hết hàng" pulse />;
        }
        if (row.soLuong < 5) {
          return <StatusBadge status="warning" label="Sắp hết (< 5)" />;
        }
        return <StatusBadge status="normal" label="An toàn" />;
      }
    }
  ];

  const phieuCapPhatColumns = [
    { key: 'id', label: 'Mã phiếu cấp', mono: true, width: 140 },
    { key: 'nguonYeuCau', label: 'Nguồn yêu cầu', mono: true, width: 140 },
    { key: 'noiDung', label: 'Nội dung công việc' },
    { key: 'nguoiTao', label: 'Người yêu cầu' },
    { key: 'ngayTao', label: 'Ngày tạo', width: 150 },
    { 
      key: 'trangThai', 
      label: 'Trạng thái', 
      width: 140,
      render: (val) => {
        if (val === 'CHỜ_CẤP_PHÁT') {
          return <StatusBadge status="warning" label="Chờ cấp phát" />;
        }
        return <StatusBadge status="normal" label="Đã cấp phát" />;
      }
    }
  ];

  const giaoDichColumns = [
    { key: 'maHoaDon', label: 'Số chứng từ/HĐ', mono: true, width: 140 },
    { key: 'ngay', label: 'Ngày giờ', width: 150 },
    { key: 'maVatTu', label: 'Mã vật tư', mono: true, width: 120 },
    { key: 'tenVatTu', label: 'Tên vật tư' },
    { 
      key: 'loaiGiaoDich', 
      label: 'Loại GD', 
      width: 120,
      render: (val) => {
        if (val === 'IMPORT') {
          return <StatusBadge status="info" label="Nhập kho" />;
        }
        return <StatusBadge status="warning" label="Xuất kho" />;
      }
    },
    { 
      key: 'soLuong', 
      label: 'Số lượng', 
      width: 100, 
      render: (val, row) => (
        <span className={`fw-semibold ${row.loaiGiaoDich === 'IMPORT' ? 'text-success' : 'text-danger'}`}>
          {row.loaiGiaoDich === 'IMPORT' ? '+' : '-'}{val}
        </span>
      )
    },
    { key: 'donVi', label: 'ĐVT', width: 80 },
    { key: 'nguoiThucHien', label: 'Thủ kho thực hiện', width: 140 }
  ];

  return (
    <div className="animate-fade-in pb-4">
      <PageHeader
        title="Nhập / Xuất kho & Tồn kho"
        subtitle="Quản lý xuất nhập vật tư chi tiết, theo dõi tồn kho và cấp phát vật tư theo phiếu công tác"
        icon={<BsArrowLeftRight />}
      />

      {/* Summary Cards */}
      <Row className="g-3 mb-4">
        <Col xs={6} md={3}>
          <div className="stat-card surface-card">
            <div className="stat-card-icon" style={{ color: 'var(--color-primary-500)' }}>
              <BsBoxSeam />
            </div>
            <div className="stat-card-body">
              <span className="stat-card-value">{totalStockItems}</span>
              <span className="stat-card-label">Tổng mặt hàng</span>
            </div>
          </div>
        </Col>
        <Col xs={6} md={3}>
          <div className="stat-card surface-card">
            <div className="stat-card-icon" style={{ color: 'var(--color-status-danger)' }}>
              <BsExclamationTriangle />
            </div>
            <div className="stat-card-body">
              <span className="stat-card-value text-danger">{lowStockCount}</span>
              <span className="stat-card-label">Tồn kho dưới 5</span>
            </div>
          </div>
        </Col>
        <Col xs={6} md={3}>
          <div className="stat-card surface-card">
            <div className="stat-card-icon" style={{ color: 'var(--color-status-info)' }}>
              <BsCartCheck />
            </div>
            <div className="stat-card-body">
              <span className="stat-card-value">{totalConsumables}</span>
              <span className="stat-card-label">Vật tư tiêu hao</span>
            </div>
          </div>
        </Col>
        <Col xs={6} md={3}>
          <div className="stat-card surface-card">
            <div className="stat-card-icon" style={{ color: 'var(--color-status-normal)' }}>
              <BsCheckCircle />
            </div>
            <div className="stat-card-body">
              <span className="stat-card-value">{totalReplacements}</span>
              <span className="stat-card-label">Vật tư thay thế</span>
            </div>
          </div>
        </Col>
      </Row>

      {/* Tabs */}
      <div className="surface-card p-2" style={{ borderRadius: 'var(--radius-lg)' }}>
        <Tabs
          id="kho-trans-tabs"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="border-0 custom-nav-tabs"
        >
          {/* TAB 1: TỒN KHO HIỆN TẠI */}
          <Tab eventKey="ton-kho" title="📋 Tồn kho hiện tại">
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <div>
                  <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>
                    Bảng theo dõi Tồn kho
                  </h2>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 0 }}>
                    Theo dõi số lượng thực tế trong kho và nhập kho nhanh đối với vật tư sắp hết.
                  </p>
                </div>
                <Form.Check 
                  type="switch"
                  id="filter-low-stock"
                  label="Chỉ hiện mặt hàng sắp hết kho (< 5)"
                  checked={showLowStockOnly}
                  onChange={(e) => setShowLowStockOnly(e.target.checked)}
                  className="fw-medium text-warning"
                  style={{ cursor: 'pointer' }}
                />
              </div>

              <DataTable
                columns={tonKhoColumns}
                data={filteredTonKho}
                loading={loading}
                pageSize={10}
                searchPlaceholder="Tìm mã, tên hoặc hãng sản xuất trong kho..."
                renderActions={(row) => (
                  row.soLuong < 5 ? (
                    <Button 
                      className="btn btn-sm btn-outline-warning d-flex align-items-center gap-1 fw-bold"
                      onClick={() => handleOpenQuickImport(row)}
                      title="Thao tác nhập kho nhanh"
                    >
                      <BsPlusLg /> Nhập kho
                    </Button>
                  ) : (
                    <span className="text-muted" style={{ fontSize: 'var(--text-xs)' }}>Đủ số lượng</span>
                  )
                )}
              />
            </div>
          </Tab>

          {/* TAB 2: NHẬP KHO */}
          <Tab eventKey="nhap-kho" title="📥 Nhập kho (Import)">
            <div className="p-3">
              <Row>
                <Col lg={7}>
                  <Card>
                    <Card.Header className="d-flex align-items-center gap-2">
                      <BsPlusLg className="text-success" />
                      <span>Phiếu Nhập kho Vật tư</span>
                    </Card.Header>
                    <Card.Body>
                      <Form onSubmit={handleImportSubmit}>
                        <Row className="g-3">
                          <Col md={6}>
                            <Form.Group controlId="importInvoice">
                              <Form.Label>Số chứng từ / Mã hóa đơn <span className="text-danger">*</span></Form.Label>
                              <Form.Control
                                type="text"
                                value={importForm.invoiceCode}
                                onChange={(e) => setImportForm({ ...importForm, invoiceCode: e.target.value })}
                                isInvalid={!!importErrors.invoiceCode}
                                className="font-mono fw-bold text-uppercase"
                              />
                              <Form.Control.Feedback type="invalid">
                                {importErrors.invoiceCode}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>

                          <Col md={6}>
                            <Form.Group controlId="importKeeper">
                              <Form.Label>Thủ kho thực hiện <span className="text-danger">*</span></Form.Label>
                              <Form.Control
                                type="text"
                                value={importForm.nguoiThucHien}
                                onChange={(e) => setImportForm({ ...importForm, nguoiThucHien: e.target.value })}
                                isInvalid={!!importErrors.nguoiThucHien}
                              />
                              <Form.Control.Feedback type="invalid">
                                {importErrors.nguoiThucHien}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>

                          <Col md={12}>
                            <Form.Group controlId="importMaterial">
                              <Form.Label>Vật tư cần nhập <span className="text-danger">*</span></Form.Label>
                              <InputGroup>
                                <Form.Control
                                  type="text"
                                  placeholder="Nhấp nút bên cạnh để chọn vật tư..."
                                  readOnly
                                  value={
                                    selectedMaterialInfo 
                                      ? `${selectedMaterialInfo.maVatTu} - ${selectedMaterialInfo.tenVatTu} (${selectedMaterialInfo.nhaSanXuat})` 
                                      : ''
                                  }
                                  isInvalid={!!importErrors.maVatTu}
                                  style={{ backgroundColor: 'var(--bg-body)' }}
                                />
                                <Button 
                                  variant="outline-secondary" 
                                  onClick={handleOpenSelection}
                                  className="d-flex align-items-center gap-1"
                                >
                                  <BsSearch /> Chọn vật tư...
                                </Button>
                                <Form.Control.Feedback type="invalid">
                                  {importErrors.maVatTu}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </Col>

                          {selectedMaterialInfo && (
                            <Col md={12}>
                              <div className="p-3 bg-light rounded border d-flex gap-3 align-items-center" style={{ borderLeft: '4px solid var(--color-primary-500)' }}>
                                <img
                                  src={selectedMaterialInfo.hinhAnh || 'https://placehold.co/80x80?text=VT'}
                                  alt="Ảnh vật tư"
                                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', flexShrink: 0 }}
                                  onError={(e) => { e.target.src = 'https://placehold.co/80x80?text=VT'; }}
                                />
                                <div className="flex-grow-1 table-responsive mb-0">
                                  <table className="table table-sm table-bordered bg-white mb-0 align-middle" style={{ fontSize: 'var(--text-xs)' }}>
                                    <tbody>
                                      <tr>
                                        <td className="bg-light fw-semibold text-secondary" style={{ width: '100px' }}>Mã vật tư</td>
                                        <td className="font-mono">{selectedMaterialInfo.maVatTu}</td>
                                        <td className="bg-light fw-semibold text-secondary" style={{ width: '100px' }}>Tên vật tư</td>
                                        <td className="fw-bold">{selectedMaterialInfo.tenVatTu}</td>
                                      </tr>
                                      <tr>
                                        <td className="bg-light fw-semibold text-secondary">Nhà sản xuất</td>
                                        <td>{selectedMaterialInfo.nhaSanXuat || 'Chưa rõ'}</td>
                                        <td className="bg-light fw-semibold text-secondary">Đơn giá</td>
                                        <td className="text-success fw-bold">{formatCurrency(selectedMaterialInfo.donGia)}</td>
                                      </tr>
                                      <tr>
                                        <td className="bg-light fw-semibold text-secondary">Đơn vị tính</td>
                                        <td>{selectedMaterialInfo.donVi}</td>
                                        <td className="bg-light fw-semibold text-secondary">Chi tiết/Vị trí</td>
                                        <td>{selectedMaterialInfo.viTri || selectedMaterialInfo.moTa}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </Col>
                          )}

                          <Col md={6}>
                            <Form.Group controlId="importQty">
                              <Form.Label>Số lượng nhập kho <span className="text-danger">*</span></Form.Label>
                              <Form.Control
                                type="number"
                                placeholder="Nhập số lượng..."
                                value={importForm.soLuong}
                                onChange={(e) => setImportForm({ ...importForm, soLuong: e.target.value })}
                                isInvalid={!!importErrors.soLuong}
                              />
                              <Form.Control.Feedback type="invalid">
                                {importErrors.soLuong}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>

                          <Col md={6} className="d-flex align-items-end">
                            <Form.Group className="w-100">
                              <Form.Label>Đơn vị tính</Form.Label>
                              <Form.Control
                                type="text"
                                disabled
                                value={selectedMaterialInfo ? selectedMaterialInfo.donVi : 'Chưa chọn'}
                                className="bg-light fw-bold"
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <div className="d-flex gap-2 mt-4">
                          <Button type="submit" variant="primary" className="d-flex align-items-center gap-2">
                            <BsPlusLg /> Xác nhận nhập kho
                          </Button>
                          <Button variant="outline-secondary" onClick={suggestInvoiceCode}>
                            Làm mới form
                          </Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>

                <Col lg={5}>
                  <Card style={{ height: '100%' }}>
                    <Card.Header>Quy trình & Hướng dẫn Nhập kho</Card.Header>
                    <Card.Body style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                      <p className="fw-bold">Các bước thực hiện:</p>
                      <ol className="ps-3 mb-4">
                        <li className="mb-2">Kiểm tra thông số, chủng loại của vật tư thực tế so với hóa đơn vận chuyển.</li>
                        <li className="mb-2">Bấm <strong>Chọn vật tư...</strong> để tìm kiếm theo mã, tên hoặc nhà sản xuất và đối chiếu ảnh minh họa trước khi nhập.</li>
                        <li className="mb-2">Điền chính xác số lượng nhập thực tế.</li>
                        <li className="mb-2">Hệ thống tự động cộng tồn kho và sinh ra lịch sử giao dịch.</li>
                      </ol>

                      <Alert variant="info" className="mb-0">
                        <h6 className="alert-heading fw-bold mb-1" style={{ fontSize: 'var(--text-sm)' }}>Lưu ý an toàn:</h6>
                        <p className="mb-0" style={{ fontSize: 'var(--text-xs)' }}>
                          Đối với dầu mỡ bôi trơn và hóa chất tẩy rửa (RP7,...), thủ kho cần xếp vào khu vực riêng biệt có trang bị thiết bị phòng cháy chữa cháy chuyên dụng theo quy định của nhà máy.
                        </p>
                      </Alert>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Tab>

          {/* TAB 3: CẤP PHÁT / XUẤT KHO */}
          <Tab eventKey="xuat-kho" title="📤 Cấp phát / Xuất kho">
            <div className="p-3">
              <div className="mb-3">
                <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>
                  Danh sách Phiếu yêu cầu cấp phát vật tư
                </h2>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 0 }}>
                  Danh sách này bao gồm các yêu cầu xuất vật tư tiêu hao từ Phiếu Công tác (PCT) hoặc vật tư thay thế từ Biên bản kỹ thuật (BBKT).
                </p>
              </div>

              <DataTable
                columns={phieuCapPhatColumns}
                data={phieuCapPhatList}
                loading={loading}
                pageSize={10}
                searchPlaceholder="Tìm kiếm theo mã phiếu, mã PCT, BBKT hoặc người tạo..."
                renderActions={(row) => (
                  <Button 
                    className={`btn btn-sm d-flex align-items-center gap-1 ${row.trangThai === 'CHỜ_CẤP_PHÁT' ? 'btn-outline-primary' : 'btn-outline-secondary'}`}
                    onClick={() => handleOpenExport(row)}
                  >
                    {row.trangThai === 'CHỜ_CẤP_PHÁT' ? (
                      <>
                        <BsShieldCheck /> Cấp phát
                      </>
                    ) : (
                      <>
                        <BsEye /> Xem chi tiết
                      </>
                    )}
                  </Button>
                )}
              />
            </div>
          </Tab>

          {/* TAB 4: LỊCH SỬ GIAO DỊCH */}
          <Tab eventKey="lich-su" title="⏱️ Lịch sử giao dịch">
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <div>
                  <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>
                    Nhật ký Giao dịch kho
                  </h2>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 0 }}>
                    Danh sách các hoạt động xuất kho và nhập kho được ghi nhận theo thời gian thực.
                  </p>
                </div>
                
                <Form.Group controlId="filterType" className="d-flex align-items-center gap-2">
                  <Form.Label className="mb-0 text-nowrap fw-medium">Lọc loại giao dịch:</Form.Label>
                  <Form.Select 
                    value={gdTypeFilter} 
                    onChange={(e) => setGdTypeFilter(e.target.value)}
                    size="sm"
                    style={{ width: 150 }}
                  >
                    <option value="ALL">Tất cả</option>
                    <option value="IMPORT">Nhập kho (+)</option>
                    <option value="EXPORT">Xuất kho (-)</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <DataTable
                columns={giaoDichColumns}
                data={filteredGiaoDich}
                loading={loading}
                pageSize={10}
                searchPlaceholder="Tìm kiếm theo mã chứng từ, mã vật tư, người thực hiện..."
              />
            </div>
          </Tab>
        </Tabs>
      </div>

      {/* QUICK IMPORT MODAL (Dành cho sản phẩm < 5) */}
      <Modal show={showQuickImportModal} onHide={() => setShowQuickImportModal(false)} centered>
        <Form onSubmit={handleQuickImportSubmit}>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)' }}>
              Nhập kho nhanh vật tư sắp hết
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {quickImportItem && (
              <div className="d-flex gap-3 align-items-start mb-3 p-2 bg-light rounded" style={{ fontSize: 'var(--text-xs)' }}>
                <img
                  src={quickImportItem.hinhAnh || 'https://placehold.co/60x60?text=VT'}
                  alt="Vật tư"
                  style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                />
                <div>
                  <strong>{quickImportItem.tenVatTu}</strong> ({quickImportItem.maVatTu})
                  <br />
                  - Nhà SX: <strong>{quickImportItem.nhaSanXuat}</strong>
                  <br />
                  - Số lượng tồn hiện tại: <strong className="text-danger">{quickImportItem.soLuong} {quickImportItem.donVi}</strong>
                </div>
              </div>
            )}
            <Row className="g-3">
              <Col md={12}>
                <Form.Group controlId="quickImportInvoice">
                  <Form.Label style={{ fontSize: 'var(--text-xs)' }}>Số chứng từ / Mã hóa đơn <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={quickImportForm.invoiceCode}
                    onChange={(e) => setQuickImportForm({ ...quickImportForm, invoiceCode: e.target.value })}
                    isInvalid={!!quickImportErrors.invoiceCode}
                    className="font-mono text-uppercase"
                  />
                  <Form.Control.Feedback type="invalid">
                    {quickImportErrors.invoiceCode}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="quickImportQty">
                  <Form.Label style={{ fontSize: 'var(--text-xs)' }}>Số lượng nhập <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Nhập số lượng..."
                    value={quickImportForm.soLuong}
                    onChange={(e) => setQuickImportForm({ ...quickImportForm, soLuong: e.target.value })}
                    isInvalid={!!quickImportErrors.soLuong}
                  />
                  <Form.Control.Feedback type="invalid">
                    {quickImportErrors.soLuong}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="quickImportUnit">
                  <Form.Label style={{ fontSize: 'var(--text-xs)' }}>Đơn vị tính</Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    value={quickImportItem ? quickImportItem.donVi : ''}
                    className="bg-light"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="btn-sm" onClick={() => setShowQuickImportModal(false)}>Hủy bỏ</Button>
            <Button type="submit" variant="primary" className="btn-sm">Nhập kho</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* SELECT MATERIAL SEARCH MODAL */}
      <Modal show={showSelectionModal} onHide={() => setShowSelectionModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)' }}>
            Tìm kiếm & Chọn Vật tư
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Search Box inside Modal */}
          <div className="mb-3">
            <InputGroup>
              <InputGroup.Text><BsSearch /></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Tìm kiếm vật tư theo mã, tên hoặc hãng sản xuất..."
                value={selectionSearch}
                onChange={(e) => setSelectionSearch(e.target.value)}
              />
            </InputGroup>
            <div className="text-muted mt-1" style={{ fontSize: '11px' }}>
              Hiển thị {filteredSelection.length} vật tư phù hợp trong hệ thống.
            </div>
          </div>

          {/* Table list */}
          <div className="table-responsive border rounded" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table className="table table-hover mb-0 align-middle" style={{ fontSize: 'var(--text-sm)' }}>
              <thead className="bg-light" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                <tr>
                  <th style={{ width: '70px' }}>Ảnh</th>
                  <th style={{ width: '120px' }}>Mã vật tư</th>
                  <th>Tên vật tư</th>
                  <th>Nhà sản xuất</th>
                  <th>Đơn giá</th>
                  <th style={{ width: '80px' }}>ĐVT</th>
                  <th style={{ width: '80px' }}>Chọn</th>
                </tr>
              </thead>
              <tbody>
                {filteredSelection.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-muted p-4">
                      Không tìm thấy vật tư nào phù hợp với từ khóa tìm kiếm.
                    </td>
                  </tr>
                ) : (
                  filteredSelection.map((item, idx) => (
                    <tr key={item.maVatTu || idx}>
                      <td>{renderImage(item.hinhAnh, item)}</td>
                      <td className="font-mono">{item.maVatTu}</td>
                      <td>
                        <div className="fw-semibold">{item.tenVatTu}</div>
                        <div className="text-muted" style={{ fontSize: '11px', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {item.moTa}
                        </div>
                      </td>
                      <td>{item.nhaSanXuat}</td>
                      <td className="fw-medium text-success">{formatCurrency(item.donGia)}</td>
                      <td>{item.donVi}</td>
                      <td>
                        <Button 
                          variant="primary" 
                          size="sm" 
                          onClick={() => handleSelectMaterial(item)}
                          style={{ padding: '0.2rem 0.5rem', fontSize: 'var(--text-xs)' }}
                        >
                          Chọn
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn-sm" onClick={() => setShowSelectionModal(false)}>Đóng</Button>
        </Modal.Footer>
      </Modal>

      {/* Export / Issuance Approval Modal */}
      <Modal show={showExportModal} onHide={() => setShowExportModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>
            Chi tiết Yêu cầu cấp phát vật tư
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPhieu && (
            <>
              {/* Header Info */}
              <div className="p-3 bg-light rounded mb-4" style={{ fontSize: 'var(--text-sm)' }}>
                <Row className="g-2">
                  <Col md={6}>Mã phiếu cấp phát: <strong className="font-mono">{selectedPhieu.id}</strong></Col>
                  <Col md={6}>Liên kết: <strong className="font-mono">{selectedPhieu.nguonYeuCau}</strong></Col>
                  <Col md={6}>Người yêu cầu: <strong>{selectedPhieu.nguoiTao}</strong></Col>
                  <Col md={6}>Ngày tạo yêu cầu: <strong>{selectedPhieu.ngayTao}</strong></Col>
                  <Col md={12}>Nội dung công việc: {selectedPhieu.noiDung}</Col>
                  <Col md={6}>
                    Phân loại vật tư: <strong className="badge bg-secondary">{selectedPhieu.loaiVatTu}</strong>
                  </Col>
                  <Col md={6}>
                    Trạng thái: <StatusBadge 
                      status={selectedPhieu.trangThai === 'CHỜ_CẤP_PHÁT' ? 'warning' : 'normal'} 
                      label={selectedPhieu.trangThai === 'CHỜ_CẤP_PHÁT' ? 'Chờ cấp phát' : 'Đã cấp phát'} 
                    />
                  </Col>
                </Row>
              </div>

              {/* Items List & Stock Check */}
              <h5 className="mb-3" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)' }}>
                Danh sách vật tư yêu cầu cấp phát:
              </h5>
              
              <div className="table-responsive border rounded mb-3">
                <table className="table mb-0 align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th>#</th>
                      <th>Mã vật tư</th>
                      <th>Tên vật tư</th>
                      <th>Số lượng yêu cầu</th>
                      <th>Đơn vị</th>
                      <th>Tồn kho hiện tại</th>
                      <th>Đánh giá khả dụng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPhieu.items.map((item, idx) => {
                      const stockObj = tonKhoList.find(s => s.maVatTu === item.maVatTu);
                      const currentStock = stockObj ? stockObj.soLuong : 0;
                      const hasEnough = currentStock >= item.soLuongYeuCau;
                      
                      return (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td className="font-mono">{item.maVatTu}</td>
                          <td>{item.tenVatTu}</td>
                          <td className="fw-bold">{item.soLuongYeuCau}</td>
                          <td>{item.donVi}</td>
                          <td className="fw-semibold">{currentStock}</td>
                          <td>
                            {hasEnough ? (
                              <span className="text-success fw-medium d-flex align-items-center gap-1">
                                <BsCheckCircle /> Đủ tồn kho
                              </span>
                            ) : (
                              <span className="text-danger fw-bold d-flex align-items-center gap-1">
                                <BsExclamationTriangle /> Thiếu hàng
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Check global availability */}
              {selectedPhieu.trangThai === 'CHỜ_CẤP_PHÁT' && (
                (() => {
                  const hasStockErrors = selectedPhieu.items.some(item => {
                    const stockObj = tonKhoList.find(s => s.maVatTu === item.maVatTu);
                    return !stockObj || stockObj.soLuong < item.soLuongYeuCau;
                  });

                  return (
                    <div>
                      {hasStockErrors ? (
                        <Alert variant="danger" className="d-flex align-items-center gap-2 mb-0">
                          <BsExclamationTriangle style={{ fontSize: '1.25rem' }} />
                          <div>
                            <strong>Không thể cấp phát:</strong> Hiện tại kho hàng không đủ số lượng tồn của một số mặt hàng được yêu cầu. Vui lòng bổ sung tồn kho bằng phiếu nhập kho trước khi cấp phát.
                          </div>
                        </Alert>
                      ) : (
                        <Alert variant="success" className="d-flex align-items-center gap-2 mb-0">
                          <BsCheckCircle style={{ fontSize: '1.25rem' }} />
                          <div>
                            <strong>Hợp lệ:</strong> Tất cả vật tư yêu cầu đều sẵn sàng trong kho. Thủ kho có thể tiến hành cấp phát.
                          </div>
                        </Alert>
                      )}

                      <div className="d-flex justify-content-end gap-2 mt-4">
                        <Button variant="secondary" className="btn-sm" onClick={() => setShowExportModal(false)}>
                          Bỏ qua
                        </Button>
                        <Button 
                          variant="primary" 
                          className="btn-sm d-flex align-items-center gap-2"
                          disabled={hasStockErrors}
                          onClick={handleConfirmExport}
                        >
                          <BsShieldCheck /> Xác nhận Cấp phát & Xuất kho
                        </Button>
                      </div>
                    </div>
                  );
                })()
              )}

              {selectedPhieu.trangThai === 'ĐÃ_CẤP_PHÁT' && (
                <div className="mt-3">
                  <Alert variant="light" className="border text-center text-muted mb-0">
                    Phiếu yêu cầu này đã được cấp phát vào lúc <strong>{selectedPhieu.ngayCapPhat}</strong> bởi thủ kho.
                  </Alert>
                  <div className="d-flex justify-content-end mt-4">
                    <Button variant="secondary" className="btn-sm" onClick={() => setShowExportModal(false)}>
                      Đóng
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
