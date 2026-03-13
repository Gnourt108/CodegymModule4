<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <title>Add Student</title>
</head>
<body>

<h2>Thêm Student</h2>

<form action="/student/add" method="post">

  <label>ID:</label><br>
  <input type="number" name="id" required>
  <br><br>

  <label>Name:</label><br>
  <input type="text" name="name" required>
  <br><br>

  <button type="submit">Thêm</button>
</form>

<br>

<a href="/student">
  <button>Quay lại danh sách</button>
</a>

</body>
</html>