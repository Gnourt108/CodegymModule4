<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Từ Điển Anh – Việt</title>

  <!-- Bootstrap 5 CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Bootstrap Icons -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Nunito:wght@400;500;600&display=swap" rel="stylesheet">

  <style>
    :root {
      --primary:   #1a5276;
      --accent:    #e67e22;
      --bg:        #f0f4f8;
      --card-bg:   #ffffff;
      --text:      #2c3e50;
      --muted:     #7f8c8d;
      --success-bg:#eafaf1;
      --success-bd:#27ae60;
      --danger-bg: #fdf2f2;
      --danger-bd: #e74c3c;
    }

    body {
      background: var(--bg);
      font-family: 'Nunito', sans-serif;
      color: var(--text);
      min-height: 100vh;
    }

    /* ── Navbar ── */
    .navbar {
      background: var(--primary) !important;
      box-shadow: 0 2px 8px rgba(0,0,0,.18);
    }
    .navbar-brand {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      letter-spacing: .5px;
      color: #fff !important;
    }
    .navbar-brand i { color: var(--accent); }

    /* ── Hero ── */
    .hero {
      background: linear-gradient(135deg, var(--primary) 0%, #154360 100%);
      color: #fff;
      padding: 60px 0 80px;
      clip-path: ellipse(100% 88% at 50% 12%);
    }
    .hero h1 {
      font-family: 'Playfair Display', serif;
      font-size: 2.6rem;
      font-weight: 700;
    }
    .hero p { opacity: .85; font-size: 1.05rem; }

    /* ── Search card ── */
    .search-card {
      background: var(--card-bg);
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0,0,0,.12);
      margin-top: -48px;
      padding: 2rem 2.5rem;
    }
    .search-label {
      font-weight: 600;
      font-size: .9rem;
      text-transform: uppercase;
      letter-spacing: .8px;
      color: var(--muted);
    }
    .search-input {
      border: 2px solid #d5d8dc;
      border-radius: 12px 0 0 12px !important;
      font-size: 1.05rem;
      padding: .65rem 1rem;
      transition: border-color .2s;
    }
    .search-input:focus {
      border-color: var(--primary);
      box-shadow: none;
    }
    .btn-search {
      background: var(--accent);
      border: none;
      border-radius: 0 12px 12px 0 !important;
      color: #fff;
      font-weight: 600;
      padding: .65rem 1.4rem;
      transition: background .2s, transform .1s;
    }
    .btn-search:hover  { background: #d35400; color: #fff; }
    .btn-search:active { transform: scale(.97); }

    /* ── Result cards ── */
    .result-card {
      border-radius: 16px;
      padding: 1.4rem 1.6rem;
      margin-top: 1.5rem;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      animation: fadeUp .35s ease;
    }
    .result-found {
      background: var(--success-bg);
      border-left: 5px solid var(--success-bd);
    }
    .result-notfound {
      background: var(--danger-bg);
      border-left: 5px solid var(--danger-bd);
    }
    .result-error {
      background: #fef9e7;
      border-left: 5px solid #f1c40f;
    }
    .result-icon { font-size: 2rem; line-height: 1; margin-top: 2px; }
    .result-label {
      font-size: .78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .8px;
      color: var(--muted);
    }
    .result-word {
      font-family: 'Playfair Display', serif;
      font-size: 1.35rem;
      color: var(--primary);
      font-weight: 600;
    }
    .result-meaning {
      font-size: 1.15rem;
      font-weight: 600;
      color: #1e8449;
      margin-top: 2px;
    }

    /* ── Hint badge list ── */
    .hint-section { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px dashed #d5d8dc; }
    .hint-title {
      font-size: .82rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .8px;
      color: var(--muted);
      margin-bottom: .7rem;
    }
    .hint-badge {
      display: inline-block;
      background: #eaf0fb;
      color: var(--primary);
      border-radius: 30px;
      padding: 4px 14px;
      font-size: .85rem;
      font-weight: 600;
      margin: 3px;
      cursor: pointer;
      transition: background .15s, transform .1s;
    }
    .hint-badge:hover { background: var(--primary); color: #fff; transform: translateY(-2px); }

    /* ── Footer ── */
    footer {
      background: var(--primary);
      color: rgba(255,255,255,.65);
      font-size: .85rem;
      padding: 1.2rem 0;
      text-align: center;
      margin-top: 60px;
    }

    @keyframes fadeUp {
      from { opacity:0; transform:translateY(14px); }
      to   { opacity:1; transform:translateY(0); }
    }
  </style>
</head>
<body>

<nav class="navbar navbar-expand-lg">
  <div class="container">
    <a class="navbar-brand" href="/">
      <i class="bi bi-journal-text me-2"></i>EV Dictionary
    </a>
  </div>
</nav>

<div class="container mt-5" style="max-width:660px; margin-top: 300px">
  <div class="search-card">
    <label class="search-label mb-2 d-block">
      <i class="bi bi-search me-1"></i> Nhập từ cần tra cứu
    </label>

    <form action="/dictionary/search" method="post">
      <div class="input-group">
        <input
                type="text"
                name="keyword"
                class="form-control search-input"
                placeholder="Ví dụ: hello, computer, love..."
                value="${keyword != null ? keyword : ''}"
                autocomplete="off"
                autofocus
        />
        <button type="submit" class="btn btn-search">
          <i class="bi bi-search me-1"></i> Tra cứu
        </button>
      </div>
    </form>

    <c:if test="${not empty error}">
      <div class="result-card result-error">
        <div class="result-icon">⚠️</div>
        <div>
          <div class="result-label">Lưu ý</div>
          <div class="result-word" style="color:#9a7d0a;">${error}</div>
        </div>
      </div>
    </c:if>

    <c:if test="${not empty meaning}">
      <div class="result-card result-found">
        <div class="result-icon">✅</div>
        <div>
          <div class="result-label">Kết quả tra cứu</div>
          <div class="result-word">${keyword}</div>
          <div class="result-meaning">→ ${meaning}</div>
        </div>
      </div>
    </c:if>

    <c:if test="${notFound == true}">
      <div class="result-card result-notfound">
        <div class="result-icon">❌</div>
        <div>
          <div class="result-label">Không tìm thấy</div>
          <div class="result-word" style="color:#c0392b;">"${keyword}"</div>
          <div style="font-size:.92rem; color:var(--muted); margin-top:4px;">
            Từ này chưa có trong từ điển. Hãy thử từ khác.
          </div>
        </div>
      </div>
    </c:if>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
