import { useState, useEffect } from 'react';
import { Tabs, Tab, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { BsTags, BsPlusLg, BsInfoCircle, BsExclamationTriangle } from 'react-icons/bs';
import { toast } from 'react-toastify';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import ConfirmModal from '../../components/common/ConfirmModal';
import { vattuService } from '../../services/vattuService';

export default function DanhMucVatTu() {
  const [activeTab, setActiveTab] = useState('tieu-hao');
  const [tieuHaoList, setTieuHaoList] = useState([]);
  const [thayTheList, setThayTheList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [formData, setFormData] = useState({
    maVatTu: '',
    tenVatTu: '',
    donVi: '',
    moTa: '',
    viTri: '', // Chỉ dùng cho vật tư thay thế
    donGia: '',
    nhaSanXuat: '',
    hinhAnh: '',
  });
  const [formErrors, setFormErrors] = useState({});

  // Delete Confirm State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          hinhAnh: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Load Data
  const loadData = async () => {
    setLoading(true);
    try {
      const [tieuHao, thayThe] = await Promise.all([
        vattuService.getDanhMucTieuHao(),
        vattuService.getDanhMucThayThe(),
      ]);
      setTieuHaoList(tieuHao);
      setThayTheList(thayThe);
    } catch (err) {
      toast.error('Lỗi khi tải danh mục vật tư: ' + err.message);
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

  // Render Image Column
  const renderImage = (src, row) => {
    const defaultPlaceholder = 'https://placehold.co/40x40?text=' + encodeURIComponent(row.tenVatTu || 'VT');
    return (
      <img
        src={src || defaultPlaceholder}
        alt={row.tenVatTu}
        style={{
          width: '38px',
          height: '38px',
          objectFit: 'cover',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
        }}
        onError={(e) => {
          e.target.src = 'https://placehold.co/40x40?text=Err';
        }}
      />
    );
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.maVatTu.trim()) {
      errors.maVatTu = 'Mã vật tư không được để trống';
    } else {
      const prefix = activeTab === 'tieu-hao' ? 'MVTH-' : 'VTTT-';
      if (!formData.maVatTu.startsWith(prefix)) {
        errors.maVatTu = `Mã vật tư phải bắt đầu bằng ${prefix}`;
      }
      
      // Check trùng mã khi thêm mới
      if (modalMode === 'add') {
        const listToCheck = activeTab === 'tieu-hao' ? tieuHaoList : thayTheList;
        if (listToCheck.some(item => item.maVatTu.toLowerCase() === formData.maVatTu.trim().toLowerCase())) {
          errors.maVatTu = 'Mã vật tư này đã tồn tại';
        }
      }
    }

    if (!formData.tenVatTu.trim()) {
      errors.tenVatTu = 'Tên vật tư không được để trống';
    }

    if (!formData.donVi.trim()) {
      errors.donVi = 'Đơn vị tính không được để trống';
    }

    if (!formData.nhaSanXuat.trim()) {
      errors.nhaSanXuat = 'Nhà sản xuất không được để trống';
    }

    if (formData.donGia === '' || isNaN(formData.donGia) || Number(formData.donGia) < 0) {
      errors.donGia = 'Đơn giá phải là số và không âm';
    }

    if (!formData.moTa.trim()) {
      errors.moTa = 'Mô tả chung không được để trống';
    }

    if (activeTab === 'thay-the' && !formData.viTri.trim()) {
      errors.viTri = 'Vị trí lắp đặt/thay thế không được để trống';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setModalMode('add');
    const prefix = activeTab === 'tieu-hao' ? 'MVTH' : 'VTTT';
    const currentList = activeTab === 'tieu-hao' ? tieuHaoList : thayTheList;
    
    let nextNum = 1;
    if (currentList.length > 0) {
      const nums = currentList
        .map(item => {
          const parts = item.maVatTu.split('-');
          return parts.length > 1 ? parseInt(parts[1], 10) : 0;
        })
        .filter(n => !isNaN(n));
      if (nums.length > 0) {
        nextNum = Math.max(...nums) + 1;
      }
    }
    const suggestedCode = `${prefix}-${String(nextNum).padStart(3, '0')}`;
    const randomSeed = Math.floor(Math.random() * 1000);

    setFormData({
      maVatTu: suggestedCode,
      tenVatTu: '',
      donVi: activeTab === 'tieu-hao' ? 'Chai' : 'Bộ',
      moTa: '',
      viTri: '',
      donGia: 0,
      nhaSanXuat: '',
      hinhAnh: `https://picsum.photos/seed/${randomSeed}/200`,
    });
    setFormErrors({});
    setShowModal(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item) => {
    setModalMode('edit');
    setFormData({
      maVatTu: item.maVatTu,
      tenVatTu: item.tenVatTu,
      donVi: item.donVi,
      moTa: item.moTa,
      viTri: item.viTri || '',
      donGia: item.donGia || 0,
      nhaSanXuat: item.nhaSanXuat || '',
      hinhAnh: item.hinhAnh || '',
    });
    setFormErrors({});
    setShowModal(true);
  };

  // Handle Save
  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (activeTab === 'tieu-hao') {
        if (modalMode === 'add') {
          await vattuService.addDanhMucTieuHao(formData);
          toast.success('Thêm mới vật tư tiêu hao thành công!');
        } else {
          await vattuService.updateDanhMucTieuHao(formData.maVatTu, formData);
          toast.success('Cập nhật vật tư tiêu hao thành công!');
        }
      } else {
        if (modalMode === 'add') {
          await vattuService.addDanhMucThayThe(formData);
          toast.success('Thêm mới vật tư thay thế thành công!');
        } else {
          await vattuService.updateDanhMucThayThe(formData.maVatTu, formData);
          toast.success('Cập nhật vật tư thay thế thành công!');
        }
      }
      setShowModal(false);
      loadData();
    } catch (err) {
      toast.error('Lỗi khi lưu thông tin: ' + err.message);
    }
  };

  // Handle Delete Click
  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      if (activeTab === 'tieu-hao') {
        await vattuService.deleteDanhMucTieuHao(itemToDelete.maVatTu);
      } else {
        await vattuService.deleteDanhMucThayThe(itemToDelete.maVatTu);
      }
      toast.success('Xoá vật tư khỏi danh mục thành công!');
      setShowDeleteModal(false);
      setItemToDelete(null);
      loadData();
    } catch (err) {
      toast.error('Lỗi khi xoá vật tư: ' + err.message);
    }
  };

  // Table Columns Setup
  const tieuHaoColumns = [
    { key: 'hinhAnh', label: 'Hình ảnh', sortable: false, width: 80, render: renderImage },
    { key: 'maVatTu', label: 'Mã vật tư', mono: true, width: 110 },
    { key: 'tenVatTu', label: 'Tên vật tư', sortable: true },
    { key: 'nhaSanXuat', label: 'Nhà sản xuất', sortable: true, width: 150 },
    { key: 'donGia', label: 'Đơn giá', sortable: true, width: 140, render: (val) => formatCurrency(val) },
    { key: 'moTa', label: 'Mô tả chi tiết', sortable: false },
    { key: 'donVi', label: 'ĐVT', width: 90 },
  ];

  const thayTheColumns = [
    { key: 'hinhAnh', label: 'Hình ảnh', sortable: false, width: 80, render: renderImage },
    { key: 'maVatTu', label: 'Mã vật tư', mono: true, width: 110 },
    { key: 'tenVatTu', label: 'Tên vật tư', sortable: true },
    { key: 'viTri', label: 'Vị trí thay mới/lắp đặt', sortable: true, width: 180 },
    { key: 'nhaSanXuat', label: 'Nhà sản xuất', sortable: true, width: 150 },
    { key: 'donGia', label: 'Đơn giá', sortable: true, width: 140, render: (val) => formatCurrency(val) },
    { key: 'moTa', label: 'Thông số kỹ thuật/Mô tả', sortable: false },
    { key: 'donVi', label: 'ĐVT', width: 90 },
  ];

  return (
    <div className="animate-fade-in pb-4">
      <PageHeader
        title="Danh mục Vật tư"
        subtitle="Khai báo và quản lý mã danh mục vật tư tiêu hao, vật tư thay thế, hãng sản xuất và đơn giá vật tư"
        icon={<BsTags />}
      />

      {/* Tab controls */}
      <div className="surface-card mb-4 p-2" style={{ borderRadius: 'var(--radius-lg)' }}>
        <Tabs
          id="danhmuc-tabs"
          activeKey={activeTab}
          onSelect={(k) => {
            setActiveTab(k);
            setFormErrors({});
          }}
          className="border-0 custom-nav-tabs"
        >
          <Tab eventKey="tieu-hao" title="📦 Vật tư tiêu hao (Consumable)">
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <div>
                  <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>
                    Danh sách Vật tư tiêu hao
                  </h2>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 0 }}>
                    Vật tư phụ trợ hao hụt trong quá trình sửa chữa như dầu mỡ, RP7, dẻ lau...
                  </p>
                </div>
                <Button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleOpenAdd}>
                  <BsPlusLg /> Thêm vật tư tiêu hao
                </Button>
              </div>

              <DataTable
                columns={tieuHaoColumns}
                data={tieuHaoList}
                loading={loading}
                pageSize={10}
                searchPlaceholder="Tìm tên, mã, hãng sản xuất hoặc mô tả vật tư..."
                onEdit={handleOpenEdit}
                onDelete={handleDeleteClick}
              />
            </div>
          </Tab>

          <Tab eventKey="thay-the" title="⚙️ Vật tư thay thế (Replacement)">
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <div>
                  <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>
                    Danh sách Vật tư thay thế
                  </h2>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 0 }}>
                    Thiết bị phụ tùng có giá trị cần Biên bản đánh giá kỹ thuật để cấp phát (vòng bi, van, động cơ...)
                  </p>
                </div>
                <Button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleOpenAdd}>
                  <BsPlusLg /> Thêm vật tư thay thế
                </Button>
              </div>

              <DataTable
                columns={thayTheColumns}
                data={thayTheList}
                loading={loading}
                pageSize={10}
                searchPlaceholder="Tìm tên, mã, vị trí thay, nhà sản xuất hoặc mô tả..."
                onEdit={handleOpenEdit}
                onDelete={handleDeleteClick}
              />
            </div>
          </Tab>
        </Tabs>
      </div>

      {/* Add / Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Form onSubmit={handleSave}>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>
              {modalMode === 'add' ? 'Thêm mới danh mục' : 'Cập nhật danh mục'} - {activeTab === 'tieu-hao' ? 'Vật tư tiêu hao' : 'Vật tư thay thế'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="g-3">
              {/* Image Preview Block */}
              <Col md={12} className="d-flex align-items-center gap-3 p-3 bg-light rounded mb-2">
                <img
                  src={formData.hinhAnh || 'https://placehold.co/100x100?text=VT'}
                  alt="Ảnh minh họa"
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}
                  onError={(e) => { e.target.src = 'https://placehold.co/100x100?text=No+Image'; }}
                />
                <div className="w-100">
                  <Form.Group controlId="formHinhAnh">
                    <Form.Label style={{ fontSize: 'var(--text-xs)' }}>Tải hình ảnh vật tư lên (File) <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <Form.Text className="text-muted" style={{ fontSize: '10px' }}>
                      Chọn một tệp hình ảnh để tải lên làm ảnh minh họa sản phẩm.
                    </Form.Text>
                  </Form.Group>
                </div>
              </Col>

              <Col md={4}>
                <Form.Group controlId="formMaVatTu">
                  <Form.Label>Mã vật tư <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={activeTab === 'tieu-hao' ? 'Ví dụ: MVTH-004' : 'Ví dụ: VTTT-003'}
                    value={formData.maVatTu}
                    onChange={(e) => setFormData({ ...formData, maVatTu: e.target.value })}
                    disabled={modalMode === 'edit'}
                    isInvalid={!!formErrors.maVatTu}
                    className="font-mono"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.maVatTu}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted" style={{ fontSize: '10px' }}>
                    Có tiền tố <strong>{activeTab === 'tieu-hao' ? 'MVTH-' : 'VTTT-'}</strong>
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md={8}>
                <Form.Group controlId="formTenVatTu">
                  <Form.Label>Tên vật tư <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên vật tư..."
                    value={formData.tenVatTu}
                    onChange={(e) => setFormData({ ...formData, tenVatTu: e.target.value })}
                    isInvalid={!!formErrors.tenVatTu}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.tenVatTu}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="formDonVi">
                  <Form.Label>Đơn vị tính <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    value={formData.donVi}
                    onChange={(e) => setFormData({ ...formData, donVi: e.target.value })}
                    isInvalid={!!formErrors.donVi}
                  >
                    <option value="">-- Chọn đơn vị --</option>
                    {activeTab === 'tieu-hao' ? (
                      <>
                        <option value="Chai">Chai</option>
                        <option value="Kg">Kg</option>
                        <option value="Lít">Lít</option>
                        <option value="Mét">Mét</option>
                        <option value="Cuộn">Cuộn</option>
                      </>
                    ) : (
                      <>
                        <option value="Bộ">Bộ</option>
                        <option value="Chiếc">Chiếc</option>
                        <option value="Cái">Cái</option>
                        <option value="Tấm">Tấm</option>
                        <option value="Quả">Quả</option>
                      </>
                    )}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.donVi}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="formNhaSanXuat">
                  <Form.Label>Nhà sản xuất <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ví dụ: SKF, Castrol, Selleys..."
                    value={formData.nhaSanXuat}
                    onChange={(e) => setFormData({ ...formData, nhaSanXuat: e.target.value })}
                    isInvalid={!!formErrors.nhaSanXuat}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.nhaSanXuat}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="formDonGia">
                  <Form.Label>Đơn giá (VND) <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder="Nhập giá tiền..."
                    value={formData.donGia}
                    onChange={(e) => setFormData({ ...formData, donGia: e.target.value })}
                    isInvalid={!!formErrors.donGia}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.donGia}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {activeTab === 'thay-the' && (
                <Col md={12}>
                  <Form.Group controlId="formViTri">
                    <Form.Label>Vị trí lắp đặt / thiết bị tương thích <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ví dụ: Rulo băng tải than chính, Hộp giảm tốc tua-bin..."
                      value={formData.viTri}
                      onChange={(e) => setFormData({ ...formData, viTri: e.target.value })}
                      isInvalid={!!formErrors.viTri}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.viTri}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}

              <Col md={12}>
                <Form.Group controlId="formMoTa">
                  <Form.Label>Mô tả chi tiết kỹ thuật <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Mô tả thông số chi tiết, mục đích sử dụng..."
                    value={formData.moTa}
                    onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
                    isInvalid={!!formErrors.moTa}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.moTa}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="btn-sm" onClick={() => setShowModal(false)}>
              Hủy bỏ
            </Button>
            <Button type="submit" variant="primary" className="btn-sm">
              Lưu dữ liệu
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={showDeleteModal}
        title="Xác nhận xoá vật tư"
        message={
          <div className="d-flex align-items-start gap-2 text-danger">
            <BsExclamationTriangle style={{ fontSize: '1.5rem', flexShrink: 0 }} />
            <div>
              <p className="mb-1 fw-bold">Bạn có chắc chắn muốn xoá vật tư này khỏi danh mục?</p>
              <p className="mb-0 text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                Vật tư: <strong>{itemToDelete?.maVatTu} - {itemToDelete?.tenVatTu}</strong>
                <br />
                Hành động này cũng sẽ xoá thông tin <strong>Tồn kho</strong> của vật tư này. Mọi lịch sử giao dịch cũ sẽ không bị ảnh hưởng nhưng không thể khôi phục danh mục.
              </p>
            </div>
          </div>
        }
        confirmText="Xác nhận xoá"
        cancelText="Bỏ qua"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
