<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <title>Calculator</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container mt-5" style="max-width: 420px;">
  <div class="card shadow-sm">
    <div class="card-header bg-dark text-white fw-bold fs-5">Máy tính cà rốt</div>
    <div class="card-body">
      <form action="${pageContext.request.contextPath}/calculator" method="post">
        <div class="mb-3">
          <input type="number" name="num1" class="form-control" placeholder="Số 1" required>
        </div>
        <div class="mb-3">
          <select name="operator" class="form-select">
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">×</option>
            <option value="/">/</option>
          </select>
        </div>
        <div class="mb-3">
          <input type="number" name="num2" class="form-control" placeholder="Số 2" required>
        </div>
        <div class="d-grid">
          <button type="submit" class="btn btn-dark">=</button>
        </div>
      </form>

      <c:if test="${result != null}">
        <div class="alert alert-success mt-3 text-center fs-5">
          Kết quả: <strong>${result}</strong>
        </div>
      </c:if>

      <c:if test="${error != null}">
        <div class="alert alert-danger mt-3 text-center">
            ${error}
        </div>
      </c:if>
    </div>
  </div>
</div>
</body>
</html>