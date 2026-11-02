// ==========================================
// 1. 轮播图逻辑
// ==========================================
let slideIndex = 0;
function showSlide(i) { 
  slideIndex = i; 
  document.querySelectorAll('.slide').forEach((el, n) => el.classList.toggle('active', n === i)); 
  document.querySelectorAll('.dot').forEach((el, n) => el.classList.toggle('active', n === i)); 
} 
setInterval(() => showSlide((slideIndex + 1) % 3), 5000);

// ==========================================
// 2. 游戏画廊逻辑
// ==========================================
const games = [['麻将胡了', 'game-mahjong.webp', 'x25000', 0], ['麻将胡了2', 'game-mahjong2.webp', 'x100000', 1], ['赏金女王', 'game-bounty-queen.webp', 'x50000', 0], ['赏金大对决', 'game-bounty-duel.webp', 'x5000', 0], ['寻宝黄金城', 'game-gold-city.webp', 'x100000', 0], ['赏金船长', 'game-bounty-captain.webp', 'x30000', 0], ['亡灵大盗', 'game-undead-thief.webp', 'x25000', 0], ['少林足球', 'game-shaolin-soccer.webp', 'x4000', 0], ['招财喵', 'game-lucky-cat.webp', 'x20000', 0], ['麒麟送宝', 'game-qilin.webp', 'x80000', 1], ['夜醉佳人', 'game-night-beauty.webp', 'x100000', 0], ['双喜临门', 'game-double-joy.webp', 'x100000', 0], ['福运象财神', 'game-elephant-god.webp', 'x100000', 0], ['爱尔兰精灵', 'game-irish-elf.webp', 'x100000', 1], ['寻龙探宝', 'game-dragon-treasure.webp', 'x2500', 0], ['十倍金牛', 'game-golden-bull.webp', 'x2000', 0], ['赢财神', 'game-fortune-god.webp', 'x100000', 0]];

function renderGames() { 
  const gamesContainer = document.getElementById('games');
  if (!gamesContainer) return;

  const rowIds = ['row1', 'row2', 'row3'];

  rowIds.forEach((id, ri) => { 
    const row = document.createElement('div');
    row.className = 'row' + (ri === 1 ? ' reverse' : '');
    row.id = id;

    const track = document.createElement('div'); 
    track.className = 'track'; 
    const half = document.createElement('div'); 
    half.className = 'track-half'; 
    half.style.display = 'flex'; 
    half.style.gap = '8px'; 
    
    games.slice(ri * 6, ri === 2 ? games.length : ri * 6 + 6).forEach(g => { 
      const el = document.createElement('button'); 
      el.type = 'button'; 
      el.className = 'game'; 
      el.onclick = () => openModal('register'); 
      el.innerHTML = '<img src="assets/source/' + g[1] + '" alt="' + g[0] + '"><div class="name">' + g[0] + '</div><div class="value ' + (g[3] ? '' : 'muted') + '">' + g[2] + '</div>'; 
      half.appendChild(el) 
    }); 
    
    track.appendChild(half); 
    track.appendChild(half.cloneNode(true)); 
    row.appendChild(track);
    gamesContainer.appendChild(row);
  }); 
} 
renderGames();

// ==========================================
// 3. 弹窗及验证码逻辑
// ==========================================
let mode = 'register', captchaCode = '', captchaLocked = false, captchaTimer = null; 

function genCaptcha() { 
  const pools = ['ABCDEFGHJKLMNPQRSTUVWXYZ', 'abcdefghjkmnpqrstuvwxyz', '23456789', '@#$%&*!?']; 
  let s = ''; 
  for (let i = 0; i < 6; i++) { 
    const p = pools[i % 3 === 2 ? (i === 4 ? 2 : 3) : i % 3]; 
    s += p[Math.floor(Math.random() * p.length)] 
  } 
  return s 
} 

function getCaptcha() { 
  if (captchaLocked) return; 
  captchaCode = genCaptcha(); 
  const box = document.getElementById('captchaCode'); 
  box.textContent = captchaCode; 
  box.classList.remove('locked'); 
  const hint = document.getElementById('formHint'); 
  hint.className = 'hint'; 
  hint.textContent = '验证码已生成，请输入 6 位验证码。' 
} 

function lockCaptcha() { 
  captchaLocked = true; 
  const box = document.getElementById('captchaCode'); 
  box.classList.add('locked'); 
  let s = 60; 
  box.textContent = s + 's 后重试'; 
  captchaTimer = setInterval(() => { 
    s--; 
    if (s <= 0) { 
      clearInterval(captchaTimer); 
      captchaTimer = null; 
      captchaLocked = false; 
      box.classList.remove('locked'); 
      box.textContent = '重新获取' 
    } else { 
      box.textContent = s + 's 后重试' 
    } 
  }, 1000) 
} 

function resetCaptcha() { 
  if (captchaTimer) { 
    clearInterval(captchaTimer); 
    captchaTimer = null 
  } 
  captchaCode = ''; 
  captchaLocked = false; 
  const box = document.getElementById('captchaCode'); 
  box.classList.remove('locked'); 
  box.textContent = '点击获取' 
} 

function openModal(next) { 
  mode = next; 
  renderModal(); 
  document.getElementById('modalBackdrop').classList.add('show'); 
  setTimeout(() => document.getElementById('username').focus(), 30) 
} 

function closeModal() { 
  document.getElementById('modalBackdrop').classList.remove('show') 
} 

function backdropClose(e) { 
  if (e.target.id === 'modalBackdrop') closeModal() 
} 

function switchMode() { 
  openModal(mode === 'register' ? 'login' : 'register') 
} 

function renderModal() { 
  const r = mode === 'register'; 
  document.getElementById('modalTitle').textContent = r ? '注册账号' : '登录账号'; 
  document.getElementById('modalSub').textContent = r ? '填写信息完成注册。' : '输入账号密码完成登录。'; 
  document.getElementById('confirmField').style.display = r ? 'block' : 'none'; 
  document.getElementById('phoneField').style.display = r ? 'block' : 'none'; 
  document.getElementById('confirm').required = r; 
  document.getElementById('phone').required = r; 
  document.getElementById('submitBtn').textContent = r ? '注册账号' : '登录账号'; 
  document.getElementById('switchBtn').textContent = r ? '已有账号？前往登录' : '没有账号？注册账号'; 
  document.getElementById('formHint').textContent = ''; 
  resetCaptcha() 
} 

function handleSubmit(e) { 
  e.preventDefault(); 
  const hint = document.getElementById('formHint'); 
  hint.className = 'hint'; 
  if (mode === 'register' && document.getElementById('password').value !== document.getElementById('confirm').value) { 
    hint.textContent = '两次输入的密码不一致。'; 
    return 
  } 
  if (!captchaCode) { 
    hint.textContent = '请先点击右侧按钮获取验证码。'; 
    return 
  } 
  if (document.getElementById('captcha').value.trim() !== captchaCode) { 
    hint.textContent = '验证码错误，请等待 60 秒后重新获取。'; 
    document.getElementById('captcha').value = ''; 
    lockCaptcha(); 
    return 
  } 
  hint.className = 'hint ok'; 
  hint.textContent = mode === 'register' ? '注册成功，正在打开登录窗口。' : '登录成功。'; 
  if (mode === 'register') setTimeout(() => openModal('login'), 900) 
} 

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal() });

// ==========================================
// 4. 视频加载及播放兜底
// ==========================================
const heroVideo = document.querySelector('.video-hero video');
const heroSection = document.querySelector('.video-hero');

if (heroVideo) {
  if (heroVideo.readyState >= 3) {
    heroSection.classList.add('ready');
  } else {
    heroVideo.addEventListener('canplay', function () {
      heroSection.classList.add('ready');
    }, { once: true });
  }

  var p = heroVideo.play();
  if (p && p.catch) {
    p.catch(function () {
      var retry = function () {
        heroVideo.play().catch(function () {});
        document.removeEventListener('touchstart', retry);
        document.removeEventListener('click', retry);
      };
      document.addEventListener('touchstart', retry, { once: true, passive: true });
      document.addEventListener('click', retry, { once: true });
    });
  }
}

// ==========================================
// 5. 领奖排行榜数据、懒加载逻辑
// ==========================================
const today = new Date();
const seedString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
let seedBase = 0;
for (let i = 0; i < seedString.length; i++) {
    seedBase += seedString.charCodeAt(i);
}

let currentSeed = seedBase;

function seededRandom() {
    let x = Math.sin(currentSeed++) * 10000;
    return x - Math.floor(x);
}

const namePrefixes = ['wang', 'li', 'zhang', 'liu', 'chen', 'yang', 'huang', 'zhao', 'wu', 'zhou', 'xu', 'sun', 'ma', 'zhu', 'hu', 'guo', 'he', 'gao', 'lin', 'luo', 'lucky', 'king', 'vip', 'top', 'rich', 'boss', 'win', 'star', 'moon', 'sun', 'sky', 'sea', 'wind', 'fire'];
const nameSuffixes = ['01', '88', '99', '66', '77', '8', '9', '0', 'aa', 'bb', 'cc', 'xx', 'yy', 'zz', '168', '888', '666', '520', '1314', '2023', '2024'];

function generateUsername() {
    let word = namePrefixes[Math.floor(seededRandom() * namePrefixes.length)];
    let pLen = Math.floor(seededRandom() * 4) + 2; 
    let prefix = word.slice(0, pLen);
    let suffix = nameSuffixes[Math.floor(seededRandom() * nameSuffixes.length)];
    return `${prefix}***${suffix}`;
}

function generateData(type) {
    let data = [];
    let baseMax = 0;
    let baseMin = 0;

    if (type === 'daily') {
        baseMax = 188888; 
        baseMin = 12000;
    } else if (type === 'weekly') {
        baseMax = 1288888; 
        baseMin = 36000;
    } else {
        baseMax = 6888888; 
        baseMin = 150000;
    }

    for (let i = 0; i < 100; i++) {
        let ratio = Math.pow(0.96, i);
        let amount = baseMin + (baseMax - baseMin) * ratio * (0.9 + seededRandom() * 0.2);
        
        data.push({
            name: generateUsername(),
            amount: parseFloat(amount.toFixed(2))
        });
    }

    data.sort((a, b) => b.amount - a.amount);

    data.forEach(item => {
        item.formattedAmount = item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });

    return data;
}

let leaderboardData = [];
let currentPage = 1;
const pageSize = 10;
let isLoading = false;
let hasMore = true;

const lbListEl = document.getElementById('lb-list');
const lbLoadingEl = document.getElementById('lb-loading');

function renderPage() {
    if (isLoading || !hasMore) return;
    isLoading = true;
    lbLoadingEl.style.display = 'block';

    setTimeout(() => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const pageData = leaderboardData.slice(start, end);

        let html = '';
        pageData.forEach((item, index) => {
            let rank = start + index + 1;
            html += `
                <div class="lb-item">
                    <div class="lb-user">
                        <div class="lb-rank">${rank}</div>
                        <div class="lb-name">${item.name}</div>
                    </div>
                    <div class="lb-amount">${item.formattedAmount}</div>
                </div>
            `;
        });

        lbListEl.insertAdjacentHTML('beforeend', html);

        currentPage++;
        isLoading = false;
        lbLoadingEl.style.display = 'none';

        if (lbListEl.children.length >= 100) {
            hasMore = false;
            lbLoadingEl.textContent = '已展示前100名';
            lbLoadingEl.style.display = 'block';
        }
    }, 300);
}

function initLeaderboard(type) {
    currentSeed = seedBase;
    leaderboardData = generateData(type);
    
    currentPage = 1;
    hasMore = true;
    isLoading = false;
    
    lbListEl.innerHTML = '';
    lbLoadingEl.textContent = '加载中...';
    lbLoadingEl.style.display = 'none';
    
    renderPage();
}

lbListEl.addEventListener('scroll', function() {
    if (this.scrollTop + this.clientHeight >= this.scrollHeight - 20) {
        renderPage();
    }
});

initLeaderboard('daily');

document.querySelectorAll('.lb-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        if (this.classList.contains('active')) return;

        document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const type = this.getAttribute('data-type');
        initLeaderboard(type);
        
        lbListEl.scrollTop = 0;
    });
});

// ==========================================
// 6. Safari 全局拦截逻辑
// ==========================================
const ua = navigator.userAgent.toLowerCase();
const isIOS = /ipad|iphone|ipod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isSafari = isIOS && /safari/.test(ua) && !/crios|fxios|edgios|micromessenger|qq/.test(ua);

const safariModal = document.getElementById('safariModal');
const safariUrlText = document.getElementById('safariUrlText');
const safariCopyBtn = document.getElementById('safariCopyBtn');

if (!isSafari) {
  document.addEventListener('click', function(e) {
    if (e.target.closest('#safariModal')) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    safariUrlText.textContent = window.location.href;
    safariModal.style.display = 'flex';
  }, true); 
}

safariCopyBtn.addEventListener('click', function() {
  const url = window.location.href;
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(url).then(() => {
      alert('链接已复制，请前往 Safari 浏览器粘贴打开');
    }).catch(() => {
      fallbackCopy(url);
    });
  } else {
    fallbackCopy(url);
  }
});

function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand('copy');
    if(successful) {
      alert('链接已复制，请前往 Safari 浏览器粘贴打开');
    } else {
      alert('复制失败，请长按上方链接手动复制');
    }
  } catch (err) {
    alert('复制失败，请长按上方链接手动复制');
  }
  document.body.removeChild(textArea);
}

function closeSafariModal() {
  safariModal.style.display = 'none';
}
