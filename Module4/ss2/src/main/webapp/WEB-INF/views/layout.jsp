<%--
  Created by IntelliJ IDEA.
  User: ASUS
  Date: 3/9/2026
  Time: 8:30 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Change money </title>
    <style>


        h2{
            text-align:center;
            margin-bottom:20px;
        }

        table{
            width:100%;
        }

        td{
            padding:10px;
        }

        input{
            width:100%;
            padding:8px;
            border:1px solid #ccc;
            border-radius:5px;
        }

        button{
            width:100%;
            padding:10px;
            background:#4CAF50;
            border:none;
            color:white;
            font-size:16px;
            border-radius:5px;
            cursor:pointer;
        }

        button:hover{
            background:#45a049;
        }

        .result{
            margin-top:20px;
            text-align:center;
            font-weight:bold;
            color:#333;
        }

    </style>
</head>
<body>

<form action="${pageContext.request.contextPath}/change/convert" method="post">
    <table border="1">
        <tr>
            <th colspan="3">You can change money in here</th>
        </tr>
            <tr>
                <td><label>USD:</label></td>
                <td><input type="number" name="usd" required></td>
            </tr>
            <tr>
                <td><label>Rate (VND):</label></td>
               <td> <input type="number" name="rate" required></td>
            </tr>
        <tr>
            <td>Result</td>
            <td>${usd} USD= ${vnd} VND</td>
        </tr>
        <tr>
            <td colspan="3">
                <button type="submit">Convert</button>
            </td>
        </tr>
    </table>
</form>
</body>
</html>
