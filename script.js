/* ============================================================
   VIRGINIA CATHEY COLLECTIONS — script.js
   Shared across every page. No dependencies.
   ============================================================ */
(function () {

  /* Nav scroll */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* Hamburger */
  const burger = document.querySelector('.burger');
  const menu   = document.querySelector('.mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      menu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* Scroll reveal */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    reveals.forEach(el => obs.observe(el));
  }

  /* Hero parallax */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      heroBg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
    }, { passive: true });
  }

  /* Count-up — robust version that works on GitHub Pages */
  function runCountUp(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    if (isNaN(target)) return;
    el.textContent = '0' + suffix;
    const duration = 1800;
    const steps = 60;
    const inc = target / steps;
    let cur = 0;
    let step = 0;
    const t = setInterval(() => {
      step++;
      cur = Math.min(cur + inc, target);
      el.textContent = (step >= steps ? target : Math.floor(cur)) + suffix;
      if (step >= steps) clearInterval(t);
    }, duration / steps);
  }

  const counters = document.querySelectorAll('.count-up');
  if (counters.length) {
    const fired = new Set();
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !fired.has(e.target)) {
          fired.add(e.target);
          io.unobserve(e.target);
          // Small delay so the reveal animation plays first
          setTimeout(() => runCountUp(e.target), 300);
        }
      });
    }, { threshold: 0.3 });
    counters.forEach(el => io.observe(el));
  }

  /* Lightbox */
  const lb    = document.querySelector('.lb');
  const lbImg = lb && lb.querySelector('img');
  const lbX   = lb && lb.querySelector('.lb-x');
  if (lb && lbImg) {
    document.addEventListener('click', e => {
      if (e.target.classList.contains('gp')) {
        lbImg.src = e.target.src;
        lbImg.alt = e.target.alt;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
    const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
    if (lbX) lbX.addEventListener('click', close);
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

})();
