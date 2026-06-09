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
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el) => observer.observe(el));
})();

/* ── 2. HEADER SHADOW ON SCROLL ── */
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;

  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;height:1px;width:1px;pointer-events:none;';
  document.body.prepend(sentinel);

  const sentinelObserver = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle('scrolled', !entry.isIntersecting);
    },
    { threshold: 1.0 }
  );

  sentinelObserver.observe(sentinel);
})();

/* ── 3. HAMBURGER MENU ── */
(function () {
  const btn = document.getElementById('menu-btn');
  const nav = document.getElementById('nav-links');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = isOpen ? 'ti ti-x' : 'ti ti-menu-2';
    }
  });

  // Close menu when a nav link is tapped
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      const icon = btn.querySelector('i');
      if (icon) icon.className = 'ti ti-menu-2';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      const icon = btn.querySelector('i');
      if (icon) icon.className = 'ti ti-menu-2';
    }
  });
})();

/* ── 4. ACTIVE NAV LINK ── */
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a');

  links.forEach((link) => {
    // Skip links that already have .active set in HTML (explicit pages)
    if (link.classList.contains('active')) return;

    const href = link.getAttribute('href') || '';
    const linkFile = href.split('/').pop().split('#')[0] || 'index.html';

    if (
      linkFile === path ||
      (path === '' && linkFile === 'index.html') ||
      (path === 'index.html' && linkFile === 'index.html' && !href.includes('#'))
    ) {
      link.classList.add('active');
    }
  });
})();

/* ── 5. STAGGERED BENTO REVEAL ── */
(function () {
  const cells = document.querySelectorAll('.bento-cell');
  if (!cells.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  cells.forEach((cell) => observer.observe(cell));
})();

/* ── 6. SMOOTH ANCHOR SCROLL ── */
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

/* ── 7. REDUCED MOTION GUARD ── */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal, .reveal-r, .bento-cell').forEach((el) => {
      el.classList.add('on');
    });
  }
})();
