/* ============================================================
   portfolio.js â€” All-in-one portfolio script (no ES modules)
   Works directly from file:// â€” no server needed
   ============================================================ */

// â”€â”€ Inline Data (replaces fetch calls) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

var PROJECTS_DATA = [
  { id:'p1', name:'Trading Dashboard', description:'Real-time trading analytics with live chart updates, equity curves, and multi-strategy performance tracking.', category:'fullstack', tags:['JavaScript','Chart.js','WebSocket','Node.js'], liveUrl:'https://ankit-7.itch.io/paper-trading', githubUrl:'https://github.com/AnkitA772sudo/Paper_Trading' },
  { id:'p2', name:'Cyberpunk Portfolio', description:'This very portfolio â€” a fully static cyberpunk-aesthetic site built with HTML5, CSS3, and vanilla JS.', category:'frontend', tags:['HTML5','CSS3','JavaScript','GSAP','Three.js'], liveUrl:'#hero', githubUrl:'#' },
  { id:'p4', name:'TikTok Content Creator Website', description:'A modern personal brand website built for a TikTok content creator, featuring a stylish UI, social media integration, and a responsive design focused on engagement and collaborations.', category:'frontend', tags:['HTML','CSS3','JavaScript'], liveUrl:'#', githubUrl:'#' }
];

var GAMES_DATA = [
  { id:'g1', title:'Apricity', description:'Guide Kiri through surreal depths toward the light, uncovering unexpected twists and the deeper meaning behind "warmth of the sun in winter" as you explore and progress through this atmospheric journey.', engine:'GameMaker', playUrl:'https://heartlythenewbie.itch.io/apricity', screenshotUrl:'apricity.png', devlogs:[
    { date:'2026-02-22', entry:'A futuristic, interactive portfolio that blends stock trading, web development, and game creation.', gameTitle:'MY Portfolio' },
    { date:'2026-01-15', entry:'Developed a winter-themed 2D platformer during HackClub CampfireKathmandu GameJam.' }
  ]},
  { id:'g2', title:'Orbit Survivor', description:'A gravity-driven sci-fi survival roguelike where you fight for existence in a collapsing star system. Use planetary slingshots and orbital momentum to dodge meteors, escape black holes, and push your ship ever further through cosmic chaos — mastering physics is your only way to survive the endless void.', engine:'Godot', playUrl:'https://ankit-7.itch.io/orbit-survivor', screenshotUrl:'Photo1.png', devlogs:[
    { date:'2026-04-15', entry:'A gravity-driven sci-fi survival roguelike where you fight for existence in a collapsing star system.' },
    { date:'2025-01-05', entry:'A premium personal portfolio website for a content creator.', gameTitle:'TikTok Content Creator Webpage' }
  ]}
];

var SKILLS_DATA = [
  { id:"frontend", label:"Frontend",       level:0,  parent:null,       category:"frontend", icon:"FE" },
  { id:"backend",  label:"Backend",        level:0,  parent:null,       category:"backend",  icon:"BE" },
  { id:"trading",  label:"Trading",        level:0,  parent:null,       category:"trading",  icon:"TR" },
  { id:"gamedev",  label:"Game Dev",       level:0,  parent:null,       category:"gamedev",  icon:"GD" },
  { id:"htmlcss",  label:"HTML/CSS",       level:95, parent:"frontend", category:"frontend", icon:"H" },
  { id:"js",       label:"JavaScript",     level:90, parent:"frontend", category:"frontend", icon:"JS" },
  { id:"react",    label:"React",          level:80, parent:"frontend", category:"frontend", icon:"R" },
  { id:"python",   label:"Python",         level:78, parent:"backend",  category:"backend",  icon:"PY" },
  { id:"sql",      label:"SQL",            level:70, parent:"backend",  category:"backend",  icon:"DB" },
  { id:"ta",       label:"Tech Analysis",  level:88, parent:"trading",  category:"trading",  icon:"TA" },
  { id:"algo",     label:"Algo Trading",   level:75, parent:"trading",  category:"trading",  icon:"AT" },
  { id:"options",  label:"Options",        level:72, parent:"trading",  category:"trading",  icon:"OP" },
  { id:"godot",    label:"Godot",          level:80, parent:"gamedev",  category:"gamedev",  icon:"GO" },
  { id:"gamemaker",label:"GameMaker",      level:70, parent:"gamedev",  category:"gamedev",  icon:"GM" }
];

var TIMELINE_DATA = [
  { date:'Feb 2024', title:'First Trading Account', description:'Opened first brokerage account. Started studying technical analysis, price action, and market structure.', type:'trading' },
 { date:'Sep 2024', title:'Algorithmic Trading', description:'Wrote first automated trading strategy in Python. Backtested across 5 years of data with positive expectancy.', type:'trading'},
  { date:'Jan 2025', title:'Started Web Development', description:'Begin learning HTML, CSS, and JavaScript. Built first static websites and fell in love with the craft.', type:'webdev' },
  { date:'Jan 2026', title:'First Game Jam', description:'Participated in a game jam organized by HackClub (Campfire Kathmandu) using Godot,Gamemaker. Shipped a playable prototype and Runner Up of the Event.', type:'gamedev' },
 { date:'Apr 2026', title:'Indie Game Release', description:'Released  indie game on itch.io such as Apricity , Orbit Survivor. Received positive feedback.', type:'gamedev' },
  { date:'Mar 2026', title:'Full-Stack Projects', description:'Expanded into Node.js and databases. Shipped first full-stack web application with real users.', type:'webdev' },
  { date:'2024', title:'Three Worlds Converge', description:'Trading, web development, and game creation are now deeply intertwined. Building at the intersection of all three.', type:'milestone' }
];

var MISSIONS_DATA = [
  { title:'Building This Portfolio', status:'active', description:'Crafting a cyberpunk-aesthetic portfolio that fuses trading, web dev, and game dev into one experience.', progress:90 },
  { title:'Algo Trading Bot v2', status:'active', description:'Refining a momentum-based trading algorithm with improved risk management and backtesting framework.', progress:65 },
  { title:'Full-Stack SaaS Dashboard', status:'paused', description:'A real-time analytics dashboard for small trading firms. Paused while focusing on the portfolio.', progress:30 }
];

var STATS_DATA = [
  { value:'68%', label:'Win Rate' },
  { value:'2.4:1', label:'Avg R:R' },
  { value:'100', label:'Total Trades' },
  { value:'+18.3%', label:'Best Month' }
];

var STRATEGIES_DATA = [
  { title:'Momentum Trading', description:'Capitalising on strong directional moves using breakout entries, volume confirmation, and trailing stops.', metrics:[{label:'Win Rate',value:'68%'},{label:'Avg R:R',value:'2.8:1'},{label:'Trades/Mo',value:'18'}] },
  { title:'Swing Trading', description:'Multi-day holds targeting key support/resistance levels. Combines price action with RSI divergence for high-probability setups.', metrics:[{label:'Win Rate',value:'62%'},{label:'Avg R:R',value:'2.1:1'},{label:'Trades/Mo',value:'8'}] },
  { title:'Options Strategies', description:'Defined-risk plays using spreads and iron condors. Theta decay and IV crush are the primary edges exploited.', metrics:[{label:'Win Rate',value:'71%'},{label:'Avg R:R',value:'1.9:1'},{label:'Trades/Mo',value:'6'}] }
];

var CATEGORY_COLORS = {
  frontend: { border:'#00f5ff', glow:'rgba(0,245,255,0.35)', text:'#00f5ff' },
  backend:  { border:'#ff00ff', glow:'rgba(255,0,255,0.35)', text:'#ff00ff' },
  trading:  { border:'#ffd700', glow:'rgba(255,215,0,0.35)', text:'#ffd700' },
  gamedev:  { border:'#00ff88', glow:'rgba(0,255,136,0.35)', text:'#00ff88' }
};

var THUMB_GRADIENTS = [
  'linear-gradient(135deg,#0a0a0f 0%,#1a0533 40%,rgba(255,0,255,0.13) 70%,rgba(0,245,255,0.07) 100%)',
  'linear-gradient(135deg,#0a0a0f 0%,#001a33 40%,rgba(0,245,255,0.13) 70%,rgba(255,215,0,0.07) 100%)',
  'linear-gradient(135deg,#0a0a0f 0%,#1a1a00 40%,rgba(255,215,0,0.13) 70%,rgba(255,0,255,0.07) 100%)'
];

// â”€â”€ Loading Screen â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initLoader() {
  var s = document.getElementById('loading-screen');
  if (!s) return;
  // Hide after 800ms â€” enough for CDN scripts to load
  setTimeout(function() {
    s.style.transition = 'opacity 0.5s ease';
    s.style.opacity = '0';
    setTimeout(function() { s.style.display = 'none'; }, 520);
  }, 800);
}

// â”€â”€ Custom Cursor â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initCursor() {
  var dot  = document.getElementById('cursor-dot');
  var ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  if (window.matchMedia('(pointer: coarse)').matches) {
    dot.style.display = 'none'; ring.style.display = 'none';
    document.body.style.cursor = 'auto'; return;
  }
  var mx = window.innerWidth/2, my = window.innerHeight/2;
  var rx = mx, ry = my;
  document.addEventListener('mousemove', function(e){ mx=e.clientX; my=e.clientY; });
  document.addEventListener('pointerover', function(e){
    if (e.target.closest('a,button,[role="button"]')) {
      dot.classList.add('cursor--hover'); ring.classList.add('cursor--hover');
    }
  });
  document.addEventListener('pointerout', function(e){
    if (e.target.closest('a,button,[role="button"]')) {
      dot.classList.remove('cursor--hover'); ring.classList.remove('cursor--hover');
    }
  });
  function loop() {
    dot.style.transform  = 'translate3d(calc('+mx+'px - 50%),calc('+my+'px - 50%),0)';
    rx += (mx-rx)*0.12; ry += (my-ry)*0.12;
    ring.style.transform = 'translate3d(calc('+rx+'px - 50%),calc('+ry+'px - 50%),0)';
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

// â”€â”€ Navigation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initNav() {
  var nav = document.getElementById('main-nav');
  if (!nav) return;
  var links    = nav.querySelectorAll('.nav-links a[href^="#"]');
  var hamburger= document.getElementById('hamburger');
  var navLinks = nav.querySelector('.nav-links');
  var sections = Array.from(document.querySelectorAll('section[id]'));
  var ratios   = {};
  sections.forEach(function(s){ ratios[s.id] = 0; });

  // Scroll-spy
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ ratios[e.target.id] = e.intersectionRatio; });
    var best = '', bestVal = -1;
    sections.forEach(function(s){ if(ratios[s.id]>bestVal){bestVal=ratios[s.id];best=s.id;} });
    links.forEach(function(a){
      a.classList.toggle('active', a.getAttribute('href')==='#'+best);
    });
  }, { threshold:[0,0.1,0.2,0.3,0.4,0.5] });
  sections.forEach(function(s){ obs.observe(s); });

  // Scrolled state
  window.addEventListener('scroll', function(){
    nav.classList.toggle('nav--scrolled', window.scrollY > 80);
  }, { passive:true });

  // Hamburger
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function(){
      var open = hamburger.getAttribute('aria-expanded')==='true';
      hamburger.setAttribute('aria-expanded', String(!open));
      navLinks.classList.toggle('nav--open', !open);
    });
    links.forEach(function(a){
      a.addEventListener('click', function(){
        hamburger.setAttribute('aria-expanded','false');
        navLinks.classList.remove('nav--open');
      });
    });
  }

  // Smooth scroll all anchors
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var href = a.getAttribute('href');
      if (!href || href==='#') return;
      var t = document.querySelector(href);
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior:'smooth' });
    });
  });
}

// â”€â”€ Theme Toggle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initTheme() {
  var btn = document.getElementById('theme-toggle');
  var saved = 'dark';
  try { saved = localStorage.getItem('theme') || 'dark'; } catch(e){}
  applyTheme(saved);
  if (btn) btn.addEventListener('click', function(){
    var next = document.documentElement.getAttribute('data-theme')==='dark' ? 'light' : 'dark';
    applyTheme(next);
  });
}
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  try { localStorage.setItem('theme', t); } catch(e){}
  var icon = document.querySelector('#theme-toggle .theme-icon');
  if (icon) icon.textContent = t==='dark' ? 'DARK' : 'LIGHT';
}

// â”€â”€ Hero â€” Typing Animation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initHero() {
  var el = document.getElementById('typing-text');
  if (!el) return;
  var roles = ['Stock Trader','Web Developer','Game Maker'];
  var ri=0, ci=0, deleting=false;
  function tick() {
    var word = roles[ri];
    if (!deleting) {
      ci++;
      el.textContent = word.slice(0,ci);
      if (ci>=word.length) { deleting=true; setTimeout(tick,1500); return; }
      setTimeout(tick,60);
    } else {
      ci--;
      el.textContent = word.slice(0,ci);
      if (ci<=0) { deleting=false; ri=(ri+1)%roles.length; setTimeout(tick,400); return; }
      setTimeout(tick,35);
    }
  }
  setTimeout(tick, 500);

  // Three.js particles
  var canvas = document.getElementById('hero-canvas');
  if (canvas && typeof THREE !== 'undefined') {
    try {
      var scene    = new THREE.Scene();
      var camera   = new THREE.PerspectiveCamera(75, canvas.clientWidth/canvas.clientHeight, 0.1, 100);
      camera.position.z = 4;
      var renderer = new THREE.WebGLRenderer({ canvas:canvas, alpha:true, antialias:true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setClearColor(0x000000, 0);
      var pos = new Float32Array(3000*3);
      for (var i=0;i<3000;i++) {
        var x,y,z;
        do { x=(Math.random()-0.5)*2; y=(Math.random()-0.5)*2; z=(Math.random()-0.5)*2; }
        while (x*x+y*y+z*z>1);
        pos[i*3]=x*5; pos[i*3+1]=y*5; pos[i*3+2]=z*5;
      }
      var geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
      var mat = new THREE.PointsMaterial({ color:0x00f5ff, size:0.02, sizeAttenuation:true, transparent:true, opacity:0.85 });
      var pts = new THREE.Points(geo, mat);
      scene.add(pts);
      (function animate(){ requestAnimationFrame(animate); pts.rotation.y+=0.0005; pts.rotation.x+=0.0002; renderer.render(scene,camera); })();
      window.addEventListener('resize', function(){
        var h = document.getElementById('hero');
        if (!h) return;
        camera.aspect = h.clientWidth/h.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(h.clientWidth, h.clientHeight);
      });
    } catch(e) {
      var hero = document.getElementById('hero');
      if (hero) hero.classList.add('hero--fallback');
    }
  }

  // GSAP parallax
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('#hero-canvas', { yPercent:30, ease:'none', scrollTrigger:{ trigger:'#hero', start:'top top', end:'bottom top', scrub:true } });
  }
}

// â”€â”€ Three Worlds â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initThreeWorlds() {
  document.querySelectorAll('.portal-card').forEach(function(card){
    card.addEventListener('mousemove', function(e){
      var r = card.getBoundingClientRect();
      var x = (e.clientX-r.left)/r.width-0.5;
      var y = (e.clientY-r.top)/r.height-0.5;
      card.style.transform = 'perspective(600px) rotateY('+(x*20)+'deg) rotateX('+(-y*20)+'deg) scale(1.02)';
    });
    card.addEventListener('mouseleave', function(){
      card.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
    });
    function nav(){ var t=document.querySelector(card.dataset.target); if(t) t.scrollIntoView({behavior:'smooth'}); }
    card.addEventListener('click', nav);
    card.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); nav(); } });
  });
}

// â”€â”€ Trading Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initTrading() {
  var statsEl = document.getElementById('trading-stats');
  if (statsEl) {
    statsEl.innerHTML = STATS_DATA.map(function(s){
      return '<div class="stat-card glass-card"><div class="stat-value">'+s.value+'</div><div class="stat-label">'+s.label+'</div></div>';
    }).join('');
  }
  var stratEl = document.getElementById('trading-strategies');
  if (stratEl) {
    stratEl.innerHTML = STRATEGIES_DATA.map(function(s){
      return '<div class="strategy-card glass-card"><h3 class="strategy-title">'+s.title+'</h3><p class="strategy-desc">'+s.description+'</p><div class="strategy-metrics">'+
        s.metrics.map(function(m){ return '<div class="strategy-metric"><span class="metric-value">'+m.value+'</span><span class="metric-label">'+m.label+'</span></div>'; }).join('')+
      '</div></div>';
    }).join('');
  }
  if (typeof Chart === 'undefined') return;
  var ec = document.getElementById('equity-chart');
  var rc = document.getElementById('radar-chart');
  if (!ec || !rc) return;
  var eqLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var eqData   = [10000,10420,10180,10850,11300,10940,11680,12100,11750,12480,13050,13820];
  var ectx = ec.getContext('2d');
  var grad = ectx.createLinearGradient(0,0,0,300);
  grad.addColorStop(0,'rgba(0,245,255,0.35)'); grad.addColorStop(1,'rgba(0,245,255,0)');
  var equityChart = new Chart(ectx, {
    type:'line',
    data:{ labels:eqLabels, datasets:[{ label:'Equity ($)', data:new Array(12).fill(null), borderColor:'#00f5ff', backgroundColor:grad, borderWidth:2, tension:0.4, fill:true, pointBackgroundColor:'#00f5ff', pointRadius:4 }] },
    options:{ responsive:true, animation:{duration:0}, plugins:{ legend:{labels:{color:'#a0a0b0'}}, tooltip:{backgroundColor:'rgba(13,17,23,0.9)',borderColor:'#00f5ff',borderWidth:1,titleColor:'#00f5ff',bodyColor:'#e0e0e0'} }, scales:{ x:{grid:{color:'rgba(0,245,255,0.05)'},ticks:{color:'#606070'}}, y:{grid:{color:'rgba(0,245,255,0.05)'},ticks:{color:'#606070',callback:function(v){return '$'+v.toLocaleString();}}} } }
  });
  var radarChart = new Chart(rc.getContext('2d'), {
    type:'radar',
    data:{ labels:['Momentum','Swing','Mean Rev','Options','Crypto'], datasets:[{ label:'Score', data:new Array(5).fill(0), borderColor:'#ff00ff', backgroundColor:'rgba(255,0,255,0.15)', borderWidth:2, pointBackgroundColor:'#ff00ff', pointRadius:4 }] },
    options:{ responsive:true, animation:{duration:0}, plugins:{ legend:{labels:{color:'#a0a0b0'}} }, scales:{ r:{min:0,max:100,grid:{color:'rgba(255,0,255,0.1)'},angleLines:{color:'rgba(255,0,255,0.15)'},pointLabels:{color:'#a0a0b0'},ticks:{color:'#606070',backdropColor:'transparent',stepSize:25}} } }
  });
  var animated = false;
  new IntersectionObserver(function(entries){
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      equityChart.data.datasets[0].data = eqData;
      equityChart.update({ duration:1200, easing:'easeInOutQuart' });
      radarChart.data.datasets[0].data = [85,72,60,78,65];
      radarChart.update({ duration:1200, easing:'easeInOutQuart' });
    }
  }, { threshold:0.25 }).observe(document.getElementById('trading'));
}

// â”€â”€ Projects Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function applyTilt(el) {
  el.addEventListener('mousemove', function(e){
    var r=el.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-0.5, y=(e.clientY-r.top)/r.height-0.5;
    el.style.transform='perspective(600px) rotateY('+(x*16)+'deg) rotateX('+(-y*16)+'deg) scale(1.02)';
  });
  el.addEventListener('mouseleave', function(){ el.style.transform='perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)'; });
}

function renderProjects(projects) {
  var grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.style.opacity='0';
  setTimeout(function(){
    grid.innerHTML = projects.map(function(p){
      var tags = p.tags.map(function(t){ return '<span class="tag">'+t+'</span>'; }).join('');
      var live = p.liveUrl ? '<a href="'+p.liveUrl+'" class="btn-primary btn--sm" target="_blank" rel="noopener noreferrer">Live Demo</a>' : '';
      var gh   = p.githubUrl ? '<a href="'+p.githubUrl+'" class="btn-ghost btn--sm" target="_blank">GitHub</a>' : '';
      return '<article class="project-card glass-card" data-category="'+p.category+'"><div class="project-card-inner"><div class="project-header"><h3 class="project-name">'+p.name+'</h3><span class="project-category-badge">'+p.category+'</span></div><p class="project-desc">'+p.description+'</p><div class="project-tags">'+tags+'</div><div class="project-actions">'+live+gh+'</div></div></article>';
    }).join('');
    grid.querySelectorAll('.project-card').forEach(applyTilt);
    grid.style.transition='opacity 0.35s ease'; grid.style.opacity='1';
  }, 150);
}

function initProjects() {
  renderProjects(PROJECTS_DATA);
  document.querySelectorAll('.filter-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.dataset.filter;
      renderProjects(cat==='all' ? PROJECTS_DATA : PROJECTS_DATA.filter(function(p){ return p.category===cat; }));
    });
  });
}

// â”€â”€ Games Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initGames() {
  var grid = document.getElementById('games-grid');
  var devEl = document.getElementById('devlogs');
  if (grid) {
    grid.innerHTML = GAMES_DATA.map(function(g,i){
      var bg = THUMB_GRADIENTS[i%THUMB_GRADIENTS.length];
      var play = g.playUrl ? '<a href="'+g.playUrl+'" class="btn-primary game-play-btn" target="_blank" rel="noopener noreferrer">&#9654; Play</a>' : '<span class="btn-secondary game-play-btn" style="opacity:0.5">Coming Soon</span>';
      var imgHtml = g.screenshotUrl ? '<img src="'+g.screenshotUrl+'" alt="'+g.title+' screenshot" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;" onerror="this.style.display=\'none\'" />' : '';
      return '<article class="game-card glass-card"><div class="game-thumb" style="background:'+bg+'"><div class="game-thumb-icon">&#127918;</div>'+imgHtml+'</div><div class="game-body"><h3 class="game-title">'+g.title+'</h3><span class="game-engine">'+g.engine+'</span><p class="game-desc">'+g.description+'</p>'+play+'</div></article>';
    }).join('');
    grid.querySelectorAll('.game-card').forEach(function(c){
      c.addEventListener('mouseenter', function(){ c.classList.add('game-card--hover'); });
      c.addEventListener('mouseleave', function(){ c.classList.remove('game-card--hover'); });
    });
  }
  if (devEl) {
    var logs = [];
    GAMES_DATA.forEach(function(g){ g.devlogs.forEach(function(d){ logs.push(Object.assign({},d,{gameTitle: d.gameTitle || g.title})); }); });
    logs.sort(function(a,b){ return new Date(b.date)-new Date(a.date); });
    devEl.innerHTML = logs.map(function(l){
      var d = new Date(l.date); var fmt = isNaN(d)?l.date:d.toLocaleDateString('en-GB',{year:'numeric',month:'short',day:'numeric'});
      return '<div class="devlog-entry glass-card"><div class="devlog-meta"><time class="devlog-date">'+fmt+'</time><span class="devlog-game">'+l.gameTitle+'</span></div><p class="devlog-text">'+l.entry+'</p></div>';
    }).join('');
  }
}

// â”€â”€ Skill Tree â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initSkillTree() {
  var wrap = document.getElementById('skill-tree-container');
  var tip  = document.getElementById('skill-tooltip');
  if (!wrap) return;
  var roots    = SKILLS_DATA.filter(function(n){ return n.parent===null; });
  var children = SKILLS_DATA.filter(function(n){ return n.parent!==null; });
  var tree = document.createElement('div'); tree.className='skill-tree';
  roots.forEach(function(root){
    var col = CATEGORY_COLORS[root.category]||CATEGORY_COLORS.frontend;
    var kids = children.filter(function(c){ return c.parent===root.id; });
    var cat = document.createElement('div'); cat.className='skill-category glass-card';
    cat.style.setProperty('--cat-border',col.border); cat.style.setProperty('--cat-glow',col.glow); cat.style.setProperty('--cat-text',col.text); cat.style.borderColor=col.border;
    var title = document.createElement('div'); title.className='skill-category-title'; title.style.color=col.text; title.style.textShadow='0 0 12px '+col.border;
    title.innerHTML='<span class="skill-cat-icon">'+root.icon+'</span>'+root.label;
    var nodes = document.createElement('div'); nodes.className='skill-nodes';
    nodes.innerHTML = kids.map(function(k){
      return '<div class="skill-node" data-id="'+k.id+'" data-level="'+k.level+'" data-label="'+k.label+'"><div class="skill-node-header"><span class="skill-node-label"><span class="skill-node-icon">'+k.icon+'</span>'+k.label+'</span><span class="skill-node-level">'+k.level+'</span></div><div class="skill-bar"><div class="skill-bar-fill" style="--target-width:'+k.level+'%"></div></div></div>';
    }).join('');
    cat.appendChild(title); cat.appendChild(nodes); tree.appendChild(cat);
  });
  wrap.appendChild(tree);
  // Tooltip
  if (tip) {
    wrap.querySelectorAll('.skill-node').forEach(function(n){
      n.addEventListener('mouseenter', function(){
        var r=n.getBoundingClientRect(), left=r.right+12, top=r.top+r.height/2-28;
        if(left+180>window.innerWidth-8) left=r.left-192;
        top=Math.max(8,Math.min(top,window.innerHeight-80));
        tip.style.left=left+'px'; tip.style.top=top+'px';
        tip.innerHTML='<span class="tooltip-label">'+n.dataset.label+'</span><span class="tooltip-level">LVL '+n.dataset.level+'</span>';
        tip.classList.add('visible'); tip.removeAttribute('aria-hidden');
      });
      n.addEventListener('mouseleave', function(){ tip.classList.remove('visible'); tip.setAttribute('aria-hidden','true'); });
    });
  }
  // Animate in
  var section = document.getElementById('skills');
  if (section) {
    new IntersectionObserver(function(entries){
      if (!entries[0].isIntersecting) return;
      var allNodes = wrap.querySelectorAll('.skill-node');
      allNodes.forEach(function(n,i){
        setTimeout(function(){
          n.classList.add('skill-node--visible');
          var fill=n.querySelector('.skill-bar-fill'); if(fill) fill.style.width=n.dataset.level+'%';
        }, i*80);
      });
    }, { threshold:0.15 }).observe(section);
  }
}

// â”€â”€ Timeline â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initTimeline() {
  var list = document.getElementById('timeline-list');
  if (!list) return;
  var TYPE_COLORS = { trading:'var(--accent-gold)', webdev:'var(--accent-cyan)', gamedev:'var(--accent-magenta)', milestone:'#00e676' };
  list.innerHTML = TIMELINE_DATA.map(function(e,i){
    var col = TYPE_COLORS[e.type]||'var(--accent-cyan)';
    var badge = e.type ? '<span class="timeline-type-badge" style="color:'+col+';border-color:'+col+'">'+e.type+'</span>' : '';
    return '<li class="timeline-entry" data-aos="'+(i%2===0?'fade-right':'fade-left')+'" data-aos-delay="'+(i*80)+'"><div class="timeline-card glass-card"><p class="timeline-date">'+e.date+'</p><h3 class="timeline-title">'+e.title+'</h3>'+badge+'<p class="timeline-desc">'+e.description+'</p></div></li>';
  }).join('');
  if (typeof AOS !== 'undefined') AOS.refresh();
}

// â”€â”€ Missions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initMissions() {
  var grid = document.getElementById('missions-grid');
  if (!grid) return;
  grid.innerHTML = MISSIONS_DATA.map(function(m,i){
    return '<div class="mission-card glass-card" data-aos="zoom-in" data-aos-delay="'+(i*100)+'"><div class="mission-header"><h3 class="mission-title">'+m.title+'</h3><span class="mission-status mission-status--'+m.status+'">'+m.status+'</span></div><p class="mission-desc">'+m.description+'</p><div class="mission-progress-label"><span>Progress</span><span>'+m.progress+'%</span></div><div class="mission-progress-bar"><div class="mission-progress-fill" style="width:'+m.progress+'%"></div></div></div>';
  }).join('');
}

// â”€â”€ Contact â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initContact() {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var successEl = document.getElementById('form-success');
  function showErr(field, msg) { var s=document.getElementById('error-'+field); if(s) s.textContent=msg; }
  function clearErr(field) { var s=document.getElementById('error-'+field); if(s) s.textContent=''; }
  ['name','email','message'].forEach(function(f){
    var inp = form.querySelector('[name="'+f+'"]');
    if (inp) inp.addEventListener('focus', function(){ clearErr(f); });
  });
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name    = (form.querySelector('[name="name"]')||{}).value||'';
    var email   = (form.querySelector('[name="email"]')||{}).value||'';
    var message = (form.querySelector('[name="message"]')||{}).value||'';
    ['name','email','message'].forEach(clearErr);
    if (successEl) successEl.hidden = true;
    var ok = true;
    if (!name.trim())    { showErr('name','Name is required.');    ok=false; }
    if (!email.trim())   { showErr('email','Email is required.');  ok=false; }
    if (!message.trim()) { showErr('message','Message is required.'); ok=false; }
    if (ok) { if(successEl) successEl.removeAttribute('hidden'); form.reset(); }
  });
}

// â”€â”€ Easter Egg Terminal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initTerminal() {
  var overlay = document.getElementById('terminal-overlay');
  if (!overlay) return;
  var win     = overlay.querySelector('.terminal-window');
  var outEl   = document.getElementById('terminal-output');
  var inpEl   = document.getElementById('terminal-input');
  var closeBtn= document.getElementById('terminal-close');
  var buf='', isOpen=false;
  function addLine(txt) { var d=document.createElement('div'); d.className='terminal-line'; d.textContent=txt; outEl.appendChild(d); outEl.scrollTop=outEl.scrollHeight; }
  function open() {
    if(isOpen) return; isOpen=true; buf='';
    overlay.removeAttribute('hidden');
    if (!outEl.hasChildNodes()) { addLine('PORTFOLIO TERMINAL v1.0.0'); addLine('Type "help" for commands.'); addLine(''); }
    if (typeof gsap!=='undefined') { gsap.fromTo(overlay,{opacity:0},{opacity:1,duration:0.25}); gsap.fromTo(win,{opacity:0,scale:0.88,y:24},{opacity:1,scale:1,y:0,duration:0.35,ease:'back.out(1.4)'}); }
    setTimeout(function(){ if(inpEl) inpEl.focus(); }, 350);
  }
  function close() {
    if(!isOpen) return; isOpen=false;
    if (typeof gsap!=='undefined') { gsap.to(overlay,{opacity:0,duration:0.3,onComplete:function(){ overlay.setAttribute('hidden',''); }}); }
    else { overlay.setAttribute('hidden',''); }
  }
  function cmd(c) {
    switch(c.trim().toLowerCase()) {
      case 'whoami':      return 'Ankit Gaire | Stock Trader | Web Developer | Indie Game Maker\nBuilding Markets, Websites & Worlds.';
      case 'ls projects': return PROJECTS_DATA.map(function(p){ return '  '+p.name+' ['+p.category+']'; }).join('\n');
      case 'hack':        return '[SYS] Initiating...\n[â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆ] 100%\nACCESS GRANTED. Just kidding â€” this is a portfolio.';
      case 'help':        return 'Commands: whoami | ls projects | hack | help | exit';
      case 'exit':        return 'Closing terminal...';
      default:            return 'Command not found: "'+c+'". Type "help".';
    }
  }
  document.addEventListener('keydown', function(e){
    if (e.key==='Escape') { if(isOpen) close(); return; }
    var tag = document.activeElement && document.activeElement.tagName;
    if (tag==='INPUT'||tag==='TEXTAREA') return;
    if (e.key.length!==1) return;
    buf=(buf+e.key.toLowerCase()).slice(-8);
    if (buf==='terminal') open();
  });
  if (inpEl) {
    inpEl.addEventListener('keydown', function(e){
      if (e.key!=='Enter') return;
      var raw=inpEl.value; inpEl.value='';
      if (!raw.trim()) return;
      var echo=document.createElement('div'); echo.className='terminal-line terminal-line--cmd'; echo.textContent='> '+raw.trim(); outEl.appendChild(echo);
      addLine(cmd(raw)); addLine('');
      if (raw.trim().toLowerCase()==='exit') setTimeout(close,400);
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', function(e){ if(e.target===overlay) close(); });
}

// â”€â”€ Footer year â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initFooter() {
  var el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

// â”€â”€ AOS Init â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration:800, once:true, offset:80 });
  }
}

// â”€â”€ Bootstrap â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
window.addEventListener('load', function() {
  initLoader();
  initCursor();
  initNav();
  initTheme();
  initHero();
  initThreeWorlds();
  initTrading();
  initProjects();
  initGames();
  initSkillTree();
  initTimeline();
  initMissions();
  initContact();
  initTerminal();
  initFooter();
  initAOS();
});
