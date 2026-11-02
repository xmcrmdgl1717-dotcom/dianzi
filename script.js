<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>U8国际</title>
  <!-- 像素 -->
  
  <!-- 引入外部 CSS -->
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div class="page">
    <header id="__fpc_id_206120">
      <div class="header-inner">
        <button class="header-btn" type="button" onclick="openModal('login')"><img src="assets/source/service.webp" alt="客服"></button>
        <img class="logo" src="assets/source/logo.webp" alt="U8国际">
        <button class="header-btn" type="button" onclick="openModal('register')"><img src="assets/source/icon-app.webp" alt="下载APP"></button>
      </div>
    </header>
    
    <main>
      
      <!-- 1. 首屏全屏视频 -->
      <section class="video-hero">
        <div class="video-loader"></div>
        <video
          src="assets/source/home.mp4#t=0.1"
          autoplay
          muted
          loop
          playsinline
          webkit-playsinline
          x5-playsinline
          preload="auto"
          disablepictureinpicture
          controlslist="nodownload noplaybackrate"
        ></video>
        <div class="video-overlay"></div>
      </section>

      <!-- 2. 中间内容容器 -->
      <div class="content-section">
        
        <!-- 轮播海报 (修改了结构，支持手势拖拽) -->
        <section class="slideshow">
          <div class="slides-container" id="slidesContainer">
            <div class="slides-track" id="slidesTrack">
              <div class="slide"><img src="assets/source/slide-1.webp" alt="澳门新葡京宣传图"></div>
              <div class="slide"><img src="assets/source/slide-2.webp" alt="精选游戏宣传图"></div>
              <div class="slide"><img src="assets/source/slide-3.webp" alt="APP体验宣传图"></div>
            </div>
          </div>
          <div class="dots">
            <span class="dot" onclick="showSlide(0)"></span>
            <span class="dot" onclick="showSlide(1)"></span>
            <span class="dot active" onclick="showSlide(2)"></span>
          </div>
        </section>

        <!-- 进入网页版按钮 -->
        <section class="primary-stack">
          <button class="primary-button" type="button" onclick="openModal('register')">
            <img src="assets/source/icon-home.webp" alt="">
            <span>点击进入网页版</span>
          </button>
        </section>

        <!-- 游戏画廊 -->
        <section class="gallery" id="games">
          <!-- JS 动态渲染生成 -->
        </section>

        <!-- App 下载卡片 -->
        <section class="app-download-card">
          <img src="assets/source/promo-banner.webp" alt="首存即送8888元，下载APP抢红包最高8888">
          <div class="download-row">
            <button type="button" onclick="openModal('register')"><img src="assets/source/btn-android.webp" alt="Android下载"></button>
            <button type="button" onclick="openModal('register')"><img src="assets/source/btn-ios.webp" alt="iOS下载"></button>
          </div>
        </section>

        <!-- ===== 3. 领奖排行榜（懒加载） ===== -->
        <section class="leaderboard">
          <div class="lb-header">
            <div class="lb-title">领奖排行榜</div>
            <div class="lb-tabs">
              <div class="lb-tab active" data-type="daily">每日</div>
              <div class="lb-tab" data-type="weekly">每周</div>
              <div class="lb-tab" data-type="monthly">每月</div>
            </div>
          </div>
          <div class="lb-list" id="lb-list">
            <!-- JS 动态渲染 -->
          </div>
          <div class="lb-loading" id="lb-loading">加载中...</div>
        </section>

      </div>

      <footer class="footer">
        <div>COPYRIGHT © 2026 U8.com All Rights Reserved.</div>
      </footer>
    </main>
  </div>

  <!-- 底部悬浮操作栏 -->
  <div class="bottom-actions">
    <button class="bottom-action" type="button" onclick="openModal('register')"><small>注册即送最高88U</small><span>立即游戏</span></button>
    <button class="bottom-action download" type="button" onclick="openModal('register')"><small>下载APP抢红包 最高送888U</small><span>立即下载</span></button>
  </div>

  <!-- 注册/登录弹窗 -->
  <div class="modal-backdrop" id="modalBackdrop" onclick="backdropClose(event)">
    <div class="modal" onclick="event.stopPropagation()">
      <button class="close" type="button" onclick="closeModal()">×</button>
      <h2 id="modalTitle">注册账号</h2>
      <p id="modalSub">填写信息完成注册。</p>
      <form onsubmit="handleSubmit(event)">
        <div class="field"><label for="username">用户名</label><input id="username" required="" autocomplete="off"></div>
        <div class="field"><label for="password">登录密码</label><input id="password" type="password" required="" autocomplete="new-password" aria-autocomplete="list"></div>
        <div class="field" id="confirmField" style="display: block;"><label for="confirm">确认密码</label><input id="confirm" type="password" autocomplete="new-password" required=""></div>
        <div class="field" id="phoneField" style="display: block;"><label for="phone">手机号码</label><input id="phone" inputmode="tel" autocomplete="tel" required=""></div>
        <div class="field"><label for="captcha">验证码</label>
          <div class="code-row"><input id="captcha" required="" maxlength="6" placeholder="输入6位验证码">
            <div class="code-box" id="captchaCode" onclick="getCaptcha()">点击获取</div>
          </div>
        </div>
        <button class="submit" type="submit" id="submitBtn">注册账号</button>
        <div class="hint" id="formHint"></div>
      </form>
      <button class="switch" type="button" id="switchBtn" onclick="switchMode()">已有账号？前往登录</button>
    </div>
  </div>

  <!-- ===== Safari 拦截弹窗 ===== -->
  <div class="safari-modal-overlay" id="safariModal">
    <div class="safari-modal-box">
      <button class="safari-close-btn" onclick="closeSafariModal()">✕</button>
      <div class="safari-icon-wrap">
        <div class="safari-icon-arrow"></div>
      </div>
      <div class="safari-modal-title">请使用 Safari 浏览器打开</div>
      <div class="safari-modal-desc">系统检测到您正在使用非苹果官方 Safari 访问，为了您的安全请您使用苹果官方 Safari 打开访问</div>
      <div class="safari-url-box" id="safariUrlText">https://wad33.com/</div>
      <button class="safari-copy-btn" id="safariCopyBtn">复制当前链接</button>
    </div>
  </div>

  <!-- 引入外部 JS -->
  <script src="script.js"></script>
</body>
</html>
