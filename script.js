/* ── The Challenge — script.js ── */

/* ── 1. SCROLL REVEAL ── */
(function () {
  const els = document.querySelectorAll('.reveal, .reveal-r');
  if (!els.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach((el) => observer.observe(el));
})();

/* ── 2. HEADER COMPACT ON SCROLL ── */
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;
  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;height:1px;width:1px;pointer-events:none;';
  document.body.prepend(sentinel);
  new IntersectionObserver(([entry]) => {
    header.classList.toggle('scrolled', !entry.isIntersecting);
  }, { threshold: 1.0 }).observe(sentinel);
})();

/* ── 3. HAMBURGER MENU ── */
(function () {
  const btn = document.getElementById('menu-btn');
  const nav = document.getElementById('nav-links');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
    btn.querySelector('i').className = isOpen ? 'ti ti-x' : 'ti ti-menu-2';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.querySelector('i').className = 'ti ti-menu-2';
    });
  });

  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      const icon = btn.querySelector('i');
      if (icon) icon.className = 'ti ti-menu-2';
    }
  });
})();

/* ── 4. USE CASE TABS ── */
(function () {
  const tabs = document.querySelectorAll('.uc-tab');
  if (!tabs.length) return;

  const tabData = {
    pros: {
      text: 'Для тех, кто ведёт длинные рабочие дни, меняющиеся приоритеты и жёсткие дедлайны.',
      num: '87%',
      lbl: 'Недельная последовательность',
      bg: 'linear-gradient(160deg, #2a2520 0%, #0f0d0b 100%)'
    },
    students: {
      text: 'Учёба, дедлайны, сессия -- приложение помогает строить продуктивные ритуалы между занятиями.',
      num: '3x',
      lbl: 'Больше выполненных заданий в срок',
      bg: 'linear-gradient(160deg, #1a2535 0%, #0d1520 100%)'
    },
    remote: {
      text: 'Работа из дома стирает границы. The Challenge держит структуру дня и не даёт выгореть.',
      num: '2.4ч',
      lbl: 'Сэкономлено в день на отвлечениях',
      bg: 'linear-gradient(160deg, #1e2a1e 0%, #0d150d 100%)'
    },
    parents: {
      text: 'Маленькие шаги в промежутках между заботой о детях. 10 минут в день -- уже результат.',
      num: '21 день',
      lbl: 'Средний стрик у занятых родителей',
      bg: 'linear-gradient(160deg, #2a1e28 0%, #150d14 100%)'
    }
  };

  const panel   = document.querySelector('.uc-panel');
  const textEl  = document.getElementById('ucp-text');
  const numEl   = document.getElementById('ucp-num');
  const lblEl   = document.getElementById('ucp-lbl');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const key  = tab.dataset.tab;
      const data = tabData[key];
      if (!data) return;

      [textEl, numEl, lblEl].forEach(el => el && el.classList.add('ucp-fading'));
      setTimeout(() => {
        if (panel)  panel.style.background = data.bg;
        if (textEl) { textEl.textContent = data.text; textEl.classList.remove('ucp-fading'); }
        if (numEl)  { numEl.textContent  = data.num;  numEl.classList.remove('ucp-fading'); }
        if (lblEl)  { lblEl.textContent  = data.lbl;  lblEl.classList.remove('ucp-fading'); }
      }, 230);
    });
  });
})();

/* ── 5. SMOOTH ANCHOR SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── 6. REDUCED MOTION GUARD ── */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.reveal, .reveal-r').forEach((el) => el.classList.add('on'));
}

/* ── 7. HERO PARALLAX ── */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const hero = document.querySelector('.hero');
  const lc   = document.querySelector('.hv-left-card');
  const rc   = document.querySelector('.hv-right-card');
  if (!hero || !lc || !rc) return;
  hero.addEventListener('mousemove', (e) => {
    const r = hero.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 22;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 12;
    lc.style.translate = `${-x * 0.7}px ${-y * 0.4}px`;
    rc.style.translate = `${x  * 0.7}px ${y  * 0.4}px`;
  });
  hero.addEventListener('mouseleave', () => {
    lc.style.translate = rc.style.translate = '';
  });
})();

/* ── 8. COUNT-UP ANIMATION ── */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

  function animateCount(el, duration) {
    const suffixEl   = el.querySelector('span');
    const suffixHTML = suffixEl ? suffixEl.outerHTML : '';
    const textNode   = Array.from(el.childNodes).find(n => n.nodeType === 3);
    const rawText    = (textNode ? textNode.textContent : el.textContent).trim();
    const m = rawText.match(/^([\d\s ]+)(.*)/);
    if (!m) return;
    const target  = parseInt(m[1].replace(/\D/g, ''), 10);
    const postfix = m[2];
    if (!target) return;

    const start = performance.now();
    (function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const v = Math.round(target * easeOutQuart(p));
      const fmt = v >= 1000
        ? Math.floor(v / 1000) + ' ' + String(v % 1000).padStart(3, '0')
        : String(v);
      el.innerHTML = fmt + postfix + suffixHTML;
      if (p < 1) requestAnimationFrame(frame);
    })(start);
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);
      animateCount(entry.target, 1600);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.cs-num, .cs-snum').forEach(el => obs.observe(el));
})();

/* ── 9. MARQUEE TAGLINE ── */
(function () {
  const row = document.querySelector('.uc-tagline-row');
  if (!row) return;
  const items = Array.from(row.children);
  if (!items.length) return;
  const track = document.createElement('div');
  track.className = 'uc-tagline-track';
  items.forEach(item => track.appendChild(item));
  items.forEach(item => track.appendChild(item.cloneNode(true)));
  row.appendChild(track);
  track.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
  track.addEventListener('mouseleave', () => { track.style.animationPlayState = ''; });
})();

/* ── 10. CARD 3D TILT ── */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.ss-card, .rv-vid, .rv-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r  = card.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width  - 0.5;
      const cy = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${cx * 9}deg) rotateX(${-cy * 9}deg) translateZ(6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

/* ── 11. STREAK BAR ANIMATE ── */
(function () {
  const fill = document.querySelector('.sw-fill');
  if (!fill) return;
  const styleAttr = fill.getAttribute('style') || '';
  const m = styleAttr.match(/width:\s*([^;]+)/);
  const target = m ? m[1].trim() : '72%';
  fill.style.cssText = 'width:0;transition:none';
  const widget = fill.closest('.streak-widget');
  if (!widget) return;
  new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    requestAnimationFrame(() => {
      fill.style.transition = 'width 1.4s cubic-bezier(0.16,1,0.3,1) 0.25s';
      fill.style.width = target;
    });
  }, { threshold: 0.6 }).observe(widget);
})();

/* ── 12. SCROLL PROGRESS BAR ── */
(function () {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  function update() {
    const scrolled = document.documentElement.scrollTop;
    const total    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── 13. CURSOR GLOW ── */
(function () {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;
  let mx = -9999, my = -9999, cx = -9999, cy = -9999, raf;
  window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
  (function tick() {
    cx += (mx - cx) * 0.09;
    cy += (my - cy) * 0.09;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    raf = requestAnimationFrame(tick);
  })();
  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
})();

/* ── 14. HERO CANVAS PARTICLES ── */
(function () {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  const COUNT = 55;
  let W, H, dots;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  new ResizeObserver(resize).observe(canvas);

  function mkDot() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.8 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      a: 0.15 + Math.random() * 0.5
    };
  }
  dots = Array.from({ length: COUNT }, mkDot);

  (function frame() {
    ctx.clearRect(0, 0, W, H);
    for (const d of dots) {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
      if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${d.a})`;
      ctx.fill();
    }
    requestAnimationFrame(frame);
  })();
})();

/* ── 15. SPLIT TEXT H1 ── */
(function () {
  const h1 = document.querySelector('.hero h1[data-split]');
  if (!h1) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function splitEl(el) {
    const html = el.innerHTML;
    const parts = html.split(/(<br\s*\/?>)/i);
    let wi = 0;
    return parts.map(part => {
      if (/^<br/i.test(part)) return '<br>';
      return part.trim().split(/\s+/).filter(Boolean).map(word => {
        const span = `<span class="word-wrap"><span class="word" style="--wi:${wi}">${word}</span></span>`;
        wi++;
        return span;
      }).join(' ');
    }).join('');
  }

  h1.innerHTML = splitEl(h1);
  h1.classList.add('split-ready');
})();

/* ── 16. MAGNETIC BUTTONS ── */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.hero-ctas .btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * 0.22;
      const dy = (e.clientY - (r.top  + r.height / 2)) * 0.22;
      btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

/* ── 17. ACTIVE NAV HIGHLIGHT ── */
(function () {
  const links = document.querySelectorAll('.nav-pills a[href^="#"]');
  if (!links.length) return;
  const ids = Array.from(links).map(a => a.getAttribute('href').slice(1));
  const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav-pills a[href="#${entry.target.id}"]`);
      if (link) link.classList.add('active');
    });
  }, { threshold: 0.25, rootMargin: '-80px 0px -40% 0px' });
  sections.forEach(s => obs.observe(s));
})();
