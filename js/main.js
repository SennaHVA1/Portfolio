(function () {
  'use strict';

  /* ──────────────────────────────
     CURSOR
  ────────────────────────────── */
  const ring = document.getElementById('cur-ring');
  const dot  = document.getElementById('cur-dot');
  let mx = 0, my = 0, rx = 0, ry = 0;

  let cursorActive = false;

  function showCustomCursor() {
    document.body.style.cursor = 'none';
    ring.style.opacity = '1';
    dot.style.opacity  = '1';
    cursorActive = true;
  }

  function hideCustomCursor() {
    document.body.style.cursor = 'auto';
    ring.style.opacity = '0';
    dot.style.opacity  = '0';
    cursorActive = false;
  }

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    if (!cursorActive) showCustomCursor();
  }, { passive: true });

  // Restore native cursor when tab is not visible, re-enable on return
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      hideCustomCursor();
    }
  });

  (function animRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button, .stag, .tag, .t-mod, .proj-card, .cert-card, .tl-card')
    .forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

  // Hide cursor on touch devices
  window.addEventListener('touchstart', () => {
    ring.style.display = 'none';
    dot.style.display  = 'none';
    document.body.style.cursor = 'auto';
  }, { once: true, passive: true });

  /* ──────────────────────────────
     NAV
  ────────────────────────────── */
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const menu   = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 55);
  }, { passive: true });

  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.classList.toggle('open', open);
    nav.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      burger.classList.remove('open');
      nav.classList.remove('menu-open');
      document.body.style.overflow = '';
    });
  });

  /* ──────────────────────────────
     HERO CANVAS — PARTICLE NETWORK
  ────────────────────────────── */
  const hc  = document.getElementById('hero-canvas');
  const hx  = hc.getContext('2d');
  const pts = [];
  const COUNT = 65;
  const DIST  = 125;

  function resizeHC() {
    hc.width  = hc.offsetWidth;
    hc.height = hc.offsetHeight;
  }
  resizeHC();
  window.addEventListener('resize', resizeHC, { passive: true });

  for (let i = 0; i < COUNT; i++) {
    pts.push({
      x:  Math.random() * hc.width,
      y:  Math.random() * hc.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r:  Math.random() * 1.6 + 0.5,
      a:  Math.random() * 0.45 + 0.15
    });
  }

  function drawHero() {
    hx.clearRect(0, 0, hc.width, hc.height);
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > hc.width)  p.vx *= -1;
      if (p.y < 0 || p.y > hc.height) p.vy *= -1;

      hx.beginPath();
      hx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      hx.fillStyle = `rgba(212,159,30,${p.a})`;
      hx.fill();

      for (let j = i + 1; j < pts.length; j++) {
        const q  = pts[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < DIST) {
          const a = (1 - d / DIST) * 0.16;
          hx.beginPath();
          hx.moveTo(p.x, p.y);
          hx.lineTo(q.x, q.y);
          hx.strokeStyle = (i + j) % 3 === 0
            ? `rgba(78,144,176,${a})`
            : `rgba(212,159,30,${a})`;
          hx.lineWidth = 0.5;
          hx.stroke();
        }
      }
    }
    requestAnimationFrame(drawHero);
  }
  drawHero();

  /* ──────────────────────────────
     RADAR CANVAS
     Fixed: smaller maxR so labels fit within canvas bounds
     Fixed: Network Sec → blue (#4e90b0)
     Fixed: Compliance → 'ISO/GRC' (short label)
  ────────────────────────────── */
  const rc  = document.getElementById('radar');
  const rx2 = rc.getContext('2d');
  let radarOn = false;
  let sweep   = 0;

  // Colors: gold = offensive, ice = defensive/cloud, champagne = systems, green = frameworks
  const AXES = [
    { label: 'Pen Test.',  val: 0.84, col: '#d49f1e' },  // offensive
    { label: 'Netw. Sec',  val: 0.78, col: '#4e90b0' },  // defensive — was gold (FIXED)
    { label: 'Python',     val: 0.86, col: '#e2d8b8' },  // systems
    { label: 'Linux',      val: 0.88, col: '#e2d8b8' },  // systems
    { label: 'Docker',     val: 0.73, col: '#e2d8b8' },  // systems
    { label: 'Azure',      val: 0.68, col: '#4e90b0' },  // cloud/defensive
    { label: 'ISO/GRC',    val: 0.75, col: '#3ab57a' },  // frameworks — was 'Compliance' → clipped (FIXED)
    { label: 'Blue Team',  val: 0.71, col: '#4e90b0' },  // defensive
  ];
  const N = AXES.length;

  function resizeRC() {
    const dpr = window.devicePixelRatio || 1;
    const s   = rc.offsetWidth;
    rc.width  = s * dpr;
    rc.height = s * dpr;
    rx2.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resizeRC();
  window.addEventListener('resize', resizeRC, { passive: true });

  function axisAngle(i) {
    return (i / N) * Math.PI * 2 - Math.PI / 2;
  }

  function drawRadar() {
    const s  = rc.offsetWidth;
    const cx = s / 2, cy = s / 2;
    // Reduced maxR (0.28 instead of 0.38) so labels stay within canvas bounds
    const maxR     = s * 0.28;
    const labelDist = maxR + 16;
    const fontSize  = Math.max(8, s * 0.024);

    rx2.clearRect(0, 0, s, s);

    // Concentric rings
    for (let r = 1; r <= 4; r++) {
      rx2.beginPath();
      rx2.arc(cx, cy, maxR * r / 4, 0, Math.PI * 2);
      rx2.strokeStyle = 'rgba(25,37,53,0.9)';
      rx2.lineWidth = 1;
      rx2.stroke();
    }

    // Spokes
    for (let i = 0; i < N; i++) {
      const a = axisAngle(i);
      rx2.beginPath();
      rx2.moveTo(cx, cy);
      rx2.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
      rx2.strokeStyle = 'rgba(25,37,53,0.6)';
      rx2.lineWidth = 1;
      rx2.stroke();
    }

    // Rotating sweep
    if (radarOn) {
      rx2.save();
      rx2.translate(cx, cy);
      rx2.rotate(sweep - Math.PI / 2);
      const sg = rx2.createLinearGradient(0, 0, maxR, 0);
      sg.addColorStop(0, 'rgba(184,130,10,0)');
      sg.addColorStop(1, 'rgba(184,130,10,0.14)');
      rx2.beginPath();
      rx2.moveTo(0, 0);
      rx2.arc(0, 0, maxR, 0, Math.PI * 0.55);
      rx2.closePath();
      rx2.fillStyle = sg;
      rx2.fill();
      // Sweep line
      rx2.beginPath();
      rx2.moveTo(0, 0);
      rx2.lineTo(maxR, 0);
      rx2.strokeStyle = 'rgba(212,159,30,0.7)';
      rx2.lineWidth = 1.5;
      rx2.stroke();
      rx2.restore();
      sweep += 0.011;
    }

    // Polygon fill
    rx2.beginPath();
    AXES.forEach((ax, i) => {
      const a = axisAngle(i);
      const r = maxR * ax.val;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      i === 0 ? rx2.moveTo(x, y) : rx2.lineTo(x, y);
    });
    rx2.closePath();
    rx2.fillStyle   = 'rgba(184,130,10,0.08)';
    rx2.strokeStyle = 'rgba(212,159,30,0.5)';
    rx2.lineWidth   = 1.5;
    rx2.fill();
    rx2.stroke();

    // Dots + labels
    rx2.font = `400 ${fontSize}px "IBM Plex Mono", monospace`;
    rx2.textBaseline = 'middle';

    AXES.forEach((ax, i) => {
      const a  = axisAngle(i);
      const r  = maxR * ax.val;
      const x  = cx + Math.cos(a) * r;
      const y  = cy + Math.sin(a) * r;
      const lx = cx + Math.cos(a) * labelDist;
      const ly = cy + Math.sin(a) * labelDist;

      // Glow halo
      rx2.beginPath();
      rx2.arc(x, y, 5.5, 0, Math.PI * 2);
      rx2.fillStyle = ax.col + '28';
      rx2.fill();
      // Dot
      rx2.beginPath();
      rx2.arc(x, y, 3, 0, Math.PI * 2);
      rx2.fillStyle = ax.col;
      rx2.fill();

      // Label alignment based on x position relative to center
      rx2.fillStyle = 'rgba(148,166,184,0.9)';
      if (lx < cx - 8) {
        rx2.textAlign = 'right';
      } else if (lx > cx + 8) {
        rx2.textAlign = 'left';
      } else {
        rx2.textAlign = 'center';
      }
      rx2.fillText(ax.label, lx, ly);
    });

    // Center dot
    rx2.beginPath();
    rx2.arc(cx, cy, 3, 0, Math.PI * 2);
    rx2.fillStyle = 'rgba(184,130,10,0.55)';
    rx2.fill();

    requestAnimationFrame(drawRadar);
  }
  drawRadar();

  // Start radar sweep when skills section is visible
  const skillsEl = document.getElementById('skills');
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) radarOn = true;
  }, { threshold: 0.25 }).observe(skillsEl);

  /* ──────────────────────────────
     SCROLL REVEAL
  ────────────────────────────── */
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.rv, .rv-l, .rv-r').forEach(el => revObs.observe(el));

  /* ──────────────────────────────
     SMOOTH SCROLL
  ────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  /* ──────────────────────────────
     EASTER EGGS
     🥚 Er zijn 5 verstopte easter eggs op deze site.
     Je hebt er al één gevonden.
  ────────────────────────────── */

  // ── 1. POKÉMON — Trainer Card in de browser console
  (function () {
    const g = 'color:#d49f1e;font-weight:bold;font-family:"IBM Plex Mono",monospace;font-size:11px';
    const w = 'color:#e2d8b8;font-family:"IBM Plex Mono",monospace;font-size:11px';
    const b = 'color:#4e90b0;font-family:"IBM Plex Mono",monospace;font-size:11px';
    const d = 'color:#6e8799;font-family:"IBM Plex Mono",monospace;font-size:11px';
    const gr= 'color:#3ab57a;font-family:"IBM Plex Mono",monospace;font-size:11px';
    console.log('%c╔══════════════════════════════════════╗', g);
    console.log('%c  ★  TRAINER CARD  ·  SENNA HOGENDOORN  ★  ', g);
    console.log('%c╠══════════════════════════════════════╣', g);
    console.log('%c  HP   ████████████████  100 / 100     ', gr);
    console.log('%c  ATK  Penetration Testing       ★★★★★', w);
    console.log('%c  DEF  Network Security          ★★★★☆', b);
    console.log('%c  SPD  Python · Linux · Docker   ★★★★★', w);
    console.log('%c  WIS  Risicomanagement          ★★★☆☆', d);
    console.log('%c╠══════════════════════════════════════╣', g);
    console.log('%c  Badges: CPTS · HvA \'25 · Breinstein   ', w);
    console.log('%c  Locatie: Amsterdam  #052  Ice/Gold    ', d);
    console.log('%c╚══════════════════════════════════════╝', g);
    console.log('%c  🎴  Goed bezig, trainer. Ga terug aan het werk.', d);
  }());

  // ── 2. FORMULE 1 — Klik op "Amsterdam, NL" in de hero → F1 auto raast door pagina
  (function () {
    var eyebrow = document.querySelector('.hero-eyebrow-text');
    if (!eyebrow) return;
    eyebrow.style.cursor = 'pointer';
    var racing = false;

    eyebrow.addEventListener('click', function () {
      if (racing) return;
      racing = true;

      var wrap = document.createElement('div');
      wrap.className = 'f1-car';
      wrap.innerHTML = '<span class="f1-drs">DRS</span>🏎';
      document.body.appendChild(wrap);

      setTimeout(function () {
        wrap.remove();
        racing = false;
      }, 1800);
    });
  }());

  // ── 3. MARVEL — Konami Code → S.H.I.E.L.D. clearance banner
  (function () {
    const SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown',
                 'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let pos = 0;

    document.addEventListener('keydown', function (e) {
      pos = (e.key === SEQ[pos]) ? pos + 1 : (e.key === SEQ[0] ? 1 : 0);
      if (pos === SEQ.length) {
        pos = 0;
        var el = document.createElement('div');
        el.id = 'shield-alert';
        el.innerHTML =
          '<span class="shield-line">◈ ACCESS GRANTED</span>' +
          '<span class="shield-sub">S.H.I.E.L.D. · AGENT CLEARANCE LEVEL 7 · WELCOME, SENNA</span>';
        document.body.appendChild(el);
        setTimeout(function () { el.classList.add('shield-show'); }, 40);
        setTimeout(function () {
          el.classList.remove('shield-show');
          setTimeout(function () { el.remove(); }, 500);
        }, 3200);
      }
    });
  }());

  // ── 4. VOETBAL — Klik de ∞ hero-stat 5× → Ajax toast
  (function () {
    var inf = Array.from(document.querySelectorAll('.hero-stat-n'))
                   .find(function (el) { return el.textContent.trim() === '∞'; });
    if (!inf) return;
    inf.style.cursor = 'pointer';
    var n = 0;
    inf.addEventListener('click', function () {
      n++;
      if (n >= 3) {
        n = 0;
        showToast('Ajax is de beste club van Nederland ❌❌❌', 'easter-football');
      }
    });
  }());

  // ── 5. JORDAN 1 — Klik logo (orb / footer) of 3× Amsterdam → Jordan toast
  (function () {
    var msg = '👟  WINGS. — Air Jordan 1 High OG';

    // 23× klik op orb-logo of footer-logo (#23 — Michael Jordan)
    var logoClicks = 0, logoTimer;
    ['orb-logo', 'foot-logo-img'].forEach(function (cls) {
      var el = document.querySelector('.' + cls);
      if (!el) return;
      el.style.cursor = 'pointer';
      el.addEventListener('click', function () {
        logoClicks++;
        clearTimeout(logoTimer);
        logoTimer = setTimeout(function () { logoClicks = 0; }, 4000);
        if (logoClicks >= 23) { logoClicks = 0; showToast(msg, 'easter-jordan'); }
      });
    });

    // 3× klik op Amsterdam tekst (alternatief pad)
    var city = document.querySelector('.orb-city');
    if (!city) return;
    city.style.cursor = 'pointer';
    var n = 0, t;
    city.addEventListener('click', function () {
      n++;
      clearTimeout(t);
      t = setTimeout(function () { n = 0; }, 1600);
      if (n >= 3) { n = 0; showToast(msg, 'easter-jordan'); }
    });
  }());

  function showToast(msg, cls) {
    var el = document.createElement('div');
    el.className = 'easter-toast ' + cls;
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function () { el.classList.add('show'); }, 40);
    setTimeout(function () {
      el.classList.remove('show');
      setTimeout(function () { el.remove(); }, 400);
    }, 3000);
  }

}());
