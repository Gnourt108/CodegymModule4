<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Sandwich Order</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container mt-5" style="max-width: 480px;">
    <div class="card shadow-sm">
        <div class="card-header bg-warning text-dark fw-bold fs-5">
            Cửa hàng sandwich cà rốt
        </div>
        <div class="card-body">
            <p class="text-muted mb-3">Chọn gia vị bạn muốn:</p>
            <form action="/sandwich/result" method="post">
                <c:forEach var="spice" items="${spices}">
                    <div class="form-check mb-2">
                        <input class="form-check-input" type="checkbox"
                               name="toppings" value="${spice}" id="${spice}">
                        <label class="form-check-label" for="${spice}">
                                ${spice}
                        </label>
                    </div>
                </c:forEach>

                <div class="d-grid mt-4">
                    <button type="submit" class="btn btn-warning fw-bold">
                        Order!
                    </button>
                </div>
            </form>

        </div>
    </div>
</div>
</body>
</html>