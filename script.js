// ── Scroll reveal via IntersectionObserver ──
const revealEls = document.querySelectorAll('.reveal, .reveal-right');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach((el) => revealObserver.observe(el));

// ── Header shadow — IntersectionObserver on a sentinel ──
const header = document.getElementById('site-header');
const sentinel = document.createElement('div');
sentinel.style.cssText = 'position:absolute;top:80px;height:1px;width:1px;pointer-events:none';
document.body.prepend(sentinel);

const headerObserver = new IntersectionObserver(
  ([entry]) => header.classList.toggle('scrolled', !entry.isIntersecting),
  { threshold: 0 }
);
headerObserver.observe(sentinel);
