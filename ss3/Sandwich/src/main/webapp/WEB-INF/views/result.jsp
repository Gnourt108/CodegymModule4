<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Kết quả order</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container mt-5" style="max-width: 480px;">
    <div class="card shadow-sm">
        <div class="card-header bg-success text-white fw-bold fs-5">
            Bánh sandwich của bạn
        </div>
        <div class="card-body">
            <p class="text-muted mb-3">Gia vị bạn đã chọn:</p>

            <ul class="list-group list-group-flush">
                <c:forEach var="topping" items="${toppings}">
                    <li class="list-group-item">${topping}</li>
                </c:forEach>
            </ul>

            <div class="d-grid mt-4">
                <a href="/sandwich" class="btn btn-outline-warning fw-bold">
                    Order lại
                </a>
            </div>
        </div>
    </div>
</div>

</body>
</html>