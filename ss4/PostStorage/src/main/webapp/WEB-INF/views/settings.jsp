<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c"    uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Mail Settings</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet">

    <style>
        body { background-color: #f8f9fa; }
        .settings-card {
            max-width: 640px;
            margin: 48px auto;
        }
        .current-value { font-weight: 600; color: #0d6efd; }
    </style>
</head>
<body>
<div class="settings-card">
    <div class="card shadow-sm mb-4">
        <div class="card-header bg-primary text-white">
            <h4 class="mb-0">Mail Configuration Settings</h4>
        </div>

        <c:if test="${not empty successMessage}">
            <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
                    ${successMessage}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        </c:if>

        <div class="card-body">
            <form:form method="post" action="${pageContext.request.contextPath}/settings" modelAttribute="mailSettings">
                <div class="mb-3">
                    <label class="form-label fw-semibold">Language</label>
                    <form:select path="language" cssClass="form-select">
                        <form:option value="English"    label="English" />
                        <form:option value="Vietnamese" label="Vietnamese" />
                        <form:option value="Japanese"   label="Japanese" />
                        <form:option value="Chinese"    label="Chinese" />
                    </form:select>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-semibold">Emails Per Page</label>
                    <form:select path="pageSize" cssClass="form-select">
                        <form:option value="5"   label="5" />
                        <form:option value="10"  label="10" />
                        <form:option value="15"  label="15" />
                        <form:option value="25"  label="25" />
                        <form:option value="50"  label="50" />
                        <form:option value="100" label="100" />
                    </form:select>
                </div>

                <div class="mb-3">
                    <div class="form-check">
                        <form:checkbox path="spamFilter" cssClass="form-check-input" id="spamFilter" />
                        <label class="form-check-label fw-semibold" for="spamFilter">
                            Enable Spam Filter
                        </label>
                    </div>
                </div>

                <div class="mb-4">
                    <label class="form-label fw-semibold">Email Signature</label>

                    <form:textarea path="signature" cssClass="form-control" rows="4"
                                   placeholder="Enter your email signature..." />
                </div>

                <button type="submit" class="btn btn-primary w-100">
                    Save Settings
                </button>

                <button class="btn w-100">
                    Cancel
                </button>

            </form:form>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
