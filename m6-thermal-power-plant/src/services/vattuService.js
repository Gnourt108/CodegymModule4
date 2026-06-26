// Dịch vụ quản lý dữ liệu Vật tư (Mock Service qua LocalStorage)
// Có tích hợp delay để giả lập hiệu ứng tải trang từ API thực tế

const DELAY_MS = 250;

const initialDanhMucTieuHao = [
  { id: 'MVTH-001', maVatTu: 'MVTH-001', tenVatTu: 'RP7', moTa: 'Dung dịch tẩy rỉ sét và bôi trơn chống rỉ', donVi: 'Chai', donGia: 85000, nhaSanXuat: 'Selleys Australia', hinhAnh: 'https://picsum.photos/seed/rp7/200' },
  { id: 'MVTH-002', maVatTu: 'MVTH-002', tenVatTu: 'Dẻ lau', moTa: 'Dẻ lau cotton thấm hút dầu mỡ công nghiệp', donVi: 'Kg', donGia: 25000, nhaSanXuat: 'Dệt may Phong Phú', hinhAnh: 'https://picsum.photos/seed/rag/200' },
  { id: 'MVTH-003', maVatTu: 'MVTH-003', tenVatTu: 'Dầu bôi trơn loại 1', moTa: 'Dầu nhờn bôi trơn bánh răng hở chịu nhiệt', donVi: 'Lít', donGia: 120000, nhaSanXuat: 'Castrol BP', hinhAnh: 'https://picsum.photos/seed/lubricant/200' },
];

const initialDanhMucThayThe = [
  { id: 'VTTT-001', maVatTu: 'VTTT-001', tenVatTu: 'Vòng bi SKF 2212EK', viTri: 'Thay cho rulo băng tải than', moTa: 'Vòng bi tự lựa hai dãy lỗ côn chịu tải', donVi: 'Bộ', donGia: 1850000, nhaSanXuat: 'SKF Sweden', hinhAnh: 'https://picsum.photos/seed/bearing/200' },
  { id: 'VTTT-002', maVatTu: 'VTTT-002', tenVatTu: 'Van một chiều DN50', viTri: 'Nhánh Bypass cấp nước bổ sung', moTa: 'Van một chiều lá lật thép đúc áp lực cao', donVi: 'Chiếc', donGia: 3200000, nhaSanXuat: 'Kitz Japan', hinhAnh: 'https://picsum.photos/seed/valve/200' },
];

const initialTonKho = [
  { maVatTu: 'MVTH-001', tenVatTu: 'RP7', loai: 'TIÊU HAO', donVi: 'Chai', soLuong: 15, donGia: 85000, nhaSanXuat: 'Selleys Australia', hinhAnh: 'https://picsum.photos/seed/rp7/200' },
  { maVatTu: 'MVTH-002', tenVatTu: 'Dẻ lau', loai: 'TIÊU HAO', donVi: 'Kg', soLuong: 3, donGia: 25000, nhaSanXuat: 'Dệt may Phong Phú', hinhAnh: 'https://picsum.photos/seed/rag/200' }, // Đặt bằng 3 (< 5) để test nút Nhập kho nhanh
  { maVatTu: 'MVTH-003', tenVatTu: 'Dầu bôi trơn loại 1', loai: 'TIÊU HAO', donVi: 'Lít', soLuong: 20, donGia: 120000, nhaSanXuat: 'Castrol BP', hinhAnh: 'https://picsum.photos/seed/lubricant/200' },
  { maVatTu: 'VTTT-001', tenVatTu: 'Vòng bi SKF 2212EK', loai: 'THAY THẾ', donVi: 'Bộ', soLuong: 2, donGia: 1850000, nhaSanXuat: 'SKF Sweden', hinhAnh: 'https://picsum.photos/seed/bearing/200' }, // Đặt bằng 2 (< 5) để test
  { maVatTu: 'VTTT-002', tenVatTu: 'Van một chiều DN50', loai: 'THAY THẾ', donVi: 'Chiếc', soLuong: 1, donGia: 3200000, nhaSanXuat: 'Kitz Japan', hinhAnh: 'https://picsum.photos/seed/valve/200' }, // Đặt bằng 1 (< 5) để test
];

const initialGiaoDich = [
  { id: 'GD-001', maHoaDon: 'HDNK-001', ngay: '2026-06-10 09:30', maVatTu: 'MVTH-001', tenVatTu: 'RP7', loaiGiaoDich: 'IMPORT', donVi: 'Chai', soLuong: 10, nguoiThucHien: 'ChanhtTV' },
  { id: 'GD-002', maHoaDon: 'HDNK-001', ngay: '2026-06-10 09:32', maVatTu: 'MVTH-002', tenVatTu: 'Dẻ lau', loaiGiaoDich: 'IMPORT', donVi: 'Kg', soLuong: 3, nguoiThucHien: 'ChanhtTV' },
  { id: 'GD-003', maHoaDon: 'HDNK-001', ngay: '2026-06-10 09:33', maVatTu: 'MVTH-003', tenVatTu: 'Dầu bôi trơn loại 1', loaiGiaoDich: 'IMPORT', donVi: 'Lít', soLuong: 5, nguoiThucHien: 'ChanhtTV' },
  { id: 'GD-004', maHoaDon: 'HDXK-001', ngay: '2026-06-15 14:15', maVatTu: 'MVTH-003', tenVatTu: 'Dầu bôi trơn loại 1', loaiGiaoDich: 'EXPORT', donVi: 'Lít', soLuong: 2, nguoiThucHien: 'ChanhtTV' },
  { id: 'GD-005', maHoaDon: 'HDXK-001', ngay: '2026-06-15 14:20', maVatTu: 'MVTH-002', tenVatTu: 'Dẻ lau', loaiGiaoDich: 'EXPORT', donVi: 'Kg', soLuong: 1, nguoiThucHien: 'ChanhtTV' },
];

const initialPhieuCapPhat = [
  {
    id: 'PCVT-2026-001',
    nguonYeuCau: 'PCT-2026-0042',
    noiDung: 'Sửa chữa bơm cấp nước thô số 2',
    nguoiTao: 'Nguyễn Văn Hùng (Tổ trưởng Tổ Cơ khí)',
    ngayTao: '2026-06-22 08:30',
    loaiVatTu: 'TIÊU HAO',
    trangThai: 'CHỜ_CẤP_PHÁT',
    items: [
      { maVatTu: 'MVTH-001', tenVatTu: 'RP7', soLuongYeuCau: 2, donVi: 'Chai' },
      { maVatTu: 'MVTH-002', tenVatTu: 'Dẻ lau', soLuongYeuCau: 3, donVi: 'Kg' },
    ]
  },
  {
    id: 'PCVT-2026-002',
    nguonYeuCau: 'BBKT-2026-0001',
    noiDung: 'Thay thế vòng bị rulo băng tải than chính',
    nguoiTao: 'Lê Văn Nam (Tổ trưởng Tổ Vận chuyển than)',
    ngayTao: '2026-06-23 09:15',
    loaiVatTu: 'THAY THẾ',
    trangThai: 'CHỜ_CẤP_PHÁT',
    items: [
      { maVatTu: 'VTTT-001', tenVatTu: 'Vòng bi SKF 2212EK', soLuongYeuCau: 1, donVi: 'Bộ' },
    ]
  },
  {
    id: 'PCVT-2026-003',
    nguonYeuCau: 'PCT-2026-0040',
    noiDung: 'Bảo dưỡng định kỳ hộp giảm tốc tua-bin phụ',
    nguoiTao: 'Trần Thanh Bình (Quản đốc sửa chữa)',
    ngayTao: '2026-06-20 10:00',
    loaiVatTu: 'TIÊU HAO',
    trangThai: 'ĐÃ_CẤP_PHÁT',
    ngayCapPhat: '2026-06-20 13:45',
    items: [
      { maVatTu: 'MVTH-003', tenVatTu: 'Dầu bôi trơn loại 1', soLuongYeuCau: 5, donVi: 'Lít' },
    ]
  }
];

// Helper functions for LocalStorage
const getStorage = (key, initialData) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(data);
};

const setStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const delay = (val) => new Promise((resolve) => setTimeout(() => resolve(val), DELAY_MS));

export const vattuService = {
  // === DANH MỤC VẬT TƯ TIÊU HAO ===
  getDanhMucTieuHao: () => {
    const list = getStorage('scms_dm_tieu_hao', initialDanhMucTieuHao);
    return delay(list);
  },

  addDanhMucTieuHao: (item) => {
    const list = getStorage('scms_dm_tieu_hao', initialDanhMucTieuHao);
    const newItem = { 
      ...item, 
      id: item.maVatTu,
      donGia: Number(item.donGia) || 0,
      nhaSanXuat: item.nhaSanXuat || '',
      hinhAnh: item.hinhAnh || 'https://placehold.co/200x200?text=VatTu'
    };
    list.push(newItem);
    setStorage('scms_dm_tieu_hao', list);

    // Thêm đồng thời vào bảng Tồn kho với số lượng = 0
    const stockList = getStorage('scms_ton_kho', initialTonKho);
    if (!stockList.some(s => s.maVatTu === item.maVatTu)) {
      stockList.push({
        maVatTu: item.maVatTu,
        tenVatTu: item.tenVatTu,
        loai: 'TIÊU HAO',
        donVi: item.donVi,
        soLuong: 0,
        donGia: newItem.donGia,
        nhaSanXuat: newItem.nhaSanXuat,
        hinhAnh: newItem.hinhAnh
      });
      setStorage('scms_ton_kho', stockList);
    }

    return delay(newItem);
  },

  updateDanhMucTieuHao: (id, updatedItem) => {
    const list = getStorage('scms_dm_tieu_hao', initialDanhMucTieuHao);
    const index = list.findIndex(item => item.id === id);
    if (index !== -1) {
      list[index] = { 
        ...list[index], 
        ...updatedItem,
        donGia: Number(updatedItem.donGia) || 0
      };
      setStorage('scms_dm_tieu_hao', list);

      // Cập nhật thông tin trong tồn kho
      const stockList = getStorage('scms_ton_kho', initialTonKho);
      const stockIndex = stockList.findIndex(s => s.maVatTu === id);
      if (stockIndex !== -1) {
        stockList[stockIndex].tenVatTu = updatedItem.tenVatTu;
        stockList[stockIndex].donVi = updatedItem.donVi;
        stockList[stockIndex].donGia = Number(updatedItem.donGia) || 0;
        stockList[stockIndex].nhaSanXuat = updatedItem.nhaSanXuat;
        stockList[stockIndex].hinhAnh = updatedItem.hinhAnh;
        setStorage('scms_ton_kho', stockList);
      }
      return delay(list[index]);
    }
    return delay(null);
  },

  deleteDanhMucTieuHao: (id) => {
    let list = getStorage('scms_dm_tieu_hao', initialDanhMucTieuHao);
    list = list.filter(item => item.id !== id);
    setStorage('scms_dm_tieu_hao', list);

    // Xoá trong Tồn kho luôn
    let stockList = getStorage('scms_ton_kho', initialTonKho);
    stockList = stockList.filter(s => s.maVatTu !== id);
    setStorage('scms_ton_kho', stockList);

    return delay(true);
  },


  // === DANH MỤC VẬT TƯ THAY THẾ ===
  getDanhMucThayThe: () => {
    const list = getStorage('scms_dm_thay_the', initialDanhMucThayThe);
    return delay(list);
  },

  addDanhMucThayThe: (item) => {
    const list = getStorage('scms_dm_thay_the', initialDanhMucThayThe);
    const newItem = { 
      ...item, 
      id: item.maVatTu,
      donGia: Number(item.donGia) || 0,
      nhaSanXuat: item.nhaSanXuat || '',
      hinhAnh: item.hinhAnh || 'https://placehold.co/200x200?text=VatTu'
    };
    list.push(newItem);
    setStorage('scms_dm_thay_the', list);

    // Thêm đồng thời vào bảng Tồn kho với số lượng = 0
    const stockList = getStorage('scms_ton_kho', initialTonKho);
    if (!stockList.some(s => s.maVatTu === item.maVatTu)) {
      stockList.push({
        maVatTu: item.maVatTu,
        tenVatTu: item.tenVatTu,
        loai: 'THAY THẾ',
        donVi: item.donVi,
        soLuong: 0,
        donGia: newItem.donGia,
        nhaSanXuat: newItem.nhaSanXuat,
        hinhAnh: newItem.hinhAnh
      });
      setStorage('scms_ton_kho', stockList);
    }

    return delay(newItem);
  },

  updateDanhMucThayThe: (id, updatedItem) => {
    const list = getStorage('scms_dm_thay_the', initialDanhMucThayThe);
    const index = list.findIndex(item => item.id === id);
    if (index !== -1) {
      list[index] = { 
        ...list[index], 
        ...updatedItem,
        donGia: Number(updatedItem.donGia) || 0
      };
      setStorage('scms_dm_thay_the', list);

      // Cập nhật thông tin trong tồn kho
      const stockList = getStorage('scms_ton_kho', initialTonKho);
      const stockIndex = stockList.findIndex(s => s.maVatTu === id);
      if (stockIndex !== -1) {
        stockList[stockIndex].tenVatTu = updatedItem.tenVatTu;
        stockList[stockIndex].donVi = updatedItem.donVi;
        stockList[stockIndex].donGia = Number(updatedItem.donGia) || 0;
        stockList[stockIndex].nhaSanXuat = updatedItem.nhaSanXuat;
        stockList[stockIndex].hinhAnh = updatedItem.hinhAnh;
        setStorage('scms_ton_kho', stockList);
      }
      return delay(list[index]);
    }
    return delay(null);
  },

  deleteDanhMucThayThe: (id) => {
    let list = getStorage('scms_dm_thay_the', initialDanhMucThayThe);
    list = list.filter(item => item.id !== id);
    setStorage('scms_dm_thay_the', list);

    // Xoá trong Tồn kho luôn
    let stockList = getStorage('scms_ton_kho', initialTonKho);
    stockList = stockList.filter(s => s.maVatTu !== id);
    setStorage('scms_ton_kho', stockList);

    return delay(true);
  },


  // === TỒN KHO ===
  getTonKho: () => {
    const list = getStorage('scms_ton_kho', initialTonKho);
    return delay(list);
  },


  // === GIAO DỊCH (NHẬP KHO) ===
  getGiaoDich: () => {
    const list = getStorage('scms_giao_dich', initialGiaoDich);
    // Sắp xếp giao dịch mới nhất lên đầu
    const sorted = [...list].sort((a, b) => new Date(b.ngay.replace(/\//g, '-')) - new Date(a.ngay.replace(/\//g, '-')));
    return delay(sorted);
  },

  importVatTu: (invoiceCode, maVatTu, qty, user = 'Thủ kho vật tư') => {
    const stockList = getStorage('scms_ton_kho', initialTonKho);
    const gdList = getStorage('scms_giao_dich', initialGiaoDich);

    const stockItem = stockList.find(s => s.maVatTu === maVatTu);
    if (!stockItem) {
      throw new Error(`Mã vật tư ${maVatTu} không tồn tại trong kho.`);
    }

    const importQty = Number(qty);
    if (isNaN(importQty) || importQty <= 0) {
      throw new Error('Số lượng nhập phải lớn hơn 0.');
    }

    // 1. Tăng tồn kho
    stockItem.soLuong += importQty;
    setStorage('scms_ton_kho', stockList);

    // 2. Ghi nhận giao dịch
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newTransaction = {
      id: `GD-${Date.now()}`,
      maHoaDon: invoiceCode,
      ngay: formattedDate,
      maVatTu: maVatTu,
      tenVatTu: stockItem.tenVatTu,
      loaiGiaoDich: 'IMPORT',
      donVi: stockItem.donVi,
      soLuong: importQty,
      nguoiThucHien: user
    };

    gdList.push(newTransaction);
    setStorage('scms_giao_dich', gdList);

    return delay({ stockItem, transaction: newTransaction });
  },


  // === PHIẾU CẤP PHÁT / XUẤT KHO ===
  getPhieuCapPhat: () => {
    const list = getStorage('scms_phieu_cap_phat', initialPhieuCapPhat);
    return delay(list);
  },

  // Thực hiện cấp phát vật tư cho một phiếu
  exportVatTu: (phieuId, user = 'Thủ kho vật tư') => {
    const phieuList = getStorage('scms_phieu_cap_phat', initialPhieuCapPhat);
    const stockList = getStorage('scms_ton_kho', initialTonKho);
    const gdList = getStorage('scms_giao_dich', initialGiaoDich);

    const phieu = phieuList.find(p => p.id === phieuId);
    if (!phieu) {
      throw new Error(`Không tìm thấy phiếu cấp phát mã ${phieuId}`);
    }

    if (phieu.trangThai === 'ĐÃ_CẤP_PHÁT') {
      throw new Error(`Phiếu ${phieuId} này đã được cấp phát trước đó.`);
    }

    // 1. Kiểm tra tồn kho cho tất cả các vật tư trong phiếu
    const errors = [];
    phieu.items.forEach(item => {
      const stock = stockList.find(s => s.maVatTu === item.maVatTu);
      if (!stock || stock.soLuong < item.soLuongYeuCau) {
        errors.push(`${item.tenVatTu} (Yêu cầu: ${item.soLuongYeuCau}, Trong kho: ${stock ? stock.soLuong : 0})`);
      }
    });

    if (errors.length > 0) {
      throw new Error(`Kho không đủ vật tư để cấp phát:\n` + errors.join('\n'));
    }

    // 2. Trừ tồn kho và ghi nhận các giao dịch xuất kho
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    phieu.items.forEach(item => {
      const stock = stockList.find(s => s.maVatTu === item.maVatTu);
      stock.soLuong -= item.soLuongYeuCau;

      // Lưu giao dịch
      gdList.push({
        id: `GD-${Date.now()}-${item.maVatTu}`,
        maHoaDon: phieu.nguonYeuCau, // Liên kết trực tiếp với PCT hoặc BBKT
        ngay: formattedDate,
        maVatTu: item.maVatTu,
        tenVatTu: item.tenVatTu,
        loaiGiaoDich: 'EXPORT',
        donVi: item.donVi,
        soLuong: item.soLuongYeuCau,
        nguoiThucHien: user
      });
    });

    // 3. Cập nhật trạng thái phiếu
    phieu.trangThai = 'ĐÃ_CẤP_PHÁT';
    phieu.ngayCapPhat = formattedDate;

    setStorage('scms_ton_kho', stockList);
    setStorage('scms_giao_dich', gdList);
    setStorage('scms_phieu_cap_phat', phieuList);

    return delay(phieu);
  }
};
