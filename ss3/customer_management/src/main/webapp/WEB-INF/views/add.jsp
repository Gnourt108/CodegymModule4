<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <form:form action="/customer/add" method="post" modelAttribute="customer" cssClass="container mt-4">
        <div class="mb-3">
            <label for="" class="form-label">Id</label>
            <form:input path="id" cssClass="form-control"/>
        </div>
        <div class="mb-3">
            <label for="" class="form-label">Name</label>
            <form:input path="name" cssClass="form-control"/>
        </div>
        <div class="mb-3">
            <label for="" class="form-label">Email</label>
            <form:input path="email" cssClass="form-control"/>
        </div>
        <div class="mb-3">
            <label for="" class="form-label">Address</label>
            <form:input path="address" cssClass="form-control"/>
        </div>
        <div class="mb-3">
            <label for="" class="form-label">Type</label>
            <form:select path="type" cssClass="form-select">
                <form:option value="NORMAL" label="NORMAL"/>
                <form:option value="VIP" label="VIP"/>
                <form:option value="VVIP" label="VVIP"/>
            </form:select>
        </div>
        <div class="mb-3">
            <label for="" class="form-label">Hobbies</label>
            <div class="form-check">
                <form:checkboxes path="hobbies" items="${hobbies}" cssClass="form-check-input"/>
            </div>
        </div>
    </form:form>
    <c:if test="${not empty message}">
        <div class="alert alert-${type}">
            ${message}
        </div>
    </c:if>
</body>
</html>
