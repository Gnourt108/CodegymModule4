<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Change Money</title>
    <!-- Bootstrap CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

</head>
<body class="bg-light">

<div class="container mt-5">
    <div class="card shadow">
        <div class="card-header text-center bg-success text-white">
            <h3>Money Converter</h3>
        </div>

        <div class="card-body">
            <form action="${pageContext.request.contextPath}/convert/doConvert" method="post">

                <div class="mb-3">
                    <label class="form-label">USD</label>
                    <input type="number" class="form-control" name="usd" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Rate (VND)</label>
                    <input type="number" class="form-control" name="rate" required>
                </div>

                <div class="alert alert-info text-center">
                    ${usd} USD = ${vnd} VND
                </div>

                <div class="d-grid">
                    <button type="submit" class="btn btn-success">
                        Convert
                    </button>
                </div>

            </form>
        </div>
    </div>
</div>

</body>
</html>