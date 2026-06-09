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

      if (panel)  panel.style.background = data.bg;
      if (textEl) textEl.textContent = data.text;
      if (numEl)  numEl.textContent  = data.num;
      if (lblEl)  lblEl.textContent  = data.lbl;
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
