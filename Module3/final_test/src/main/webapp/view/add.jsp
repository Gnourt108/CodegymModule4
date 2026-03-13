<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Thêm sản phẩm</title>
  <c:import url="../layout/library.jsp"/>
</head>
<body>
<div class="container mt-4">
    <h1 class="text-center mb-4">Thêm sản phẩm mới</h1>
    <form action="/product?action=add" method="post" class="row g-3 mb-3 w-50 mx-auto">
        <div class="col-md-12">
            <label for="">Tên sản phẩm</label>
            <input type="text" placeholder="Nhập tên sản phẩm..." required name="name" class="form-control">
        </div>

        <div class="col-md-12">
            <label for="">Chọn loại sản phẩm</label>
            <select name="typeId" id="" class="form-control" required>
                <option value="">--Chọn loại sản phẩm--</option>
                <c:forEach items="${productTypes}" var="pt">
                    <option value="${pt.getId()}">${pt.getName()}</option>
                </c:forEach>
            </select>
        </div>

        <div class="col-md-12">
            <label for="">Chọn đơn vị tính</label>
            <select name="unit" id="" class="form-control" required>
                <option value="">--Chọn đơn vị--</option>
                <option value="kg">kg</option>
                <option value="bo">bó</option>
            </select>
        </div>

        <div class="col-md-12">
            <label for="">Giá sản phẩm</label>
            <input type="number" placeholder="Nhập giá sản phẩm..." required name="price" class="form-control" min="1000" max="15000000000">
        </div>

        <button class="btn btn-success">Thêm mới</button>
        <a href="/home" class="btn btn-warning">Hủy</a>
    </form>
</div>
</body>
</html>
