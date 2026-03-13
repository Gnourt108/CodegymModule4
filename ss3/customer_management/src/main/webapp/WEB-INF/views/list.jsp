<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>Title</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container container-fluid mt-5">
    <h1>Danh sách khách hàng</h1>
      <a href="/customers/addForm" class="btn btn-primary mb-3">Add customer</a>
    <table class="table table-bordered table-striped">
      <thead class="table-dark">
          <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Type</th>
              <th>Hobbies</th>
          </tr>
      </thead>
      <tbody>
        <c:forEach var="customer" items="${customers}" varStatus="status">
            <tr>
                <th>${customer.getId()}</th>
                <th>${customer.getName()}</th>
                <th>${customer.getEmail()}</th>
                <th>${customer.getAddress()}</th>
                <th>${customer.getType()}</th>
                <th>
                    <c:forEach items="${customer.hobbies}" var="hobby">
                        ${hobby}<br>
                    </c:forEach>
                </th>
            </tr>
        </c:forEach>
      </tbody>
    </table>
  </div>
</body>
</html>
