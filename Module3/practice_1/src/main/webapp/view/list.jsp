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
    <c:import url="layout/library.jsp"/>
</head>
<body>
  <h1>Danh sách sinh viên</h1>
<%--  <span>${param.mess}</span>--%>
  <a href="">Thêm mới</a>
  <form>
    <input name="action" value="search" hidden="">
    <input name="keyword" placeholder="Nhập tên ........" value="">
    <select name="">
      <option value="0">--Chọn lớp--</option>
<%--      <c:forEach items="${classList}" var="cls">--%>
        <option value="">a</option>
<%--      </c:forEach>--%>
    </select>
    <button>Tìm kiếm</button>
  </form>
  <table class="table table-dark table-striped">
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
<%--    <c:forEach items="${studentList}" var="student" varStatus="status">--%>
      <tr>
        <td>a</td>
        <td>b</td>
        <td>c</td>
        <td>c</td>
        <td>c</td>
        <td>c</td>
        <td>
          <!-- Button trigger modal -->
          <button onclick="getInfoDelete('${student.getId()}','${student.getName()}')" type="button" class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Xoá
          </button>
        </td>
        <td>
          <a href="" class="btn btn-sm btn-warning">
            Chỉnh sửa
          </a>
        </td>
      </tr>
<%--    </c:forEach>--%>
  </table>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <form action="" method="post">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input hidden="hidden" name="deleteId" id="deleteId">
            <span>Bạn có muốn xoá sinh viên </span><span class="text-danger" id="deleteName"></span> không?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
            <button type="submit" class="btn btn-primary">Chấp nhận xoá</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <script>
    function getInfoDelete(id, name){
      document.getElementById("deleteId").value = id;
      document.getElementById("deleteName").innerText = name;
    }
  </script>
</body>
</html>
