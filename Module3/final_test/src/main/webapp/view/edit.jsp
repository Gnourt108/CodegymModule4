<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Chỉnh sửa sản phẩm</title>
    <c:import url="../layout/library.jsp"/>
</head>
<body>
<div class="container mt-4">
    <h1 class="text-center mb-4">Chỉnh sửa sản phẩm</h1>

    <c:if test="${not empty error}">
        <div class="alert alert-danger w-50 mx-auto">${error}</div>
    </c:if>

    <form action="/product?action=edit" method="post"
          class="row g-3 mb-3 w-50 mx-auto needs-validation" novalidate>
        <input type="hidden" name="id" value="${product.getId()}">

        <div class="col-md-12">
            <label class="form-label">Tên sản phẩm <span class="text-danger">*</span></label>
            <input type="text" name="name" value="${product.getName()}"
                   class="form-control" required minlength="2" maxlength="50">
            <div class="invalid-feedback">Tên sản phẩm không hợp lệ.</div>
        </div>

        <div class="col-md-12">
            <label class="form-label">Loại sản phẩm <span class="text-danger">*</span></label>
            <select name="typeId" class="form-select" required>
                <option value="">--Chọn loại--</option>
                <c:forEach items="${productTypes}" var="pt">
                    <option value="${pt.getId()}"
                            <c:if test="${pt.getId() == product.getProductTypeId()}">selected</c:if>>
                            ${pt.getName()}
                    </option>
                </c:forEach>
            </select>
            <div class="invalid-feedback">Vui lòng chọn loại.</div>
        </div>

        <div class="col-md-12">
            <label class="form-label">Đơn vị tính <span class="text-danger">*</span></label>
            <select name="unit" class="form-select" required>
                <option value="">--Chọn đơn vị--</option>
                <option value="kg"  <c:if test="${product.getUnit() == 'kg'}">selected</c:if>>kg</option>
                <option value="bo"  <c:if test="${product.getUnit() == 'bo'}">selected</c:if>>bó</option>
                <option value="tui" <c:if test="${product.getUnit() == 'tui'}">selected</c:if>>túi</option>
            </select>
            <div class="invalid-feedback">Vui lòng chọn đơn vị.</div>
        </div>

        <div class="col-md-12">
            <label class="form-label">Giá (đ) <span class="text-danger">*</span></label>
            <input type="number" name="price" value="${product.getPrice()}"
                   class="form-control" required min="1000" max="15000000000">
        </div>

        <div class="col-12 d-flex gap-2">
            <button type="submit" class="btn btn-primary">Lưu thay đổi</button>
            <a href="/home" class="btn btn-warning">Hủy</a>
        </div>
    </form>
</div>
</body>
</html>