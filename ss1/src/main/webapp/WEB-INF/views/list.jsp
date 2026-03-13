<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
    <title>Student List</title>
</head>
<body>

<h1>Danh sách Student</h1>

<!-- Nút thêm student -->
<a href="/student/add">
    <button>Thêm Student</button>
</a>

<br><br>

<table border="1" cellpadding="10">
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Action</th>
    </tr>

    <c:forEach var="s" items="${students}">
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>
                <!-- Nút xem chi tiết -->
                <a href="/student/detail?id=${s.id}">
                    <button>Xem chi tiết</button>
                </a>
            </td>
        </tr>
    </c:forEach>

</table>

</body>
</html>