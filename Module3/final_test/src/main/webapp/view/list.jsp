<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: PC
  Date: 2/26/2026
  Time: 8:02 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Danh sách rau củ quả</title>
    <c:import url="../layout/library.jsp"/>
</head>
<body>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Danh sách sản phẩm</h1>
    <%--  <span>${param.mess}</span>--%>
    <a href="/product?action=add" class="btn btn-primary mb-3">Thêm mới</a>
    <%-- FORM SEARCH + SORT --%>
    <form action="/product" method="get" class="row g-2 mb-3 align-items-end">
      <input type="hidden" name="action" value="search">

      <%-- Trường 1: Tên --%>
      <div class="col-md-3">
        <label class="form-label">Tên sản phẩm</label>
        <input name="keyword" value="${keyword}" placeholder="Nhập tên..." class="form-control">
      </div>

      <%-- Trường 2: Loại sản phẩm --%>
      <div class="col-md-3">
        <label class="form-label">Loại sản phẩm</label>
        <select name="typeId" class="form-select">
          <option value="0">--Tất cả loại--</option>
          <c:forEach items="${productTypes}" var="pt">
            <option value="${pt.getId()}" <c:if test="${selectedType == pt.getId()}">selected</c:if>>
                ${pt.getName()}
            </option>
          </c:forEach>
        </select>
      </div>

      <%-- Sort theo giá --%>
      <div class="col-md-2">
        <label class="form-label">Sắp xếp giá</label>
        <select name="sort" class="form-select">
          <option value="">-- Mặc định --</option>
          <option value="asc"  <c:if test="${sort == 'asc'}">selected</c:if>>Giá tăng dần</option>
          <option value="desc" <c:if test="${sort == 'desc'}">selected</c:if>>Giá giảm dần</option>
        </select>
      </div>

      <div class="col-md-2">
        <button class="btn btn-success w-100">Tìm kiếm</button>
      </div>
      <div class="col-md-2">
        <a href="/home" class="btn btn-secondary w-100">Xóa bộ lọc</a>
      </div>
    </form>
    <table class="table table-bordered table-hover table-striped">
      <tr>
        <th>#</th>
        <th>Mã hàng hóa</th>
        <th>Tên hàng hóa</th>
        <th>Đơn vị tính</th>
        <th>Giá</th>
        <th>Loại hàng hóa</th>
        <th>Ngày thêm</th>
        <th>Chỉnh sửa</th>
        <th>Xóa</th>
      </tr>
      <c:forEach items="${products}" var="p" varStatus="status">
        <tr>
          <td>${status.count}</td>
          <td>${p.getId()}</td>
          <td>${p.getName()}</td>
          <td>${p.getUnit()}</td>
          <td>${p.getPrice()}</td>
          <td>${p.getProductTypeName()}</td>
          <td>${p.getCreatedDay()}</td>
          <td class="text-center">
            <a href="/product?action=edit&id=${p.getId()}" class="btn btn-sm btn-warning">
              Chỉnh sửa
            </a>
          </td>
          <td class="text-center">
            <!-- Button trigger modal -->
            <button onclick="getInfoDelete('${p.getId()}','${p.getName()}')" type="button" class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Xoá
            </button>
          </td>
        </tr>
      </c:forEach>
    </table>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <form action="/product" method="post">
          <input type="hidden" name="action" value="delete">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <input hidden="hidden" name="deleteId" id="deleteId">
              <span>Bạn có muốn xoá sản phẩm </span><span class="text-danger" id="deleteName"></span> không?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
              <button type="submit" class="btn btn-primary">Chấp nhận xoá</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <%-- TOAST THÔNG BÁO --%>
  <c:if test="${not empty toastMessage}">
    <div class="position-fixed top-0 end-0 p-3" style="z-index: 9999">
      <div id="liveToast" class="toast align-items-center text-white bg-${toastType} border-0 show"
           role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body fs-6">
            <c:choose>
              <c:when test="${toastType == 'success'}">Thành công</c:when>
              <c:otherwise>Thất bại</c:otherwise>
            </c:choose>
              ${toastMessage}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto"
                  data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
    <script>
      setTimeout(() => {
        const toast = document.getElementById('liveToast');
        if (toast) toast.classList.remove('show');
      }, 3000);
    </script>
  </c:if>
  <script>
    function getInfoDelete(id, name){
      document.getElementById("deleteId").value = id;
      document.getElementById("deleteName").innerText = name;
    }
  </script>
</body>
</html>
