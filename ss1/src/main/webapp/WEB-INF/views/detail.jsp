<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Student Detail</title>
</head>
<body>

<h2>Chi tiết Student</h2>

<p>
    <b>ID:</b> ${student.id}
</p>

<p>
    <b>Name:</b> ${student.name}
</p>

<br>

<a href="/students">
    <button>Quay lại danh sách</button>
</a>

</body>
</html>